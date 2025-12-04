import { Selector } from "../../components/Selector";
import Spinner from "../../components/Spinner";
import { useTopic } from "../Auth/useTopic";

function CommunityTopic({ onChange }) {
  const { topics, isLoading } = useTopic();

  const topicOptions = topics.map((t) => {
    return {
      label: t.name,
      subTopics: t.sub_topic.map((sub_t) => {
        return { label: sub_t.name, value: sub_t.id };
      }),
    };
  });
  if (isLoading) return <Spinner />;
  return (
    <>
      <h2>Add Topics</h2>
      <p>Add up 3 topic to let student find your community</p>
      <br />
      <span>Topic </span>
      <Selector.Count />
      <Selector.Selected />
      <br />
      {topicOptions.map((topic) => (
        <Selector.Group key={topic.label} title={topic.label}>
          {topic.subTopics.map((sub) => (
            <Selector.Option
              key={sub.value}
              value={sub.value}
              onChange={onChange}
            >
              {sub.label}
            </Selector.Option>
          ))}
        </Selector.Group>
      ))}
    </>
  );
}

export default CommunityTopic;
