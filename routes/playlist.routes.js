const express = require("express");
const playlistController = require("../controllers/playlist.controller");

const router = express.Router();

router.get("/", playlistController.getPlaylists);
router.get("/:id", playlistController.getPlaylistById);
router.post("/", playlistController.createPlaylist);
router.put("/:id", playlistController.updatePlaylist);
router.delete("/:id", playlistController.deletePlaylist);

router.post("/:id/songs", playlistController.addSong);
router.delete("/:id/songs/:songId", playlistController.removeSong);

module.exports = router;