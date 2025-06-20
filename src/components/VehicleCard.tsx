
import { Vehicle, getFuelColor, calculateFuelWeeks } from '@/types/Vehicle';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onEdit: () => void;
  onDelete: () => void;
}

export const VehicleCard = ({ vehicle, onEdit, onDelete }: VehicleCardProps) => {
  const fuelColor = getFuelColor(vehicle.fuelLevel);
  const weeksRemaining = calculateFuelWeeks(vehicle.fuelLevel);

  return (
    <Card className="p-6 bg-white shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="space-y-4">
        {/* License Plate */}
        <div className="flex items-center justify-between">
          <div className="bg-slate-800 text-white px-3 py-1 rounded font-mono text-sm font-bold tracking-wider">
            {vehicle.licensePlate}
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="p-2 hover:bg-blue-50 hover:text-blue-600"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="p-2 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Fuel Level */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 font-medium">Nível de Combustível</span>
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: fuelColor }}
              />
              <span className="font-bold text-lg" style={{ color: fuelColor }}>
                {vehicle.fuelLevel}%
              </span>
            </div>
          </div>

          {/* Fuel Bar */}
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{
                width: `${vehicle.fuelLevel}%`,
                backgroundColor: fuelColor,
              }}
            />
          </div>
        </div>

        {/* Prediction */}
        <div className="bg-slate-50 rounded-lg p-3">
          <div className="text-sm text-slate-600 mb-1">Previsão para abastecimento</div>
          <div className="font-bold text-slate-800">
            {weeksRemaining === 1 ? '1 semana' : `${weeksRemaining} semanas`}
          </div>
        </div>
      </div>
    </Card>
  );
};
