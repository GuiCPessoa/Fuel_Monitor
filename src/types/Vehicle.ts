
export interface Vehicle {
  id: string;
  licensePlate: string;
  vehicleNumber: string;
  fuelLevel: number;
}

export type FuelStatus = 'high' | 'medium' | 'low';

export const getFuelStatus = (fuelLevel: number): FuelStatus => {
  if (fuelLevel > 80) return 'high';
  if (fuelLevel > 30) return 'medium';
  return 'low';
};

export const getFuelColor = (fuelLevel: number): string => {
  const status = getFuelStatus(fuelLevel);
  switch (status) {
    case 'high': return '#4CAF50';
    case 'medium': return '#FFC107';
    case 'low': return '#F44336';
  }
};

export const calculateFuelWeeks = (fuelLevel: number): number => {
  // Nova fórmula: (nívelAtual% × 550 km autonomia total) / 216 km/semana
  // 36 km/dia × 6 dias = 216 km/semana
  // 55L tanque × 10 km/l = 550 km autonomia total
  return Math.round((fuelLevel * 550) / 216 / 100);
};

export const getFuelGauge = (fuelLevel: number): string => {
  if (fuelLevel >= 0 && fuelLevel <= 9) return 'Fuel Low';
  if (fuelLevel >= 10 && fuelLevel <= 34) return '1/4';
  if (fuelLevel >= 35 && fuelLevel <= 59) return '1/2';
  if (fuelLevel >= 60 && fuelLevel <= 84) return '3/4';
  if (fuelLevel >= 85 && fuelLevel <= 100) return '1';
  return 'Fuel Low';
};
