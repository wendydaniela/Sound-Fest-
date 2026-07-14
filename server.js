const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const musicRoutes = require("./routes/music.routes");
const playlistRoutes = require("./routes/playlist.routes");
const subscriptionRoutes = require("./routes/subscription.routes");
const firebaseRoutes = require("./routes/firebase.routes");

const PORT = 5000;
const api = express();

api.use(cors());
api.use(express.static("public"));
api.use(express.json());

api.use("/users", userRoutes);
api.use("/music", musicRoutes);
api.use("/playlists", playlistRoutes);
api.use("/subscriptions", subscriptionRoutes);
api.use("/firebase", firebaseRoutes);

api.listen(PORT, () => {
    console.log("Server running in http://localhost:5000");
});