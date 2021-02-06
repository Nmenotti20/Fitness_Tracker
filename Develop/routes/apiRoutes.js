const router = require ("express").Router();
const Workout = require ("../models/schema.js");

router.get("/api/workouts", (req, res) =>   {
    Workout.find({})
    .then((exercise) => {
        res.json(exercise)
    })
});

module.exports = router;