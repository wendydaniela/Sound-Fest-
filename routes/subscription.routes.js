const express = require("express");
const subscriptionController = require("../controllers/subscription.controller");

const router = express.Router();

router.get("/", subscriptionController.getSubscriptions);
router.get("/:id", subscriptionController.getSubscriptionById);
router.post("/", subscriptionController.createSubscription);
router.put("/:id", subscriptionController.updateSubscription);
router.delete("/:id", subscriptionController.deleteSubscription);

module.exports = router;