import { LendingInterface } from 'interfaces/lending';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ClientInterface {
  id?: string;
  name: string;
  contact_info: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  lending?: LendingInterface[];
  user?: UserInterface;
  _count?: {
    lending?: number;
  };
}

export interface ClientGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  contact_info?: string;
  user_id?: string;
}
