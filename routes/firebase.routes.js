const express = require("express");
const firebaseController = require("../controllers/firebase.controller");

const router = express.Router();

router.get("/reviews", firebaseController.getReviews);
router.post("/reviews", firebaseController.createReview);
router.put("/reviews/:id", firebaseController.updateReview);
router.delete("/reviews/:id", firebaseController.deleteReview);

router.get("/metrics", firebaseController.getMetrics);
router.post("/metrics", firebaseController.createMetric);
router.put("/metrics/:id", firebaseController.updateMetric);
router.delete("/metrics/:id", firebaseController.deleteMetric);

module.exports = router;