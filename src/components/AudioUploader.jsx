// --- 📁 src/components/AudioUploader.jsx ---
import React, { useState, useEffect } from 'react';
import { UploadCloud } from 'lucide-react';

function AudioUploader() {
  const [audios, setAudios] = useState([]);
  const [form, setForm] = useState({ title: '', artist: '', audio_url: '' });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const fetchAudios = async () => {
    const res = await fetch('/.netlify/functions/getAudios');
    const data = await res.json();
    setAudios(data);
  };

  useEffect(() => {
    fetchAudios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/.netlify/functions/uploadAudio', {
      method: 'POST',
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ title: '', artist: '', audio_url: '' });
      fetchAudios();
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setStatus('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setStatus('Veuillez sélectionner un fichier audio.');

    const formData = new FormData();
    formData.append('audio', file);

    setStatus('Envoi en cours...');
    try {
      const res = await fetch('/.netlify/functions/uploadAudio', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setStatus('Fichier envoyé avec succès !');
        setFile(null);
      } else {
        setStatus('Erreur lors de l’envoi.');
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
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-flame-light/10 p-4 rounded-lg"
      >
        <input
          placeholder="Titre"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="px-4 py-2 rounded border border-flame-light focus:ring-2 focus:ring-flame-bright focus:outline-none"
        />
        <input
          placeholder="Artiste"
          value={form.artist}
          onChange={e => setForm({ ...form, artist: e.target.value })}
          className="px-4 py-2 rounded border border-flame-light focus:ring-2 focus:ring-flame-bright focus:outline-none"
        />
        <input
          placeholder="URL Audio"
          value={form.audio_url}
          onChange={e => setForm({ ...form, audio_url: e.target.value })}
          className="px-4 py-2 rounded border border-flame-light focus:ring-2 focus:ring-flame-bright focus:outline-none"
        />
        <button
          type="submit"
          className="bg-flame-bright hover:bg-flame-medium text-white font-semibold py-2 px-6 rounded-full shadow transition"
        >
          Uploader
        </button>
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
              <div className="font-bold text-flame-medium">{audio.title}</div>
              <div className="text-sm text-gray-700">{audio.artist}</div>
              <audio controls src={audio.audio_url} className="w-full mt-2" />
            </li>
          ))}
        </ul>
      </div>

      <form
        onSubmit={handleUpload}
        className="flex flex-col gap-4 bg-flame-light/10 p-4 rounded-lg"
      >
        <label className="block">
          <span className="block text-sm font-medium text-flame-bright mb-1">
            Sélectionnez un fichier audio
          </span>
          <input
            type="file"
            accept="audio/*"
            onChange={handleChange}
            className="block w-full text-sm text-gray-900 border border-flame-light rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-flame-bright file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-flame-bright file:text-white hover:file:bg-flame-medium transition"
          />
        </label>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-flame-bright hover:bg-flame-medium text-white font-bold py-2 px-6 rounded-full shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!file}
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
    </div>
  );
}

export default AudioUploader;