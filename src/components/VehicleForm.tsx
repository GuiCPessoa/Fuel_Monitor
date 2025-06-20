
import { useState, useEffect } from 'react';
import { Vehicle } from '@/types/Vehicle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface VehicleFormProps {
  vehicle?: Vehicle | null;
  onSubmit: (vehicle: Omit<Vehicle, 'id'>) => void;
  onCancel: () => void;
}

export const VehicleForm = ({ vehicle, onSubmit, onCancel }: VehicleFormProps) => {
  const [licensePlate, setLicensePlate] = useState('');
  const [fuelLevel, setFuelLevel] = useState('');
  const [errors, setErrors] = useState<{ licensePlate?: string; fuelLevel?: string }>({});

  useEffect(() => {
    if (vehicle) {
      setLicensePlate(vehicle.licensePlate);
      setFuelLevel(vehicle.fuelLevel.toString());
    }
  }, [vehicle]);

  const validateLicensePlate = (plate: string): boolean => {
    // Brazilian license plate formats: ABC-1234 or ABC1D23
    const oldFormat = /^[A-Z]{3}-\d{4}$/;
    const newFormat = /^[A-Z]{3}\d[A-Z]\d{2}$/;
    return oldFormat.test(plate.toUpperCase()) || newFormat.test(plate.toUpperCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { licensePlate?: string; fuelLevel?: string } = {};
    
    // Validate license plate
    if (!licensePlate.trim()) {
      newErrors.licensePlate = 'Placa é obrigatória';
    } else if (!validateLicensePlate(licensePlate)) {
      newErrors.licensePlate = 'Formato inválido (ex: ABC-1234 ou ABC1D23)';
    }
    
    // Validate fuel level
    const fuelNumber = parseFloat(fuelLevel);
    if (!fuelLevel.trim()) {
      newErrors.fuelLevel = 'Nível de combustível é obrigatório';
    } else if (isNaN(fuelNumber) || fuelNumber < 0 || fuelNumber > 100) {
      newErrors.fuelLevel = 'Deve estar entre 0 e 100%';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        licensePlate: licensePlate.toUpperCase(),
        fuelLevel: fuelNumber,
      });
      setLicensePlate('');
      setFuelLevel('');
    }
  };

  const formatLicensePlate = (value: string) => {
    // Auto-format as user types
    const cleaned = value.replace(/[^A-Z0-9]/g, '').toUpperCase();
    
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 7) {
      // Try old format first
      if (cleaned.length === 7 && /^[A-Z]{3}\d{4}$/.test(cleaned)) {
        return cleaned.slice(0, 3) + '-' + cleaned.slice(3);
      }
      // New format
      return cleaned;
    }
    
    return cleaned.slice(0, 7);
  };

  const handleLicensePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatLicensePlate(e.target.value);
    setLicensePlate(formatted);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        {vehicle ? 'Editar Veículo' : 'Adicionar Novo Veículo'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* License Plate */}
        <div className="space-y-2">
          <Label htmlFor="licensePlate" className="text-slate-700 font-medium">
            Placa do Veículo
          </Label>
          <Input
            id="licensePlate"
            type="text"
            value={licensePlate}
            onChange={handleLicensePlateChange}
            placeholder="ABC-1234 ou ABC1D23"
            className={`font-mono ${errors.licensePlate ? 'border-red-500' : ''}`}
          />
          {errors.licensePlate && (
            <p className="text-red-500 text-sm">{errors.licensePlate}</p>
          )}
        </div>

        {/* Fuel Level */}
        <div className="space-y-2">
          <Label htmlFor="fuelLevel" className="text-slate-700 font-medium">
            Nível de Combustível (%)
          </Label>
          <Input
            id="fuelLevel"
            type="number"
            min="0"
            max="100"
            value={fuelLevel}
            onChange={(e) => setFuelLevel(e.target.value)}
            placeholder="0-100"
            className={errors.fuelLevel ? 'border-red-500' : ''}
          />
          {errors.fuelLevel && (
            <p className="text-red-500 text-sm">{errors.fuelLevel}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            {vehicle ? 'Salvar Alterações' : 'Adicionar Veículo'}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="px-6 py-2 rounded-lg border-slate-300 text-slate-600 hover:bg-slate-50"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};
