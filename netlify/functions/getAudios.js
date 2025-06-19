// --- 📁 netlify/functions/getAudios.js ---
import { Client } from 'pg';

export default async (req, res) => {
  const client = new Client({
    connectionString: process.env.NEON_DATABASE_URL,
  });

  try {
    await client.connect();
    const result = await client.query('SELECT * FROM audios ORDER BY created_at DESC');
    return res.status(200).json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  } finally {
    await client.end();
  }
};

console.log("Connexion à :", process.env.NEON_DATABASE_URL);
