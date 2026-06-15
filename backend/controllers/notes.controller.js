import Notes from "../models/notes.model.js";

export const getMyNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.userId })
      .select(
        "topic classLevel examType revisionMode includeDiagram includeChart createdAt",
      )
      .sort({ createAt: -1 });
    if (!notes) {
      return res.status(404).json({
        error: "Notes not found",
      });
    }
    return res.status(200).json(notes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `getCurrentUser notes error ${error}` });
  }
};

export const getSingleNotes = async (req, res) => {
  try {
    const notes = await Notes.findOne({
      _id: req.params.id,
      user: req.userId,
    });
    if (!notes) {
      return res.status(404).json({
        error: "Notes not found",
      });
    }
    return res.json({
      content: notes.content,
      topic: notes.topic,
      createdAt: notes.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ message: `getSingle notes error ${error}` });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const deletedNote = await Notes.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!deletedNote) {
      return res.status(404).json({
        error: "Notes not found",
      });
    }

    return res.status(200).json({
      message: "Notes deleted successfully",
      deletedNote: deletedNote,
    });
  } catch (error) {
    return res.status(500).json({ message: `Delete notes error ${error}` });
  }
};
