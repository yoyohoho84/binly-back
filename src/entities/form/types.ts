export interface FormData {
  name: string; // Name
  phone: string; // Phone
  district: string; // District
  address: string; // Address
  consent: boolean; // Consent to processing
  createdAt: Date;
}

export interface FormResponse {
  success: boolean;
  message: string;
  data?: FormData;
}
