const firebaseService = require("../services/firebase.service");

class FirebaseController {
    async getReviews(req, res) {
        try {
            const reviews = await firebaseService.getReviews();
            return res.status(200).json(reviews);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async createReview(req, res) {
        try {
            const newReview = await firebaseService.createReview(req.body);
            return res.status(201).json(newReview);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async updateReview(req, res) {
        try {
            const { id } = req.params;
            const result = await firebaseService.updateReview(id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async deleteReview(req, res) {
        try {
            const { id } = req.params;
            const result = await firebaseService.deleteReview(id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getMetrics(req, res) {
        try {
            const metrics = await firebaseService.getMetrics();
            return res.status(200).json(metrics);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async createMetric(req, res) {
        try {
            const newMetric = await firebaseService.createMetric(req.body);
            return res.status(201).json(newMetric);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async updateMetric(req, res) {
        try {
            const { id } = req.params;
            const result = await firebaseService.updateMetric(id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async deleteMetric(req, res) {
        try {
            const { id } = req.params;
            const result = await firebaseService.deleteMetric(id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new FirebaseController();