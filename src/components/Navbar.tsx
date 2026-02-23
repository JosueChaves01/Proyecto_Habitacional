import { Building, Home, Layers, LogIn, User, Rocket, LayoutDashboard, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface NavbarProps {
  currentPage: string;
  onNavigateHome?: () => void;
  onNavigateProjects?: () => void;
  onNavigateProperties?: () => void;
  onLoginClick?: () => void;
  isAuthenticated?: boolean;
  userName?: string;
  onLogout?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToKickoff?: () => void;
}

export function Navbar({ 
  currentPage, 
  onNavigateHome, 
  onNavigateProjects, 
  onNavigateProperties,
  onLoginClick,
  isAuthenticated = false,
  userName,
  onLogout,
  onNavigateToDashboard,
  onNavigateToKickoff
}: NavbarProps) {
  return (
    <nav className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={onNavigateHome}
            className="flex items-center space-x-2 hover:opacity-80 transition-all group"
          >
            <div className="relative">
              <Building className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-semibold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Costa Rica Residencial
            </span>
          </button>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant={currentPage === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={onNavigateHome}
              className="gap-1.5"
            >
              <Home className="h-4 w-4" />
              <span className="hidden md:inline">Inicio</span>
            </Button>
            
            <Button
              variant={currentPage === 'all-projects' ? 'default' : 'ghost'}
              size="sm"
              onClick={onNavigateProjects}
              className="gap-1.5"
            >
              <Layers className="h-4 w-4" />
              <span className="hidden md:inline">Proyectos</span>
            </Button>
            
            <Button
              variant={currentPage === 'all-properties' ? 'default' : 'ghost'}
              size="sm"
              onClick={onNavigateProperties}
              className="gap-1.5"
            >
              <Building className="h-4 w-4" />
              <span className="hidden md:inline">Propiedades</span>
            </Button>

            {/* Auth Button */}
            <div className="ml-2 pl-2 border-l border-border">
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button 
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all cursor-pointer group"
                      >
                        <User className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                        <span className="hidden md:inline text-sm font-medium">{userName}</span>
                        <Badge variant="secondary" className="text-xs">Admin</Badge>
                        <ChevronDown className="h-3 w-3 text-muted-foreground" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Panel de Administración</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={onNavigateToDashboard} className="cursor-pointer">
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Dashboard
                      </DropdownMenuItem>
                      {onNavigateToKickoff && (
                        <DropdownMenuItem onClick={onNavigateToKickoff} className="cursor-pointer">
                          <Rocket className="h-4 w-4 mr-2 text-emerald-600" />
                          <span className="text-emerald-700">Project Kickoff</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-destructive focus:text-destructive">
                        <LogIn className="h-4 w-4 mr-2 rotate-180" />
                        Cerrar Sesión
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={onLoginClick}
                  className="gap-1.5 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="hidden md:inline">Iniciar Sesión</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}