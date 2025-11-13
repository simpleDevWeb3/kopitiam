import styled from "styled-components";
import Carousel from "./Carousel";
import { useState } from "react";
import ButtonIcon from "./ButtonIcon";
//Steps => component data => key, component, validate
//initialData => data initailly passed inside
function MultiStepForm({ steps = [], initialData = {}, onSuccess, onError }) {
  const [formData, setFormData] = useState(initialData);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Update form data
  const handleChange = (field, value) => {
    //Field is equivilent of the data field
    //value is data passed from the object
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const totalSteps = steps.length;

  // Check if current step is valid
  const isNextDisabled = () => {
    const currentStep = steps[currentSlide];
    console.log(currentStep);
    console.log(formData);
    return currentStep?.validate ? !currentStep.validate(formData) : false;
  };

  const handleSubmit = () => {
    console.log("Final form data:", formData);
    // Add API call or other logic here
    onSuccess?.();
    setFormData({});
    setCurrentSlide(0);
    onError?.();
  };

  return (
    <FormContainer>
      <Carousel
        total={totalSteps}
        hideWhenCurrentSlide
        onSlideChange={setCurrentSlide}
      >
        <Carousel.Tracker />
        <br />
        <Carousel.Track>
          {steps.map((step, index) => (
            <Carousel.Card key={step.key || index}>
              {step.component({ formData, handleChange })}
            </Carousel.Card>
          ))}
        </Carousel.Track>

        {/* Navigation */}
        <Carousel.PrevBtn positionY="bottom" disabled={currentSlide === 0} />
        <Carousel.NextBtn positionY="bottom" disabled={isNextDisabled()} />

        {/* Submit Button */}
        {currentSlide === totalSteps - 1 && (
          <CreateContainer>
            <ButtonIcon onClick={handleSubmit}>Create</ButtonIcon>
          </CreateContainer>
        )}
      </Carousel>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  width: 800px;
  overflow-y: hidden;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const CreateContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 1.5rem;
`;

export default MultiStepForm;
