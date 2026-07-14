const playlistDAO = require("../dao/playlist.dao");

class PlaylistService {
    async getPlaylists() {
        return await playlistDAO.getAllPlaylists();
    }

    async getPlaylistById(playlistId) {
        const playlist = await playlistDAO.getPlaylistById(playlistId);
        if (!playlist) {
            throw new Error("Playlist not found");
        }
        const songs = await playlistDAO.getSongsInPlaylist(playlistId);
        return {
            ...playlist,
            songs
        };
    }

    async createPlaylist(playlistData) {
        if (!playlistData.name || !playlistData.user_id) {
            throw new Error("Playlist name and user_id are required");
        }
        const newPlaylistId = await playlistDAO.createPlaylist({
            name: playlistData.name,
            description: playlistData.description,
            cover_image: playlistData.cover_image,
            is_public: playlistData.is_public ?? 1,
            user_id: playlistData.user_id
        });
        return {
            playlist_id: newPlaylistId,
            ...playlistData
        };
    }

    async updatePlaylist(playlistId, playlistData) {
        const updated = await playlistDAO.updatePlaylist(playlistId, playlistData);
        if (!updated) {
            throw new Error("Playlist not found or no changes made");
        }
        return { message: "Playlist updated successfully" };
    }

    async deletePlaylist(playlistId) {
        const deleted = await playlistDAO.deletePlaylist(playlistId);
        if (!deleted) {
            throw new Error("Unable to delete playlist");
        }
        return { message: "Playlist deleted successfully" };
    }

    async addSong(playlistId, songId) {
        if (!playlistId || !songId) {
            throw new Error("Identifiers are required");
        }
        await playlistDAO.addSongToPlaylist(playlistId, songId);
        return { message: "Song added to playlist" };
    }

    async removeSong(playlistId, songId) {
        const removed = await playlistDAO.removeSongFromPlaylist(playlistId, songId);
        if (!removed) {
            throw new Error("Song was not in playlist");
        }
        return { message: "Song removed from playlist" };
    }
}

module.exports = new PlaylistService();