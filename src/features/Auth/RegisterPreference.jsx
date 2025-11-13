import { Selector } from "../../components/Selector";

function RegisterPreference({onChange }) {
  const topicOptions = [
    {
      label: "Uni Life",
      subTopics: [
        { label: "Dorms & Housing", value: "dorms" },
        { label: "Campus Food", value: "campus-food" },
        { label: "Student Life Tips", value: "student-tips" },
      ],
    },
    {
      label: "Academics",
      subTopics: [
        { label: "Courses & Syllabus", value: "courses" },
        { label: "Exam Preparation", value: "exams" },
        { label: "Study Groups", value: "study-groups" },
        { label: "Assignments & Projects", value: "assignments" },
      ],
    },
    {
      label: "Events",
      subTopics: [
        { label: "Workshops & Seminars", value: "workshops" },
        { label: "Sports Events", value: "sports" },
        { label: "Cultural Events", value: "cultural" },
        { label: "Festivals", value: "festivals" },
      ],
    },
    {
      label: "Clubs & Societies",
      subTopics: [
        { label: "Academic Clubs", value: "academic-clubs" },
        { label: "Sports Clubs", value: "sports-clubs" },
        { label: "Art & Music", value: "art-music" },
        { label: "Volunteer & Social", value: "volunteer" },
      ],
    },
  ];

  return (
    <>
      <h2>Add Interest Topics</h2>
      <p>Add up interested topic to recommendation</p>
      <br />
      <span>Topic </span>

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

export default RegisterPreference;
