import { EquipmentInterface } from 'interfaces/equipment';
import { ClientInterface } from 'interfaces/client';
import { GetQueryInterface } from 'interfaces';

export interface LendingInterface {
  id?: string;
  lending_date: any;
  return_date?: any;
  equipment_id?: string;
  client_id?: string;
  created_at?: any;
  updated_at?: any;

  equipment?: EquipmentInterface;
  client?: ClientInterface;
  _count?: {};
}

export interface LendingGetQueryInterface extends GetQueryInterface {
  id?: string;
  equipment_id?: string;
  client_id?: string;
}
