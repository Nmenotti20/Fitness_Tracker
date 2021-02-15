const router = require ("express").Router();
const { Router } = require("express");
const path = require ("path");

router.get("/exercise", (req, res) =>   {
    res.sendFile(path.join(__dirname, "../public/exercise.html"))
});

router.get("/stats", (req, res) =>   {
    res.sendFile(path.join(__dirname, "../public/stats.html"))
});

router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = router