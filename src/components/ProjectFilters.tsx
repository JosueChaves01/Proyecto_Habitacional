import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { 
  Filter, 
  X, 
  ChevronDown,
  Building2,
  CheckCircle,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';

export interface ProjectFilterOptions {
  developerSearch: string;
  status: string[];
}

interface ProjectFiltersProps {
  filters: ProjectFilterOptions;
  onFiltersChange: (filters: ProjectFilterOptions) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const statusOptions = [
  { value: 'disponible', label: 'Disponible' },
  { value: 'en-construccion', label: 'En Construcción' },
  { value: 'pre-venta', label: 'Pre-venta' },
  { value: 'terminado', label: 'Terminado' },
];

export function ProjectFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  isOpen,
  onToggle,
}: ProjectFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['developer', 'status'])
  );

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handleStatusChange = (status: string) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    onFiltersChange({ ...filters, status: newStatus });
  };

  const activeFiltersCount = 
    (filters.developerSearch ? 1 : 0) + 
    filters.status.length;

  return (
    <div className="mb-6">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filtros
          {activeFiltersCount > 0 && (
            <Badge variant="default" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            onClick={onClearFilters}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Limpiar Filtros
          </Button>
        )}
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Developer Search Filter */}
                  <div>
                    <button
                      onClick={() => toggleSection('developer')}
                      className="flex items-center justify-between w-full mb-3 group"
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <Label className="cursor-pointer group-hover:text-primary transition-colors">
                          Desarrolladora
                        </Label>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform ${
                          expandedSections.has('developer') ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    <AnimatePresence>
                      {expandedSections.has('developer') && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="text"
                              placeholder="Buscar desarrolladora..."
                              value={filters.developerSearch}
                              onChange={(e) => 
                                onFiltersChange({ ...filters, developerSearch: e.target.value })
                              }
                              className="pl-9"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Separator className="md:hidden" />

                  {/* Status Filter */}
                  <div>
                    <button
                      onClick={() => toggleSection('status')}
                      className="flex items-center justify-between w-full mb-3 group"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        <Label className="cursor-pointer group-hover:text-primary transition-colors">
                          Estado
                        </Label>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform ${
                          expandedSections.has('status') ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    <AnimatePresence>
                      {expandedSections.has('status') && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2 overflow-hidden"
                        >
                          {statusOptions.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <Checkbox
                                id={`status-${option.value}`}
                                checked={filters.status.includes(option.value)}
                                onCheckedChange={() => handleStatusChange(option.value)}
                              />
                              <label
                                htmlFor={`status-${option.value}`}
                                className="text-sm cursor-pointer hover:text-primary transition-colors"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
