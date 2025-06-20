
import { useState } from 'react';
import { VehicleList } from '@/components/VehicleList';
import { VehicleForm } from '@/components/VehicleForm';
import { Vehicle } from '@/types/Vehicle';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Fuel } from 'lucide-react';

const Index = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddVehicle = (vehicleData: Omit<Vehicle, 'id'>) => {
    const newVehicle: Vehicle = {
      ...vehicleData,
      id: Date.now().toString(),
    };
    setVehicles([...vehicles, newVehicle]);
    setShowForm(false);
  };

  const handleEditVehicle = (vehicleData: Omit<Vehicle, 'id'>) => {
    if (editingVehicle) {
      setVehicles(vehicles.map(v => 
        v.id === editingVehicle.id 
          ? { ...vehicleData, id: editingVehicle.id }
          : v
      ));
      setEditingVehicle(null);
      setShowForm(false);
    }
  };

  const handleDeleteVehicle = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  const openEditForm = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingVehicle(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Fuel className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800">Fuel Monitor</h1>
          </div>
          <p className="text-slate-600">Sistema de monitoramento de combustível para veículos</p>
        </div>

        {/* Add Vehicle Button */}
        <div className="mb-6">
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Adicionar Veículo
          </Button>
        </div>

        {/* Vehicle Form */}
        {showForm && (
          <Card className="mb-8 p-6 bg-white shadow-lg border border-slate-200">
            <VehicleForm
              vehicle={editingVehicle}
              onSubmit={editingVehicle ? handleEditVehicle : handleAddVehicle}
              onCancel={closeForm}
            />
          </Card>
        )}

        {/* Vehicle List */}
        <VehicleList
          vehicles={vehicles}
          onEdit={openEditForm}
          onDelete={handleDeleteVehicle}
        />

        {/* Empty State */}
        {vehicles.length === 0 && !showForm && (
          <Card className="p-12 text-center bg-white shadow-lg border border-slate-200">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-slate-100 rounded-full">
                <Fuel className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700">Nenhum veículo cadastrado</h3>
              <p className="text-slate-500 max-w-md">
                Comece adicionando seu primeiro veículo para monitorar o nível de combustível
              </p>
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Adicionar Primeiro Veículo
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
