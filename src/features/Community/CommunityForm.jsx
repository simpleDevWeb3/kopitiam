import MultiStepForm from "../../components/MultiStepForm";
import CommuntiyTopic from "./CommuntiyTopic";
import CommunityIntro from "./CommunityIntro";
import CommunityStyling from "./CommunityStyling";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import { Selector } from "../../components/Selector";

function CommunityForm() {
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const steps = [
    {
      key: "topics",
      component: ({ handleChange }) => (
        <CommuntiyTopic onChange={(data) => handleChange("topics", data)} />
      ),
      validate: (formData) => (formData.topics || []).length > 0,
    },
    {
      key: "intro",
      component: ({ formData, handleChange }) => (
        <CommunityIntro
          name={formData.communityName || ""}
          description={formData.communityDescription || ""}
          onChange={handleChange}
        />
      ),
      validate: (formData) => (formData.communityName || "").trim() !== "",
    },
    {
      key: "styling",
      component: ({ formData, handleChange }) => (
        <CommunityStyling formData={formData} onChange={handleChange} />
      ),
      validate: () => true,
    },
  ];

  return (
    <Selector>
      <MultiStepForm
        steps={steps}
        initialData={{}}
        onSuccess={() => {
          closeModal();
          navigate("/Community/c201");
        }}
      />
    </Selector>
  );
}

export default CommunityForm;
