import { Building } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
}

export function Navbar({ currentPage }: NavbarProps) {
  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Building className="h-8 w-8 text-primary" />
            <span className="font-semibold text-xl text-primary">ResidencialHub</span>
          </div>

          {/* Navigation info */}
          <div className="flex items-center">
            <span className="px-3 py-2 rounded-md bg-primary text-primary-foreground">
              {currentPage === 'project-detail' ? 'Detalles del Proyecto' : 
               currentPage === 'detail' ? 'Detalles de la Propiedad' : 
               'Catálogo de Propiedades'}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}