const subscriptionService = require('../services/subscription.service');

class SubscriptionController {
    async getSubscriptions(req, res) {
        try {
            const subscriptions = await subscriptionService.getSubscriptions();
            return res.status(200).json(subscriptions);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getSubscriptionById(req, res) {
        try {
            const { id } = req.params;
            const subscription = await subscriptionService.getSubscriptionById(id);
            return res.status(200).json(subscription);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }

    async createSubscription(req, res) {
        try {
            const newSubscription = await subscriptionService.createSubscription(req.body);
            return res.status(201).json(newSubscription);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async updateSubscription(req, res) {
        try {
            const { id } = req.params;
            const result = await subscriptionService.updateSubscription(id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async deleteSubscription(req, res) {
        try {
            const { id } = req.params;
            const result = await subscriptionService.deleteSubscription(id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new SubscriptionController();