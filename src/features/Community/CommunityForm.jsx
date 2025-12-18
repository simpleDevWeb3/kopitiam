import MultiStepForm from "../../components/MultiStepForm";
import CommuntiyTopic from "./CommuntiyTopic";
import CommunityIntro from "./CommunityIntro";
import CommunityStyling from "./CommunityStyling";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import { Selector } from "../../components/Selector";
import { useCreateCommunity } from "./useCreateCommunity";
import { validImgFile } from "../../helpers/formHelper";
import { useUser } from "../Auth/useUser";

function CommunityForm() {
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const { createCommunity } = useCreateCommunity(closeModal);
  const { user } = useUser();
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
      validate: (formData) =>
        formData.communityName &&
        formData.communityDescription &&
        !formData.groupnameDup &&
        formData.communitynameValidForm,
    },
    {
      key: "styling",
      component: ({ formData, handleChange }) => (
        <CommunityStyling formData={formData} onChange={handleChange} />
      ),
      validate: (formData) => {
        const { icon, banner } = formData;
        return validImgFile(icon).isValid && validImgFile(banner).isValid;
      },
    },
  ];

  return (
    <Selector>
      <MultiStepForm
        steps={steps}
        //initialData={{}}
        onSuccess={(formData) => {
          const data = {
            ...formData,
            AdminId: user.id,
          };
          createCommunity(data);
        }}
      />
    </Selector>
  );
}

export default CommunityForm;
