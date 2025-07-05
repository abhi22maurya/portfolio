import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useEffect, useRef } from 'react';

export function ThemeToggle() {
  const { theme, setTheme, isDark } = useTheme();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLDivElement>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);

  // Focus management for keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!dropdownRef.current) return;
      
      const items = Array.from(
        dropdownRef.current.querySelectorAll('[role="menuitem"]')
      ) as HTMLElement[];
      
      if (!items.length) return;
      
      const currentIndex = items.indexOf(document.activeElement as HTMLElement);
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        items[nextIndex]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
        items[prevIndex]?.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        items[0]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        items[items.length - 1]?.focus();
      } else if (e.key === 'Escape') {
        const trigger = document.querySelector('[aria-haspopup]') as HTMLElement;
        trigger?.focus();
      }
    };

    const menu = dropdownRef.current;
    if (menu) {
      menu.addEventListener('keydown', handleKeyDown);
      return () => menu.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  return (
    <div className="theme-toggle" ref={dropdownRef}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-transparent border-0 hover:bg-black/20 focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:outline-none"
            aria-label="Toggle theme"
            aria-haspopup="true"
            aria-expanded={undefined} // Will be managed by DropdownMenu
          >
            {isDark ? (
              <Moon className="h-5 w-5 text-cyan-400" aria-hidden="true" />
            ) : (
              <Sun className="h-5 w-5 text-amber-500" aria-hidden="true" />
            )}
            <span className="sr-only">Toggle theme menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="bg-slate-900 border-slate-700 p-1 min-w-[140px]"
          onCloseAutoFocus={(e) => {
            // Prevent focus from being stolen when menu closes
            e.preventDefault();
          }}
        >
          <DropdownMenuItem 
            ref={firstItemRef}
            onClick={() => setTheme('light')} 
            className={`flex items-center px-3 py-2 text-sm rounded-md cursor-pointer ${
              theme === 'light' ? 'bg-slate-800 text-cyan-400' : 'text-gray-300 hover:bg-slate-800'
            }`}
            role="menuitemradio"
            aria-checked={theme === 'light'}
            tabIndex={-1}
          >
            <Sun className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme('dark')} 
            className={`flex items-center px-3 py-2 text-sm rounded-md cursor-pointer ${
              theme === 'dark' ? 'bg-slate-800 text-cyan-400' : 'text-gray-300 hover:bg-slate-800'
            }`}
            role="menuitemradio"
            aria-checked={theme === 'dark'}
            tabIndex={-1}
          >
            <Moon className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            ref={lastItemRef}
            onClick={() => setTheme('system')} 
            className={`flex items-center px-3 py-2 text-sm rounded-md cursor-pointer ${
              theme === 'system' ? 'bg-slate-800 text-cyan-400' : 'text-gray-300 hover:bg-slate-800'
            }`}
            role="menuitemradio"
            aria-checked={theme === 'system'}
            tabIndex={-1}
          >
            <Monitor className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
