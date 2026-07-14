const userService = require("../services/user.service");

class UserController {
    async register(req, res) {
        try {
            const { username, first_name, last_name, email, password, profile_picture } = req.body;
            if (!username || !first_name || !last_name || !email || !password) {
                return res.status(400).json({ error: "Required fields are missing" });
            }
            const newUser = await userService.register({
                username,
                first_name,
                last_name,
                email,
                password,
                profile_picture
            });
            return res.status(201).json({ message: "User registered successfully", user: newUser });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: "Email and password are required" });
            }
            const session = await userService.login(email, password);
            return res.status(200).json({ message: "Login successful", user: session });
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    }

    async getUsers(req, res) {
        try {
            const users = await userService.getUsers();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const result = await userService.updateUser(id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const result = await userService.deleteUser(id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new UserController();