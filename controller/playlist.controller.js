const playlistService = require("../services/playlist.service");

class PlaylistController {
    async getPlaylists(req, res) {
        try {
            const playlists = await playlistService.getPlaylists();
            return res.status(200).json(playlists);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getPlaylistById(req, res) {
        try {
            const { id } = req.params;
            const playlist = await playlistService.getPlaylistById(id);
            return res.status(200).json(playlist);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }

    async createPlaylist(req, res) {
        try {
            const newPlaylist = await playlistService.createPlaylist(req.body);
            return res.status(201).json(newPlaylist);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async updatePlaylist(req, res) {
        try {
            const { id } = req.params;
            const result = await playlistService.updatePlaylist(id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async deletePlaylist(req, res) {
        try {
            const { id } = req.params;
            const result = await playlistService.deletePlaylist(id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async addSong(req, res) {
        try {
            const { id } = req.params;
            const { song_id } = req.body;
            const result = await playlistService.addSong(id, song_id);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async removeSong(req, res) {
        try {
            const { id, songId } = req.params;
            const result = await playlistService.removeSong(id, songId);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new PlaylistController();