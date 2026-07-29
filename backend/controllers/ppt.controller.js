import { generatePPT } from "../services/export.service.js";

export const pptDownload = async (req, res) => {
  try {
    const { result } = req.body;

    if (!result) {
      return res.status(400).json({
        error: "No content provided",
      });
    }

    // We'll generate the PPT in export.service.js
    await generatePPT(result, res);

  } catch (error) {
    console.error("PPT Generation Error:", error);

    return res.status(500).json({
      error: "Failed to generate PowerPoint",
    });
  }
};