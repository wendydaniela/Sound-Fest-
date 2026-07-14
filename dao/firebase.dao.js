const admin = require("firebase-admin");
const serviceAccount = require("../env/serviceAccountKey.json");

if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

class FirebaseDAO {
    async createDocument(collection, data) {
        const docRef = await db.collection(collection).add({
            ...data,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return docRef.id;
    }

    async getDocuments(collection) {
        const snapshot = await db.collection(collection).get();
        const docs = [];
        snapshot.forEach(doc => {
            docs.push({ id: doc.id, ...doc.data() });
        });
        return docs;
    }

    async getDocumentById(collection, docId) {
        const doc = await db.collection(collection).doc(docId).get();
        if (!doc.exists) {
            return null;
        }
        return { id: doc.id, ...doc.data() };
    }

    async updateDocument(collection, docId, data) {
        await db.collection(collection).doc(docId).update(data);
        return true;
    }

    async deleteDocument(collection, docId) {
        await db.collection(collection).doc(docId).delete();
        return true;
    }
}

module.exports = new FirebaseDAO();