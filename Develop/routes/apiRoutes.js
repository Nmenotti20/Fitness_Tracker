const router = require ("express").Router();
const Workout = require ("../models/schema.js");

// router.get("/api/workout", (req, res) =>   {
//     Workout.aggregate([, {
//         $aggregate: {
//             excercises.
//         }
//     })
//     .then((exercise) => {
//         res.json(exercise)
//     })
// });

// Get Workouts
router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
          $addFields: {
            duration: {
              $sum: "$exercises.duration",
            }
          }
        }
    ])
    .then((excersise) => {
        res.json(excersise);
    })
    .catch(( {err} ) => {
        res.json(err);
    });
});


//PUT ROUTE for pushing the posted workouts to update the Dashboard
router.put("/api/workout/:id", (req, res) =>   {
    Workout.findOneAndUpdate({_id:req.params.id}, {
        $push: {
            exercises: req.body
        }
    })
        .then((workout) =>  {
            console.log(workout)
            res.json(workout)
        })
    }
)


//POST ROUTE for creating a workout
router.post("/api/workout", (req, res)  =>  {
    Workout.create(req.body)
    .then((workout) =>  {
        console.log(workout)
        res.json(workout)
    })
})

//GET ROUTE last 7 excersises posted by day
router.get("/api/workout/range", (req, res)   =>  {
    Workout.find().sort({day: -1}).limit(7)
    .then((workout) =>  {
        console.log(workout)
        res.json(workout)
    })
})

module.exports = router;