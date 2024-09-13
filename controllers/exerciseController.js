import Exercise from "../models/ExerciseModel.js";
import User from "../models/UserModel.js";

export const createExercise = async (req, res) => {
  try {
    const userId = req.body[":_id"];
    const user = await User.findById(userId);
    req.body.username = user.username;
    req.body.createdBy = userId;
    req.body.date = new Date(req.body.date);
    const exercise = await Exercise.create(req.body);
    const utcDateString = exercise.date
      .toUTCString()
      .replace(",", "")
      .split(" ");
    const utcWeekday = utcDateString[0];
    const utcMonth = utcDateString[2];
    const utcDay = utcDateString[1];
    const utcYear = utcDateString[3];
    const formattedDate = `${utcWeekday} ${utcMonth} ${utcDay} ${utcYear}`;
    res.json({
      _id: exercise.createdBy,
      username: exercise.username,
      date: formattedDate,
      duration: exercise.duration,
      description: exercise.description,
    });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

export const getLogs = async (req, res) => {
  try {
    const { from, to, limit } = req.query;
    const userId = req.baseUrl.split("/")[3];
    const queryObject = {
      createdBy: userId,
    };
    if (from) {
      queryObject.$and = [
        {
          date: { $gte: new Date(from) },
        },
      ];
    }
    if (to) {
      queryObject.$and = [{ date: { $lte: new Date(to) } }];
    }

    let count = await Exercise.countDocuments(queryObject);
    let exercises = await Exercise.find(queryObject).sort("createdAt");

    if (limit) {
      count = count > Number(limit) ? Number(limit) : count;
      exercises = await Exercise.find(queryObject)
        .sort("createdAt")
        .limit(Number(limit));
    }
    const user = await User.findById(userId);
    const log = exercises.map((exercise) => {
      const utcDateString = exercise.date
        .toUTCString()
        .replace(",", "")
        .split(" ");
      const utcWeekday = utcDateString[0];
      const utcMonth = utcDateString[2];
      const utcDay = utcDateString[1];
      const utcYear = utcDateString[3];
      const formattedDate = `${utcWeekday} ${utcMonth} ${utcDay} ${utcYear}`;
      const simplifiedExercise = {
        description: exercise.description,
        duration: exercise.duration,
        date: formattedDate,
      };
      return simplifiedExercise;
    });
    res.json({ _id: user._id, username: user.username, count, log });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};
