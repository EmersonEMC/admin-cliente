import { Address } from './addess.entity';

export class Cliente {
  id!: string;
  name!: string;
  birthday!: string;
  cpf!: string;
  rg!: string;
  phone!: string;
  addresses!: Address[];
}
