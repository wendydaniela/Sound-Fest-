const pool = require("../services/mysql.service");

class SubscriptionDAO {
    async getAllSubscriptions() {
        const query = "SELECT us.*, u.username, sp.name AS plan_name FROM UserSubscription us JOIN User u ON us.user_id = u.user_id JOIN SubscriptionPlan sp ON us.plan_id = sp.plan_id";
        const [rows] = await pool.query(query);
        return rows;
    }

    async getSubscriptionById(subscriptionId) {
        const query = "SELECT * FROM UserSubscription WHERE user_subscription_id = ?";
        const [rows] = await pool.query(query, [subscriptionId]);
        return rows[0] || null;
    }

    async createSubscription(subscriptionData) {
        const query = "INSERT INTO UserSubscription (user_id, plan_id, start_date, end_date, status) VALUES (?, ?, ?, ?, ?)";
        const [result] = await pool.query(query, [
            subscriptionData.user_id,
            subscriptionData.plan_id,
            subscriptionData.start_date,
            subscriptionData.end_date,
            subscriptionData.status
        ]);
        return result.insertId;
    }

    async updateSubscription(subscriptionId, subscriptionData) {
        const query = "UPDATE UserSubscription SET plan_id = ?, start_date = ?, end_date = ?, status = ? WHERE user_subscription_id = ?";
        const [result] = await pool.query(query, [
            subscriptionData.plan_id,
            subscriptionData.start_date,
            subscriptionData.end_date,
            subscriptionData.status,
            subscriptionId
        ]);
        return result.affectedRows > 0;
    }

    async deleteSubscription(subscriptionId) {
        const query = "DELETE FROM UserSubscription WHERE user_subscription_id = ?";
        const [result] = await pool.query(query, [subscriptionId]);
        return result.affectedRows > 0;
    }
}

module.exports = new SubscriptionDAO();