
import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    },

    topic: {
        type: String,
        required: true
    },

    classLevel: String,
    examType: String,

    revisionMode: {
        type: Boolean,
        default: false
    },

    includeDiagram: Boolean,
    includeChart: Boolean,

    content: {
        type: mongoose.Schema.Types.Mixed, // we will store the content as a mixed type because it can be a string or an object depending on the revision mode and diagram/chart inclusion
        // it can come from AI response (string / JSON)
        required: true
    }
}, { timestamps: true });

const Notes = mongoose.model("Notes", notesSchema);

export default Notes;
