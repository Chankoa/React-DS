import React from 'react';
import AudioUploader from '../components/AudioUploader';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-[#333] dark:to-[#1a1a1a] p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin – Upload audio</h1>
      <AudioUploader />
    </div>
  );
}