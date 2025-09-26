import { useState } from 'react';
import { FilterOptions } from '../types/property';
import { zones, propertyTypes, statusOptions } from '../data/mockData';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Filter, X } from 'lucide-react';

interface PropertyFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function PropertyFilters({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  isOpen, 
  onToggle 
}: PropertyFiltersProps) {
  const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange);

  const handleZoneChange = (zone: string, checked: boolean) => {
    const newZones = checked 
      ? [...filters.zone, zone]
      : filters.zone.filter(z => z !== zone);
    onFiltersChange({ ...filters, zone: newZones });
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked 
      ? [...filters.type, type]
      : filters.type.filter(t => t !== type);
    onFiltersChange({ ...filters, type: newTypes });
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatus = checked 
      ? [...filters.status, status]
      : filters.status.filter(s => s !== status);
    onFiltersChange({ ...filters, status: newStatus });
  };

  const handleBedroomsChange = (bedrooms: string, checked: boolean) => {
    const bedroomNum = parseInt(bedrooms);
    const newBedrooms = checked 
      ? [...filters.bedrooms, bedroomNum]
      : filters.bedrooms.filter(b => b !== bedroomNum);
    onFiltersChange({ ...filters, bedrooms: newBedrooms });
  };

  const handlePriceRangeCommit = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  if (!isOpen) {
    return (
      <div className="mb-6">
        <Button 
          onClick={onToggle}
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Mostrar Filtros
        </Button>
      </div>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filtros de Búsqueda
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onToggle}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Zona */}
          <div className="space-y-3">
            <Label>Zona</Label>
            <div className="space-y-2">
              {zones.map((zone) => (
                <div key={zone} className="flex items-center space-x-2">
                  <Checkbox
                    id={`zone-${zone}`}
                    checked={filters.zone.includes(zone)}
                    onCheckedChange={(checked) => handleZoneChange(zone, checked as boolean)}
                  />
                  <Label htmlFor={`zone-${zone}`} className="text-sm font-normal">
                    {zone}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Tipo de Propiedad */}
          <div className="space-y-3">
            <Label>Tipo de Propiedad</Label>
            <div className="space-y-2">
              {propertyTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={filters.type.includes(type)}
                    onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
                  />
                  <Label htmlFor={`type-${type}`} className="text-sm font-normal capitalize">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Habitaciones */}
          <div className="space-y-3">
            <Label>Habitaciones</Label>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((bedrooms) => (
                <div key={bedrooms} className="flex items-center space-x-2">
                  <Checkbox
                    id={`bedrooms-${bedrooms}`}
                    checked={filters.bedrooms.includes(bedrooms)}
                    onCheckedChange={(checked) => handleBedroomsChange(bedrooms.toString(), checked as boolean)}
                  />
                  <Label htmlFor={`bedrooms-${bedrooms}`} className="text-sm font-normal">
                    {bedrooms}+ hab.
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Estado */}
          <div className="space-y-3">
            <Label>Estado</Label>
            <div className="space-y-2">
              {statusOptions.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status}`}
                    checked={filters.status.includes(status)}
                    onCheckedChange={(checked) => handleStatusChange(status, checked as boolean)}
                  />
                  <Label htmlFor={`status-${status}`} className="text-sm font-normal capitalize">
                    {status}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rango de Precio */}
        <div className="space-y-4">
          <Label>Rango de Precio: ${localPriceRange[0].toLocaleString()} - ${localPriceRange[1].toLocaleString()}</Label>
          <Slider
            value={localPriceRange}
            onValueChange={setLocalPriceRange}
            onValueCommit={handlePriceRangeCommit}
            max={500000}
            min={100000}
            step={10000}
            className="w-full"
          />
        </div>

        {/* Área */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="minArea">Área Mínima (m²)</Label>
            <Input
              id="minArea"
              type="number"
              value={filters.minArea}
              onChange={(e) => onFiltersChange({ 
                ...filters, 
                minArea: parseInt(e.target.value) || 0 
              })}
              placeholder="50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxArea">Área Máxima (m²)</Label>
            <Input
              id="maxArea"
              type="number"
              value={filters.maxArea}
              onChange={(e) => onFiltersChange({ 
                ...filters, 
                maxArea: parseInt(e.target.value) || 1000 
              })}
              placeholder="200"
            />
          </div>
        </div>

        {/* Botón Limpiar Filtros */}
        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={onClearFilters}>
            Limpiar Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}