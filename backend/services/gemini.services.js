const AI_CREDITS_URL = "https://api.aicredits.in/v1/chat/completions";

export const generateGeminiResponse = async (prompt) => {
  // this prompt is the one built by promptBuilder.js
  try {
    const response = await fetch(AI_CREDITS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    // Store response in data variable and return it to the controller
    const data = await response.json();

    // Extract text content from the response
    const text = data.choices[0]?.message?.content;

    if (!text) {
      throw new Error("No text content found in AICredits response");
    }

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // console.log("========== AI RAW RESPONSE ==========");
    // console.log(cleanText);
    // console.log("=====================================");

    const parsedData = JSON.parse(cleanText);

    if (
      parsedData.diagram?.data &&
      (!parsedData.questions?.diagram ||
        parsedData.questions.diagram.length === 0)
    ) {
      parsedData.questions.diagram = [
        "Draw and explain the above diagram.",
        "Label all parts of the diagram.",
        "Explain the working of the diagram.",
      ];
    }

    return parsedData;
  } catch (error) {
    throw new Error(`Error generating AICredits response: ${error.message}`);
  }
};
