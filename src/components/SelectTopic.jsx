import styled from "styled-components";
import { useTopic } from "../features/Auth/useTopic";
import React, { useState } from "react";
import ButtonIcon from "./ButtonIcon";
import Spinner from "./Spinner";

function SelectTopic({ selectedTopic, onCancel, onAdd }) {
  const { topics, isLoading } = useTopic();
  const [select, setSelect] = useState(selectedTopic);

  const topicOptions = topics.map((t) => {
    return {
      label: t.name,

      id: t.id,
      subTopics: t.sub_topic.map((sub_t) => {
        return { label: sub_t.name, value: sub_t.id };
      }),
    };
  });

  return (
    <StyledPage>
      <HeaderTitle>Select Topic</HeaderTitle>
      {isLoading && <Spinner />}

      {topicOptions.map((topic) => (
        <React.Fragment key={topic.id || topic.label}>
          <SectionTitle>{topic.label}</SectionTitle>

          {topic.subTopics.map((sub) => (
            <Option key={sub.value}>
              <input
                type="radio"
                name="topic"
                id={String(sub.value)}
                value={sub.value}
                onChange={() => setSelect({ id: sub.value, label: sub.label })}
                checked={
                  String(select?.id || selectedTopic?.id) === String(sub.value)
                }
              />

              <ButtonIconStyled>{sub.label}</ButtonIconStyled>
            </Option>
          ))}
        </React.Fragment>
      ))}
      <div style={{ marginBottom: "5rem" }}></div>
      <ActionContainer
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          backgroundColor: "var(--background-color)",
        }}
      >
        <ButtonIcon
          style={{ backgroundColor: "rgb(174, 33, 43)", color: "white" }}
          action={() => {
            setSelect(null);
            onCancel();
          }}
        >
          Cancel
        </ButtonIcon>
        <ButtonIcon
          style={{ backgroundColor: "rgb(19, 87, 184)", color: "white" }}
          action={() => onAdd(select)}
        >
          Add
        </ButtonIcon>
      </ActionContainer>
    </StyledPage>
  );
}

export default SelectTopic;

// --- STYLES ---
const ActionContainer = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
  gap: 0.5rem;
  padding: 1rem;
  align-items: center;
`;
const StyledPage = styled.div`
  padding-right: 1rem;
  color: var(--text-color) !important;
  min-width: 30rem;
  min-height: 30rem;
  overflow-y: auto;
  position: relative;
`;

const HeaderTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const Option = styled.label`
  display: inline-block;
  margin: 0.5rem;
  cursor: pointer;

  input {
    display: none;
  }
`;

const ButtonIconStyled = styled.span`
  border-radius: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: var(--hover-color, #eee);
  transition: all 0.2s ease;
  font-weight: 500;
  border: 1px solid transparent;

  &:hover {
    filter: brightness(0.95);
  }

  // This selector works because the Input is the immediate sibling in the JSX above
  // input:checked + ButtonIconStyled
  input:checked + & {
    background-color: var(--brand-color, #007bff);
    color: white;
    border-color: var(--brand-color, #007bff);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;
