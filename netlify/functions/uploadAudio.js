// --- 📁 netlify/functions/uploadAudio.js ---
import { Client } from 'pg';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const client = new Client({
    connectionString: process.env.NEON_DATABASE_URL,
  });

  try {
    await client.connect();
    const { title, artist, audio_url } = JSON.parse(req.body);
    await client.query(
      'INSERT INTO audios (title, artist, audio_url) VALUES ($1, $2, $3)',
      [title, artist, audio_url]
    );
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur', details: err.message });
  } finally {
    await client.end();
  }
};