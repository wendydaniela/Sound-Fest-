const express = require("express");
const musicController = require("../controllers/music.controller");

const router = express.Router();

router.get("/artists", musicController.getArtists);
router.post("/artists", musicController.createArtist);
router.put("/artists/:id", musicController.updateArtist);
router.delete("/artists/:id", musicController.deleteArtist);

router.get("/songs", musicController.getSongs);
router.post("/songs", musicController.createSong);
router.put("/songs/:id", musicController.updateSong);
router.delete("/songs/:id", musicController.deleteSong);

module.exports = router;