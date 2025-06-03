export interface FormData {
  name: string; // Имя
  phone: string; // Телефон
  district: string; // Район
  address: string; // Адрес
  consent: boolean; // Согласие на обработку
  createdAt: Date;
}

export interface FormResponse {
  success: boolean;
  message: string;
  data?: FormData;
}
