// --- 📁 src/components/AudioUploader.jsx ---
import { useState, useEffect } from 'react';

function AudioUploader() {
  const [audios, setAudios] = useState([]);
  const [form, setForm] = useState({ title: '', artist: '', audio_url: '' });

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

  return (
    <div>
      <h2>🎵 Ajouter un morceau</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Titre" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Artiste" value={form.artist} onChange={e => setForm({ ...form, artist: e.target.value })} />
        <input placeholder="URL Audio" value={form.audio_url} onChange={e => setForm({ ...form, audio_url: e.target.value })} />
        <button type="submit">Uploader</button>
      </form>

      <h3>🎧 Morceaux enregistrés</h3>
      <ul>
        {audios.map(audio => (
          <li key={audio.id}>
            <strong>{audio.title}</strong> - {audio.artist}
            <br />
            <audio controls src={audio.audio_url} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AudioUploader;