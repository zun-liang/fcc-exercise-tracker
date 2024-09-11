import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Exercise", ExerciseSchema);
