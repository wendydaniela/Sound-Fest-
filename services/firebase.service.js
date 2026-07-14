const firebaseDAO = require("../dao/firebase.dao");

class FirebaseService {
    async getReviews() {
        return await firebaseDAO.getDocuments("Reviews");
    }

    async createReview(reviewData) {
        if (!reviewData.userId || !reviewData.songId || reviewData.rating === undefined) {
            throw new Error("userId, songId and rating are required");
        }
        const docId = await firebaseDAO.createDocument("Reviews", reviewData);
        return {
            id: docId,
            ...reviewData
        };
    }

    async updateReview(reviewId, reviewData) {
        const exists = await firebaseDAO.getDocumentById("Reviews", reviewId);
        if (!exists) {
            throw new Error("Review not found");
        }
        await firebaseDAO.updateDocument("Reviews", reviewId, reviewData);
        return { message: "Review updated successfully" };
    }

    async deleteReview(reviewId) {
        const exists = await firebaseDAO.getDocumentById("Reviews", reviewId);
        if (!exists) {
            throw new Error("Review not found");
        }
        await firebaseDAO.deleteDocument("Reviews", reviewId);
        return { message: "Review deleted successfully" };
    }

    async getMetrics() {
        return await firebaseDAO.getDocuments("Metrics");
    }

    async createMetric(metricData) {
        if (!metricData.userId) {
            throw new Error("userId is required for metrics");
        }
        const docId = await firebaseDAO.createDocument("Metrics", metricData);
        return {
            id: docId,
            ...metricData
        };
    }

    async updateMetric(metricId, metricData) {
        const exists = await firebaseDAO.getDocumentById("Metrics", metricId);
        if (!exists) {
            throw new Error("Metric record not found");
        }
        await firebaseDAO.updateDocument("Metrics", metricId, metricData);
        return { message: "Metric updated successfully" };
    }

    async deleteMetric(metricId) {
        const exists = await firebaseDAO.getDocumentById("Metrics", metricId);
        if (!exists) {
            throw new Error("Metric record not found");
        }
        await firebaseDAO.deleteDocument("Metrics", metricId);
        return { message: "Metric deleted successfully" };
    }
}

module.exports = new FirebaseService();