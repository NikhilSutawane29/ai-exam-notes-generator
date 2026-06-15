export const buildPrompt = ({
  topic,
  classLevel,
  examType,
  revisionMode,
  includeDiagram,
  includeChart,
}) => {
  return `
  You are a STRICT JSON generator for an exam preparation system.
  
⚠️ VERY IMPORTANT:
- Output MUST be valid JSON
- Your response will be parsed using JSON.parse()
- INVALID JSON will cause system failure
- Use ONLY double quotes 
- NO comments, NO trailing commas
- Escape line breaks using \\n
- Do NOT use emojis inside text values

TASK:
Convert the given topic into exam-focused notes.

INPUT:
Topic: ${topic}
Class Level: ${classLevel || "Not specified"}
Exam Type: ${examType || "General"}
Revision Mode: ${revisionMode ? "ON" : "OFF"}
Include Diagram: ${includeDiagram ? "YES" : "NO"}
Include Charts: ${includeChart ? "YES" : "NO"}

GLOBAL CONTENT RULES:
- Use clear, simple, exam-oriented language
- Notes MUST be Markdown formatted
- Headings and bullet points only

REVISION MODE RULES (CRITICAL):
- If REVISION MODE is ON:
  - Notes must be VERY SHORT
  - Only bullet points
  - One-line answers only
  - Definitions, formulas, keywords
  - No paragraphs
  - No explanations
  - Content must feel like:
    - last-day revision
    - 5-minute exam cheat sheet
  - revisionPoints MUST summarize ALL important facts

- If REVISION MODE is OFF:
  - Notes must be DETAILED but exam-focused
  - Each topic should include:
    - definition
    - short explanation
    - examples (if applicable)
  - Paragraph length: max 2-4 lines
  - No storytelling, no extra theory

IMPORTANCE RULES:
- Divide sub-topics into THREE categories:
  - ⭐ Very Important Topics
  - ⭐⭐ Important Topics
  - ⭐⭐⭐ Frequently Asked Topics
- All three categories MUST be present
- Base importance on exam frequency and weightage

DIAGRAM RULES:
- If INCLUDE DIAGRAM is YES:
  - diagram.data MUST be a SINGLE STRING
  - Valid Mermaid syntax only
  - Must start with: graph TD
  - Wrap EVERY node label in square brackets [ ]
  - Do NOT use special characters inside labels
- If INCLUDE DIAGRAM is NO:
  - diagram.data MUST be ""

DIAGRAM QUESTION RULES:

- questions.diagram MUST ALWAYS be an array.
- If Include Diagram = YES:
  - Generate 3 to 5 exam-oriented diagram questions.
  - Questions should ask students to draw, label, explain, or illustrate concepts.
  - Example:
    [
      "Draw and explain Newton's Laws concept map.",
      "Draw the Work-Energy flow diagram.",
      "Draw and label the electromagnetic spectrum."
    ]

- If Include Diagram = NO:
  - Return empty array []

- Never return string values.

QUESTION GENERATION RULES:

- questions.short MUST contain exactly 5 questions.
- questions.long MUST contain exactly 5 questions.
- questions.short MUST NEVER be empty.
- questions.long MUST NEVER be empty.

SHORT QUESTIONS:
- 1 to 3 marks level
- One-line questions
- Definition and recall based

LONG QUESTIONS:
- 5 to 10 marks level
- Descriptive questions
- Must require explanation
- Must require detailed answers

Example:

"long": [
  "Explain the structure of an atom in detail.",
  "Describe the periodic table and its significance.",
  "Explain chemical reactions with suitable examples.",
  "Differentiate mixtures and compounds.",
  "Discuss the states of matter."
]

IMPORTANT:
Never return an empty long array.
Never return an empty short array.

CHART RULES (RECHARTS):
- If INCLUDE CHARTS is YES:
  - charts array MUST NOT be empty
  - Generate at least ONE chart
  - Choose chart based on topic type:
    - THEORY topic -> bar or pie (importance / weightage)
    - PROCESS topic -> bar or line (steps / stages)
  - Use numeric values ONLY
  - Labels must be short and exam-oriented
- If INCLUDE CHARTS is NO:
  - charts MUST be []

CHART TYPES ALLOWED:
- bar
- line
- pie

CHART OBJECT FORMAT:
{
  "type": "bar | line | pie",
  "title": "string",
  "data": [
    { "name": "string", "value": 10 }
  ]
}

STRICT JSON FORMAT (DO NOT CHANGE):
{
  "subTopics": {
    "⭐": [],
    "⭐⭐": [],
    "⭐⭐⭐": []
  },
  "importance": "⭐ | ⭐⭐ | ⭐⭐⭐",
  "notes": "string",
  "revisionPoints": [],
  "questions": {
    "short": [],
    "long": [],
    "diagram": []
  },
  "diagram": {
    "type": "flowchart | graph | process",
    "data": ""
  },
  "charts": []
}

RETURN ONLY VALID JSON.`;
};
