// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const { jsonrepair } = require("jsonrepair");


// Initialize app
const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("➡️ Incoming request:", req.method, req.url);
  next();
});
// Connect to MongoDB (local)
mongoose
  .connect("mongodb://127.0.0.1:27017/quizdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Define Quiz Schema
const quizSchema = new mongoose.Schema({
  videoId: String,
  quiz: [
    {
      question: String,
      options: [String],
      correctAnswer: Number,
    },
  ],
});

// Create Model
const Quiz = mongoose.model("Quiz", quizSchema);

function safeJsonParse(content) {
  try {
    // Direct parse
    return JSON.parse(content);
  } catch {
    try {
      // Remove markdown fences
      const cleaned  = content.match(/{[\s\S]*}/);
      if (!cleaned) return null;
      // Repair broken JSON
      const repaired = jsonrepair(cleaned[0]);

      return JSON.parse(repaired);
    } catch (err) {
      console.error("❌ Still failed to parse JSON:", err.message);
      return null;
    }
  }
}
async function generateQuizFromDeepSeek(videoTitle) {
  try {
    const prompt = `
You are a quiz generator. I will give you a YouTube video title.
First, extract the **main computer science topic** (ignore extra words like "tutorial", "full course", "for beginners", etc.).
Then, generate a quiz ONLY based on that topic.

Video Title: "${videoTitle}"

Rules:
- Identify the main topic (example: "Graphs", "Linked List", "Sorting Algorithms").
- Create 5 multiple-choice questions (MCQs).
- The questions must be medium level (basic understanding, beginner-friendly).
- Each question must have 4 options.
- Provide the correct answer as an index (0-3).
- Return ONLY valid JSON in this exact format:
{
  "quiz": [
    {
      "question": "Question text",
      "options": ["opt1", "opt2", "opt3", "opt4"],
      "correctAnswer": 1
    }
  ]
}
`;


    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat-v3-0324",
        messages: [
          { role: "system", content: "You are a helpful quiz generator." },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer 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`, // <-- set your key
          "Content-Type": "application/json",
        },
      }
    );

    const raw = response.data.choices[0].message.content;
    console.log("🤖 Raw AI response:", raw);

    const parsed = safeJsonParse(raw);
    return parsed ? parsed.quiz : null;
  } catch (err) {
    console.error("❌ DeepSeek API error:", err.message);
    return null;
  }
}

app.post("/quiz/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;
    const { videotitle } = req.body;

    // Step 1: Check DB
    let quiz = await Quiz.findOne({ videoId });
    if (quiz) {
      console.log("✅ Quiz found in DB");
      return res.json(quiz);
    }

    // Step 2: Generate with AI if not in DB
    console.log("⚡ No quiz in DB, generating with DeepSeek AI...");

    const aiQuiz = await generateQuizFromDeepSeek(videotitle); 
    if (!aiQuiz) {
      console.log("⚠️ Falling back to sample quiz");
      return res.json({
        videoId,
        quiz: [
          {
            question: "What is a Linked List?",
            options: ["Array", "Linear data structure", "Database", "Operating System"],
            correctAnswer: 1,
          },
          {
            question: "Which is the first node of a Linked List?",
            options: ["Tail", "Head", "Middle", "None"],
            correctAnswer: 1,
          },
          {
            question: "Linked List is efficient for?",
            options: ["Random Access", "Insertion/Deletion", "Sorting", "Binary Search"],
            correctAnswer: 1,
          },
        ],
      });
    }

    // Step 3: Save to DB
    const newQuiz = new Quiz({ videoId, quiz: aiQuiz });
    await newQuiz.save();

    console.log("✅ Quiz generated and saved to DB");
    res.json(newQuiz);
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
