const crypto = require("crypto");
const userDAO = require("../dao/user.dao");

class UserService {
    generateSalt() {
        return crypto.randomBytes(16).toString("hex");
    }

    hashPassword(password, salt) {
        return new Promise((resolve, reject) => {
            const iterations = 10000;
            const keylen = 64;
            const digest = "sha512";

            crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, derivedKey) => {
                if (err) {
                    reject(err);
                }
                resolve(derivedKey.toString("hex"));
            });
        });
    }

    async verifyPassword(inputPassword, storedValue) {
        const parts = storedValue.split(":");
        const salt = parts[0];
        const hash = parts[1];
        const hashToVerify = await this.hashPassword(inputPassword, salt);
        return crypto.timingSafeEqual(
            Buffer.from(hash, "hex"),
            Buffer.from(hashToVerify, "hex")
        );
    }

    async register(userData) {
        const existingUser = await userDAO.getUserByEmail(userData.email);
        if (existingUser) {
            throw new Error("Email already registered");
        }

        const salt = this.generateSalt();
        const hash = await this.hashPassword(userData.password, salt);
        const securedPassword = `${salt}:${hash}`;

        const newUserId = await userDAO.createUser({
            username: userData.username,
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            password: securedPassword,
            profile_picture: userData.profile_picture
        });

        return {
            user_id: newUserId,
            username: userData.username,
            email: userData.email
        };
    }

    async login(email, password) {
        const user = await userDAO.getUserByEmail(email);
        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isMatch = await this.verifyPassword(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        return {
            user_id: user.user_id,
            username: user.username,
            email: user.email
        };
    }

    async getUsers() {
        return await userDAO.getAllUsers();
    }

    async getUserById(userId) {
        const user = await userDAO.getUserById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async updateUser(userId, userData) {
        const updated = await userDAO.updateUser(userId, userData);
        if (!updated) {
            throw new Error("Unable to update user");
        }
        return { message: "User updated successfully" };
    }

    async deleteUser(userId) {
        const deleted = await userDAO.deleteUser(userId);
        if (!deleted) {
            throw new Error("Unable to delete user");
        }
        return { message: "User deleted successfully" };
    }
}

module.exports = new UserService();