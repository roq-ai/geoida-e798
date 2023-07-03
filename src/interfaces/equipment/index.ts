import { LendingInterface } from 'interfaces/lending';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface EquipmentInterface {
  id?: string;
  name: string;
  status: string;
  company_id?: string;
  created_at?: any;
  updated_at?: any;
  lending?: LendingInterface[];
  company?: CompanyInterface;
  _count?: {
    lending?: number;
  };
}

export interface EquipmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  status?: string;
  company_id?: string;
}
