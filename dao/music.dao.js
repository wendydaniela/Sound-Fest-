const pool = require("../services/mysql.service");

class MusicDAO {
    async getAllArtists() {
        const query = "SELECT * FROM Artist";
        const [rows] = await pool.query(query);
        return rows;
    }

    async getArtistById(artistId) {
        const query = "SELECT * FROM Artist WHERE artist_id = ?";
        const [rows] = await pool.query(query, [artistId]);
        return rows[0] || null;
    }

    async createArtist(artistData) {
        const query = "INSERT INTO Artist (name, country, biography, image_url) VALUES (?, ?, ?, ?)";
        const [result] = await pool.query(query, [
            artistData.name,
            artistData.country,
            artistData.biography,
            artistData.image_url
        ]);
        return result.insertId;
    }

    async updateArtist(artistId, artistData) {
        const query = "UPDATE Artist SET name = ?, country = ?, biography = ?, image_url = ? WHERE artist_id = ?";
        const [result] = await pool.query(query, [
            artistData.name,
            artistData.country,
            artistData.biography,
            artistData.image_url,
            artistId
        ]);
        return result.affectedRows > 0;
    }

    async deleteArtist(artistId) {
        const query = "DELETE FROM Artist WHERE artist_id = ?";
        const [result] = await pool.query(query, [artistId]);
        return result.affectedRows > 0;
    }

    async getAllSongs() {
        const query = "SELECT s.*, a.name AS artist_name FROM Song s JOIN Artist a ON s.artist_id = a.artist_id";
        const [rows] = await pool.query(query);
        return rows;
    }

    async getSongById(songId) {
        const query = "SELECT * FROM Song WHERE song_id = ?";
        const [rows] = await pool.query(query, [songId]);
        return rows[0] || null;
    }

    async createSong(songData) {
        const query = "INSERT INTO Song (title, genre, duration_seconds, cover_image, audio_url, artist_id, release_date, play_count) VALUES (?, ?, ?, ?, ?, ?, ?, 0)";
        const [result] = await pool.query(query, [
            songData.title,
            songData.genre,
            songData.duration_seconds,
            songData.cover_image,
            songData.audio_url,
            songData.artist_id,
            songData.release_date
        ]);
        return result.insertId;
    }

    async updateSong(songId, songData) {
        const query = "UPDATE Song SET title = ?, genre = ?, duration_seconds = ?, cover_image = ?, audio_url = ?, artist_id = ?, release_date = ? WHERE song_id = ?";
        const [result] = await pool.query(query, [
            songData.title,
            songData.genre,
            songData.duration_seconds,
            songData.cover_image,
            songData.audio_url,
            songData.artist_id,
            songData.release_date,
            songId
        ]);
        return result.affectedRows > 0;
    }

    async deleteSong(songId) {
        const query = "DELETE FROM Song WHERE song_id = ?";
        const [result] = await pool.query(query, [songId]);
        return result.affectedRows > 0;
    }
}

module.exports = new MusicDAO();