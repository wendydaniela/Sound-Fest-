const pool = require("../services/mysql.service");

class PlaylistDAO {
    async getAllPlaylists() {
        const query = "SELECT * FROM Playlist";
        const [rows] = await pool.query(query);
        return rows;
    }

    async getPlaylistById(playlistId) {
        const query = "SELECT * FROM Playlist WHERE playlist_id = ?";
        const [rows] = await pool.query(query, [playlistId]);
        return rows[0] || null;
    }

    async createPlaylist(playlistData) {
        const query = "INSERT INTO Playlist (name, description, cover_image, is_public, creation_date, user_id) VALUES (?, ?, ?, ?, NOW(), ?)";
        const [result] = await pool.query(query, [
            playlistData.name,
            playlistData.description,
            playlistData.cover_image,
            playlistData.is_public,
            playlistData.user_id
        ]);
        return result.insertId;
    }

    async updatePlaylist(playlistId, playlistData) {
        const query = "UPDATE Playlist SET name = ?, description = ?, cover_image = ?, is_public = ? WHERE playlist_id = ?";
        const [result] = await pool.query(query, [
            playlistData.name,
            playlistData.description,
            playlistData.cover_image,
            playlistData.is_public,
            playlistId
        ]);
        return result.affectedRows > 0;
    }

    async deletePlaylist(playlistId) {
        const query = "DELETE FROM Playlist WHERE playlist_id = ?";
        const [result] = await pool.query(query, [playlistId]);
        return result.affectedRows > 0;
    }

    async addSongToPlaylist(playlistId, songId) {
        const query = "INSERT INTO PlaylistSong (playlist_id, song_id) VALUES (?, ?)";
        const [result] = await pool.query(query, [playlistId, songId]);
        return result.affectedRows > 0;
    }

    async removeSongFromPlaylist(playlistId, songId) {
        const query = "DELETE FROM PlaylistSong WHERE playlist_id = ? AND song_id = ?";
        const [result] = await pool.query(query, [playlistId, songId]);
        return result.affectedRows > 0;
    }

    async getSongsInPlaylist(playlistId) {
        const query = "SELECT s.* FROM Song s JOIN PlaylistSong ps ON s.song_id = ps.song_id WHERE ps.playlist_id = ?";
        const [rows] = await pool.query(query, [playlistId]);
        return rows;
    }
}

module.exports = new PlaylistDAO();