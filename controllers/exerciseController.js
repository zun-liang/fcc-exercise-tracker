import Exercise from "../models/ExerciseModel.js";

export const createExercise = async (req, res) => {
  const exercise = await Exercise.create(req.body);
  res.json({
    _id: exercise._id,
    username: exercise.createdBy,
    date: exercise.date,
    duration: exercise.duration,
    description: exercise.description,
  });
};
