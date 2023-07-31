import fs, { writeFileSync } from "fs";
import path from "path";

function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

function ExtractFeedbackData(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedback = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      feedbackText: feedback,
    };

    const filePath = buildFeedbackPath();
    const data = ExtractFeedbackData(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "success", feedback: newFeedback });
  } else {
    const filePath = buildFeedbackPath();
    const data = ExtractFeedbackData(filePath);
    console.log(data)
    res.status(200).json({ message: "success", feedback: data });
  }
}

export default handler;
