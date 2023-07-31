import { ExtractFeedbackData, buildFeedbackPath } from "./feedback";


function handler(req, res) {
  const feedbackId = req.query.feedbackId;
  const filePath = buildFeedbackPath();
  const feedbackData = ExtractFeedbackData(filePath);
  const selectedFeeback = feedbackData.find(
    (feedback) => feedback.id === feedbackId
  );
  console.log(selectedFeeback)
  res.status(200).json({ feedback: selectedFeeback });
}

export default handler;
