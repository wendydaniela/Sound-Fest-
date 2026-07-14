const musicService = require("../services/music.service");

class MusicController {
    async getArtists(req, res) {
        try {
            const artists = await musicService.getArtists();
            return res.status(200).json(artists);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async createArtist(req, res) {
        try {
            const newArtist = await musicService.createArtist(req.body);
            return res.status(201).json(newArtist);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async updateArtist(req, res) {
        try {
            const { id } = req.params;
            const result = await musicService.updateArtist(id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async deleteArtist(req, res) {
        try {
            const { id } = req.params;
            const result = await musicService.deleteArtist(id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getSongs(req, res) {
        try {
            const songs = await musicService.getSongs();
            return res.status(200).json(songs);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async createSong(req, res) {
        try {
            const newSong = await musicService.createSong(req.body);
            return res.status(201).json(newSong);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async updateSong(req, res) {
        try {
            const { id } = req.params;
            const result = await musicService.updateSong(id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async deleteSong(req, res) {
        try {
            const { id } = req.params;
            const result = await musicService.deleteSong(id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new MusicController();