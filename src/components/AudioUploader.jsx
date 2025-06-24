// --- 📁 src/components/AudioUploader.jsx ---
import React, { useState, useEffect } from 'react';
import { UploadCloud } from 'lucide-react';

function AudioUploader() {
  const [audios, setAudios] = useState([]);
  const [form, setForm] = useState({ title: '', artist: '' });
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState('');

  const fetchAudios = async () => {
    const res = await fetch('/.netlify/functions/getAudios');
    const data = await res.json();
    setAudios(data);
  };

  useEffect(() => {
    fetchAudios();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!audioFile || !form.title || !form.artist) {
      setStatus('Veuillez remplir tous les champs et sélectionner un fichier audio.');
      return;
    }

    const formData = new FormData();
    formData.append('audio', audioFile);
    if (imageFile) formData.append('image', imageFile);
    formData.append('title', form.title);
    formData.append('artist', form.artist);

    setStatus('Envoi en cours...');
    try {
      const res = await fetch('/.netlify/functions/uploadAudio', {
        method: 'POST',
        body: formData,
      });
      let data;
      try {
        data = await res.json();
      } catch (e) {
        setStatus('Erreur serveur : ' + e.message);
        return;
      }
      if (res.ok) {
        setStatus('Fichier envoyé avec succès !');
        setForm({ title: '', artist: '' });
        setAudioFile(null);
        setImageFile(null);
        fetchAudios();
      } else {
        setStatus(data?.error || 'Erreur lors de l’envoi.');
      }
    } catch (err) {
      setStatus('Erreur réseau.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow space-y-8">
      <h2 className="text-2xl font-bold text-flame-bright flex items-center gap-2">
        🎵 Ajouter un morceau
      </h2>
      <form
        onSubmit={handleUpload}
        className="flex flex-col gap-4 bg-flame-light/10 p-4 rounded-lg"
      >
        <input
          placeholder="Titre"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="px-4 py-2 rounded border border-flame-light focus:ring-2 focus:ring-flame-bright focus:outline-none"
          required
        />
        <input
          placeholder="Artiste"
          value={form.artist}
          onChange={e => setForm({ ...form, artist: e.target.value })}
          className="px-4 py-2 rounded border border-flame-light focus:ring-2 focus:ring-flame-bright focus:outline-none"
          required
        />
        <label className="block">
          <span className="block text-sm font-medium text-flame-bright mb-1">
            Sélectionnez un fichier audio
          </span>
          <input
            type="file"
            accept="audio/*"
            onChange={e => setAudioFile(e.target.files[0])}
            className="block w-full text-sm text-gray-900 border border-flame-light rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-flame-bright file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-flame-bright file:text-white hover:file:bg-flame-medium transition"
            required
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-flame-bright mb-1">
            Image de couverture (optionnelle)
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={e => setImageFile(e.target.files[0])}
            className="block w-full text-sm text-gray-900 border border-flame-light rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-flame-bright file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-flame-bright file:text-white hover:file:bg-flame-medium transition"
          />
        </label>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-flame-bright hover:bg-flame-medium text-white font-bold py-2 px-6 rounded-full shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!audioFile || !form.title || !form.artist}
        >
          <UploadCloud className="w-5 h-5" />
          Envoyer
        </button>
        {status && (
          <div className="text-center text-sm mt-2 text-flame-medium">
            {status}
          </div>
        )}
      </form>

      <div>
        <h3 className="text-xl font-semibold text-flame-bright mb-4 flex items-center gap-2">
          🎧 Morceaux enregistrés
        </h3>
        <ul className="space-y-4">
          {audios.map(audio => (
            <li
              key={audio.id}
              className="bg-flame-light/10 rounded-lg p-4 flex flex-col gap-2 shadow-sm"
            >
              <div className="flex items-center gap-4">
                {audio.image_url && (
                  <img
                    src={audio.image_url}
                    alt={audio.title}
                    className="w-16 h-16 object-cover rounded shadow"
                  />
                )}
                <div>
                  <div className="font-bold text-flame-medium">{audio.title}</div>
                  <div className="text-sm text-gray-700">{audio.artist}</div>
                </div>
              </div>
              <audio controls src={audio.audio_url} className="w-full mt-2" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AudioUploader;