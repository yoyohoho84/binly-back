import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/database";
import { Form } from "../entity/Form";
import { FormData } from "../types";
import { IFormRepository } from "./formRepository";

export class PostgresFormRepository implements IFormRepository {
  private repository: Repository<Form>;

  constructor() {
    this.repository = AppDataSource.getRepository(Form);
  }

  async add(form: FormData): Promise<void> {
    const formEntity = this.repository.create({
      name: form.name,
      phone: form.phone,
      district: form.district,
      address: form.address,
      consent: form.consent,
    });
    await this.repository.save(formEntity);
  }

  async count(): Promise<number> {
    return await this.repository.count();
  }

  async getAll(): Promise<FormData[]> {
    const forms = await this.repository.find();
    return forms.map((form) => ({
      name: form.name,
      phone: form.phone,
      district: form.district,
      address: form.address,
      consent: form.consent,
      createdAt: form.createdAt,
    }));
  }
}
