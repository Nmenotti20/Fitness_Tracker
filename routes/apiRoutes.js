const router = require ("express").Router();
const Workout = require ("../models/schema.js");

//NEW 
router.get('/api/workout', (req, res) => {
    Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: '$exercises.duration',
          },
        },
      },
    ])
      .then((Workout) => {
        res.json(Workout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

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
// router.get("/api/workout/:id", (req, res) =>   {
//     Workout.findOne({_id:req.params.id})
//         .then((workout) =>  {
//             console.log(workout)
//             res.json(workout)
//         })
//     })

//GET ROUTE for displaying the most recent exercise to the card.
router.put('/api/workouts/:id', ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } },
        // "runValidators" will ensure new exercises meet our schema requirements
        { new: true, runValidators: true }
        )
        .then((dbWorkout) => {
        res.json(dbWorkout);
        })
        .catch((err) => {
        res.json(err);
        });
});   


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