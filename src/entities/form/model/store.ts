import fs from "fs";
import path from "path";
import { Form } from "../entity/Form";

const DB_FILE = path.join(process.cwd(), "data", "forms.json");

// Создаем директорию для данных, если её нет
if (!fs.existsSync(path.dirname(DB_FILE))) {
  fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
}

// Создаем файл, если его нет
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

class FormStore {
  private forms: Form[] = [];

  constructor() {
    this.loadForms();
  }

  private loadForms(): void {
    try {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      this.forms = JSON.parse(data);
    } catch (error) {
      console.error("Error loading forms:", error);
      this.forms = [];
    }
  }

  private saveForms(): void {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.forms, null, 2));
    } catch (error) {
      console.error("Error saving forms:", error);
    }
  }

  add(form: Form): Form {
    const newForm = {
      ...form,
      id: this.forms.length + 1,
      createdAt: new Date(),
    };
    this.forms.push(newForm);
    this.saveForms();
    return newForm;
  }

  getAll(): Form[] {
    return this.forms;
  }

  getById(id: number): Form | undefined {
    return this.forms.find((form) => form.id === id);
  }
}

export const formStore = new FormStore();
