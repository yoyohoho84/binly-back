import { FormData } from "../types";

class FormStore {
  private forms: FormData[] = [];

  add(form: FormData): void {
    this.forms.push(form);
  }

  count(): number {
    return this.forms.length;
  }

  getAll(): FormData[] {
    return this.forms;
  }
}

export const formStore = new FormStore();
