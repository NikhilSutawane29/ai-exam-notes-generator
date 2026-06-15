import Notes from "../models/notes.model.js";
import UserModel from "../models/user.model.js";
import { buildPrompt } from "../utils/promptBuilder.js";
import { generateGeminiResponse } from "../services/gemini.services.js";

export const generateNotes = async (req, res) => {
  try {
    const {
      topic,
      classLevel,
      examType,
      revisionMode = false,
      includeDiagram = false,
      includeChart = false,
    } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    // we will find the user by ID and check if the user has enough credits to generate notes, if not we will return an error response, if yes we will proceed with generating notes and deducting credits
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.credits < 10) {
      user.isCreditAvailable = false;
      await user.save();
      return res.status(403).json({ error: "Not enough credits" });
    }

    // we will build the prompt using the prompt builder utility function and then call the Gemini API to generate the notes content, we will then save the generated notes in the database and link it to the user, we will also deduct credits from the user and return the generated notes ID and remaining credits in the response
    const prompt = buildPrompt({
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
    });

    // we will call the Gemini API to generate the notes content using the generated prompt and then save the generated notes in the database, we will also link the notes to the user and deduct credits from the user
    const aiResponse = await generateGeminiResponse(prompt);

    // we will create a new notes document in the database with the generated content and link it to the user, we will also deduct credits from the user and return the generated notes ID and remaining credits in the response
    const notes = await Notes.create({
      user: user._id, // we will store the user ID in the notes collection to link the notes to the user
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
      content: aiResponse,
    });

    user.credits -= 10; // we will deduct 10 credits for each notes generation
    if (user.credits <= 0) {
      user.isCreditAvailable = false;
    }

    if (!Array.isArray(user.notes)) {
      user.notes = [];
    }

    user.notes.push(notes._id); // we will push the notes ID into the user's notes array to keep track of the user's generated notes

    await user.save(); // we will save the user document after updating the credits and linking the notes

    return res.status(200).json({
      message: "Notes generated successfully",
      notes: notes,
      creditsLeft: user.credits,
    });
  } catch (error) {
    console.error("Error generating notes:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
