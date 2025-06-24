// --- 📁 netlify/functions/uploadAudio.js ---
import { Client } from 'pg';
import { v2 as cloudinary } from 'cloudinary';
import Busboy from 'busboy';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Méthode non autorisée' }),
    };
  }

  return new Promise((resolve, reject) => {
    const busboy = Busboy({ headers: event.headers });
    let title = '';
    let artist = '';
    let audioUrl = '';
    let imageUrl = '';

    let audioPromise;
    let imagePromise;

    busboy.on('field', (fieldname, val) => {
      if (fieldname === 'title') title = val;
      if (fieldname === 'artist') artist = val;
    });

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      if (fieldname === 'audio') {
        audioPromise = new Promise((resolveUpload, rejectUpload) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'video', folder: 'audios' },
            (error, result) => {
              if (error) rejectUpload(error);
              else {
                audioUrl = result.secure_url;
                resolveUpload();
              }
            }
          );
          file.pipe(stream);
        });
      }
      if (fieldname === 'image') {
        imagePromise = new Promise((resolveUpload, rejectUpload) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'image', folder: 'audio-covers' },
            (error, result) => {
              if (error) rejectUpload(error);
              else {
                imageUrl = result.secure_url;
                resolveUpload();
              }
            }
          );
          file.pipe(stream);
        });
      }
    });

    busboy.on('finish', async () => {
      try {
        if (audioPromise) await audioPromise;
        if (imagePromise) await imagePromise;
        if (!audioUrl) {
          resolve({
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Upload Cloudinary échoué' }),
          });
          return;
        }

        const client = new Client({ connectionString: process.env.DATABASE_URL });
        await client.connect();
        await client.query(
          'INSERT INTO audios (title, artist, audio_url, image_url, created_at) VALUES ($1, $2, $3, $4, NOW())',
          [title, artist, audioUrl, imageUrl]
        );
        await client.end();

        resolve({
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ success: true, audio_url: audioUrl, image_url: imageUrl }),
        });
      } catch (err) {
        resolve({
          statusCode: 500,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: err.message }),
        });
      }
    });

    // Pour Netlify, le body est en base64 si c'est un fichier
    const buffer = Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8');
    busboy.end(buffer);
  });
};