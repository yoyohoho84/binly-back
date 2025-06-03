export interface Form {
  id?: number;
  name: string;
  email: string;
  phone: string;
  district: string;
  address: string;
  message: string;
  consent: boolean;
  createdAt?: Date;
}
