const musicDAO = require("../dao/music.dao");

class MusicService {
    async getArtists() {
        return await musicDAO.getAllArtists();
    }

    async createArtist(artistData) {
        if (!artistData.name) {
            throw new Error("Artist name is required");
        }
        const newArtistId = await musicDAO.createArtist(artistData);
        return {
            artist_id: newArtistId,
            ...artistData
        };
    }

    async updateArtist(artistId, artistData) {
        const updated = await musicDAO.updateArtist(artistId, artistData);
        if (!updated) {
            throw new Error("Artist not found or no changes made");
        }
        return { message: "Artist updated successfully" };
    }

    async deleteArtist(artistId) {
        const deleted = await musicDAO.deleteArtist(artistId);
        if (!deleted) {
            throw new Error("Unable to delete artist");
        }
        return { message: "Artist deleted successfully" };
    }

    async getSongs() {
        return await musicDAO.getAllSongs();
    }

    async createSong(songData) {
        if (!songData.title || !songData.artist_id) {
            throw new Error("Title and artist_id are required");
        }
        const newSongId = await musicDAO.createSong(songData);
        return {
            song_id: newSongId,
            ...songData
        };
    }

    async updateSong(songId, songData) {
        const updated = await musicDAO.updateSong(songId, songData);
        if (!updated) {
            throw new Error("Song not found or no changes made");
        }
        return { message: "Song updated successfully" };
    }

    async deleteSong(songId) {
        const deleted = await musicDAO.deleteSong(songId);
        if (!deleted) {
            throw new Error("Unable to delete song");
        }
        return { message: "Song deleted successfully" };
    }
}

module.exports = new MusicService();