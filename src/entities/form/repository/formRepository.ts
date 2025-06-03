import { FormData } from "../types";

export interface IFormRepository {
  add(form: FormData): Promise<void>;
  count(): Promise<number>;
  getAll(): Promise<FormData[]>;
}

// Реализация для in-memory хранилища
export class InMemoryFormRepository implements IFormRepository {
  private forms: FormData[] = [];

  async add(form: FormData): Promise<void> {
    this.forms.push(form);
  }

  async count(): Promise<number> {
    return this.forms.length;
  }

  async getAll(): Promise<FormData[]> {
    return this.forms;
  }
}

// Создаем экземпляр репозитория
export const formRepository = new InMemoryFormRepository();
