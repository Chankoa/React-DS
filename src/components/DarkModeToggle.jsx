import { useDarkMode } from '../hooks/useDarkMode';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

export function DarkModeToggle() {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsDark(!isDark)}
      className="rounded-full p-2 hover:bg-white/20 transition-colors"
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
    >
      <span className="sr-only">
        {isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      </span>
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-slate-700" />
      )}
    </Button>
  );
}