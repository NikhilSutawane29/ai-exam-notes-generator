import PptxGenJS from "pptxgenjs";

export const generatePPT = async (result, res) => {
  const ppt = new PptxGenJS();

  ppt.layout = "LAYOUT_WIDE";

  ppt.author = "AI Exam Notes";
  ppt.company = "AI Exam Notes";
  ppt.subject = "Exam Notes";
  ppt.title = "AI Generated Notes";

  //---------------------------------------
  // Theme Colors
  //---------------------------------------

  const PRIMARY = "2563EB";
  const SECONDARY = "0F172A";
  const LIGHT = "F8FAFC";
  const WHITE = "FFFFFF";

  //---------------------------------------
  // Helper
  //---------------------------------------

  const addHeader = (slide, title) => {
    slide.addShape(ppt.ShapeType.rect, {
      x: 0,
      y: 0,
      w: 13.33,
      h: 0.6,
      fill: { color: PRIMARY },
      line: { color: PRIMARY },
    });

    slide.addText(title, {
      x: 0.4,
      y: 0.13,
      fontFace: "Calibri",
      color: WHITE,
      bold: true,
      fontSize: 26,
    });
  };

  //---------------------------------------
  // Slide 1
  //---------------------------------------

  let slide = ppt.addSlide();

  slide.background = { color: LIGHT };

  slide.addText("AI Exam Notes", {
    x: 1,
    y: 1,
    w: 8,
    fontSize: 30,
    bold: true,
    color: PRIMARY,
  });

  slide.addText("Exam Ready Smart Notes", {
    x: 1,
    y: 1.7,
    fontSize: 18,
    color: "555555",
  });

  slide.addText(`Importance : ${result.importance}`, {
    x: 1,
    y: 2.5,
    fontSize: 20,
    color: SECONDARY,
  });

  //---------------------------------------
  // Slide 2
  //---------------------------------------

  slide = ppt.addSlide();

  slide.background = { color: LIGHT };

  addHeader(slide, "Sub Topics");

  let y = 0.9;

  Object.entries(result.subTopics).forEach(([priority, topics]) => {

    slide.addText(`${priority} Priority`, {
      x: 0.6,
      y,
      bold: true,
      fontSize: 18,
      color: PRIMARY,
    });

    y += 0.35;

    topics.forEach((t) => {

      slide.addText("• " + t, {
        x: 1,
        y,
        fontSize: 15,
        color: SECONDARY,
      });

      y += 0.3;

    });

    y += 0.25;

  });

  //---------------------------------------
  // Slide 3
  //---------------------------------------

  slide = ppt.addSlide();

  slide.background = { color: LIGHT };

  addHeader(slide, "Detailed Notes");

  slide.addText(result.notes.replace(/[#*]/g, ""), {

    x: 0.6,
    y: 0.9,
    w: 12,
    h: 6,

    fontSize: 15,

    color: SECONDARY,

    breakLine: false,

    margin: 0.05,

  });

  //---------------------------------------
  // Slide 4
  //---------------------------------------

  slide = ppt.addSlide();

  slide.background = { color: LIGHT };

  addHeader(slide, "Quick Revision");

  y = 1;

  result.revisionPoints.forEach((point) => {

    slide.addText("• " + point, {

      x: 0.8,

      y,

      fontSize: 18,

      color: SECONDARY,

    });

    y += 0.45;

  });

  //---------------------------------------
  // Slide 5
  //---------------------------------------

  slide = ppt.addSlide();

  slide.background = { color: LIGHT };

  addHeader(slide, "Important Questions");

  slide.addText("Short Questions", {

    x: 0.6,

    y: 0.9,

    bold: true,

    fontSize: 18,

    color: PRIMARY,

  });

  y = 1.3;

  result.questions.short.forEach((q) => {

    slide.addText("• " + q, {

      x: 0.8,

      y,

      fontSize: 15,

    });

    y += 0.3;

  });

  y += 0.4;

  slide.addText("Long Questions", {

    x: 0.6,

    y,

    bold: true,

    fontSize: 18,

    color: PRIMARY,

  });

  y += 0.4;

  result.questions.long.forEach((q) => {

    slide.addText("• " + q, {

      x: 0.8,

      y,

      fontSize: 15,

    });

    y += 0.3;

  });

  //---------------------------------------
  // Slide 6
  //---------------------------------------

  if (result.diagram?.data) {

    slide = ppt.addSlide();

    slide.background = { color: LIGHT };

    addHeader(slide, "Diagram");

    slide.addText(result.diagram.data, {

      x: 0.6,

      y: 1,

      w: 12,

      h: 5,

      fontFace: "Courier New",

      fontSize: 14,

    });

  }

  //---------------------------------------
  // Last Slide
  //---------------------------------------

  slide = ppt.addSlide();

  slide.background = { color: PRIMARY };

  slide.addText("Thank You!", {

    x: 3,

    y: 2,

    fontSize: 32,

    bold: true,

    color: WHITE,

  });

  slide.addText("Generated using AI Exam Notes Generator", {

    x: 2.2,

    y: 3,

    fontSize: 18,

    color: WHITE,

  });

  //---------------------------------------
  // Download
  //---------------------------------------

  const buffer = await ppt.write({
    outputType: "nodebuffer",
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  );

  res.setHeader(
    "Content-Disposition",
    'attachment; filename="ExamNotesAI.pptx"'
  );

  res.send(buffer);
};