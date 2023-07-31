import { ExtractFeedbackData, buildFeedbackPath } from "../api/feedback";

function FeedbackPage(props) {
  return (
    <ul>
      {props.feedbackItems.map((item) => (
        <li id={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  const filePath = buildFeedbackPath();
  const data = ExtractFeedbackData(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
