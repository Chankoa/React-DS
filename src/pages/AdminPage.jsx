import React from 'react';
import AudioUploader from '../components/AudioUploader';
import { Card } from '@/components/ui/card';
import { ShieldCheck, UploadCloud, ListMusic, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const adminNav = [
	{ label: 'Accueil', to: '/', icon: <Home className="w-4 h-4 mr-1" /> },
	{ label: 'Upload audio', to: '/admin', icon: <UploadCloud className="w-4 h-4 mr-1" /> },
	{ label: 'Liste des audios', to: '/admin/audios', icon: <ListMusic className="w-4 h-4 mr-1" /> },
];

export default function AdminPage() {
	const location = useLocation();

	return (
		<div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-[#333] dark:to-[#1a1a1a] flex flex-col">
			<header className="w-full py-8 bg-white/10 dark:bg-[#1a1a1a]/80 border-b border-white/20 shadow-sm">
				<div className="container mx-auto flex items-center gap-4">
					<ShieldCheck className="w-8 h-8 text-flame-bright" />
					<h1 className="text-3xl font-bold text-flame-bright tracking-tight">
						Espace Admin
					</h1>
					<span className="ml-2 px-3 py-1 rounded-full bg-flame-light/20 text-flame-medium text-xs font-semibold">
						Privé
					</span>
				</div>
				<nav className="container mx-auto mt-6 flex gap-2">
					{adminNav.map((item) => (
						<Link
							key={item.to}
							to={item.to}
							className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${
					location.pathname === item.to
						? 'bg-flame-bright text-white shadow'
						: 'text-flame-bright hover:bg-flame-light/30 hover:text-flame-medium'
				}
                `}
						>
							{item.icon}
							{item.label}
						</Link>
					))}
				</nav>
			</header>
			<main className="flex-1 flex items-center justify-center">
				<Card className="glass-effect border-white/20 max-w-lg w-full mx-4 p-8 shadow-xl">
					<div className="flex flex-col items-center mb-6">
						<UploadCloud className="w-12 h-12 text-flame-bright mb-2" />
						<h2 className="text-2xl font-bold mb-1 text-flame-bright">
							Uploader un fichier audio
						</h2>
						<p className="text-gray-600 dark:text-gray-300 text-center text-sm mb-2">
							Ajoutez de nouveaux fichiers audio à la bibliothèque.
							<br />
							Formats acceptés :{' '}
							<span className="font-mono">mp3, wav, ogg</span>
						</p>
					</div>
					<AudioUploader />
				</Card>
			</main>
		</div>
	);
}