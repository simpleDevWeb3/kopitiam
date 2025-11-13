import { useNavigate } from "react-router-dom";
import MultiStepForm from "../../components/MultiStepForm";
import RegisterPreference from "./RegisterPreference";
import RegisterProfile from "./RegisterProfile";
import RegisterStyling from "./RegisterStyling";
import RegisterUser from "./RegisterUser";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "./AuthContext";
import { Selector } from "../../components/Selector";
import { HiOutlineArrowLeft, HiOutlineBarsArrowUp } from "react-icons/hi2";
import ButtonIcon from "../../components/ButtonIcon";

function RegisterForm({ toLogin }) {
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const { logIn } = useAuth();

  const steps = [
    {
      key: "preference",
      component: ({ handleChange }) => (
        <RegisterPreference
          onChange={(data) => handleChange("preference", data)}
        />
      ),
      validate: (formData) => (formData.preference || []).length > 0,
    },
    {
      key: "account",
      component: ({ formData, handleChange }) => (
        <RegisterUser formData={formData} onChange={handleChange} />
      ),
      validate: (formData) => formData.Email && formData.Password,
    },
    {
      key: "profile",
      component: ({ formData, handleChange }) => (
        <RegisterProfile
          name={formData.username}
          description={formData.userDescription}
          onChange={handleChange}
        />
      ),
      validate: (formData) => formData.username || formData.userDescription,
    },
    {
      key: "styling",
      component: ({ formData, handleChange }) => (
        <RegisterStyling formData={formData} onChange={handleChange} />
      ),
      validate: () => true,
    },
  ];

  return (
    <>
      <ButtonIcon action={toLogin} icon={<HiOutlineArrowLeft />}>
        Login
      </ButtonIcon>

      <Selector limit={0}>
        <MultiStepForm
          steps={steps}
          onSuccess={() => {
            navigate("/profile");
            closeModal();
            logIn();
          }}
        />
      </Selector>
    </>
  );
}

export default RegisterForm;
