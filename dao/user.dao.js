const pool = require("../services/mysql.service");

class UserDAO {
    async getUserByEmail(email) {
        const query = "SELECT * FROM User WHERE email = ?";
        const [rows] = await pool.query(query, [email]);
        return rows[0] || null;
    }

    async getUserById(userId) {
        const query = "SELECT user_id, username, first_name, last_name, email, profile_picture, registration_date, is_active FROM User WHERE user_id = ?";
        const [rows] = await pool.query(query, [userId]);
        return rows[0] || null;
    }

    async getAllUsers() {
        const query = "SELECT user_id, username, first_name, last_name, email, profile_picture, registration_date, is_active FROM User";
        const [rows] = await pool.query(query);
        return rows;
    }

    async createUser(userData) {
        const query = "INSERT INTO User (username, first_name, last_name, email, password, profile_picture, registration_date, is_active) VALUES (?, ?, ?, ?, ?, ?, NOW(), TRUE)";
        const [result] = await pool.query(query, [
            userData.username,
            userData.first_name,
            userData.last_name,
            userData.email,
            userData.password,
            userData.profile_picture || null
        ]);
        return result.insertId;
    }

    async updateUser(userId, userData) {
        const query = "UPDATE User SET username = ?, first_name = ?, last_name = ?, email = ?, profile_picture = ?, is_active = ? WHERE user_id = ?";
        const [result] = await pool.query(query, [
            userData.username,
            userData.first_name,
            userData.last_name,
            userData.email,
            userData.profile_picture,
            userData.is_active,
            userId
        ]);
        return result.affectedRows > 0;
    }

    async deleteUser(userId) {
        const query = "DELETE FROM User WHERE user_id = ?";
        const [result] = await pool.query(query, [userId]);
        return result.affectedRows > 0;
    }
}

module.exports = new UserDAO();