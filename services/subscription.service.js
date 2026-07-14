const subscriptionDAO = require("../dao/subscription.dao");

class SubscriptionService {
    async getSubscriptions() {
        return await subscriptionDAO.getAllSubscriptions();
    }

    async getSubscriptionById(subscriptionId) {
        const subscription = await subscriptionDAO.getSubscriptionById(subscriptionId);
        if (!subscription) {
            throw new Error("Subscription not found");
        }
        return subscription;
    }

    async createSubscription(subscriptionData) {
        if (!subscriptionData.user_id || !subscriptionData.plan_id || !subscriptionData.start_date || !subscriptionData.end_date || !subscriptionData.status) {
            throw new Error("All subscription fields are required");
        }
        const newSubscriptionId = await subscriptionDAO.createSubscription(subscriptionData);
        return {
            user_subscription_id: newSubscriptionId,
            ...subscriptionData
        };
    }

    async updateSubscription(subscriptionId, subscriptionData) {
        const updated = await subscriptionDAO.updateSubscription(subscriptionId, subscriptionData);
        if (!updated) {
            throw new Error("Subscription not found or no changes made");
        }
        return { message: "Subscription updated successfully" };
    }

    async deleteSubscription(subscriptionId) {
        const deleted = await subscriptionDAO.deleteSubscription(subscriptionId);
        if (!deleted) {
            throw new Error("Unable to delete subscription");
        }
        return { message: "Subscription deleted successfully" };
    }
}

module.exports = new SubscriptionService();