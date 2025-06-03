import { Router, Request, Response } from "express";
import { formStore } from "../../entities/form/model/store";
import { FormData, FormResponse } from "../../entities/form/types";

const router = Router();

interface FormRequestBody {
  name: string;
  phone: string;
  district: string;
  address: string;
  consent: boolean;
}

const handleFormSubmit = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, phone, district, address, consent } =
      req.body as FormRequestBody;

    // Проверка обязательных полей
    if (!name || !phone || !district || !address || consent === undefined) {
      const response: FormResponse = {
        success: false,
        message: "Все поля обязательны для заполнения",
      };
      res.status(400).json(response);
      return;
    }

    // Проверка согласия
    if (!consent) {
      const response: FormResponse = {
        success: false,
        message: "Необходимо согласие на обработку данных",
      };
      res.status(400).json(response);
      return;
    }

    const formData: FormData = {
      name,
      phone,
      district,
      address,
      consent,
      createdAt: new Date(),
    };

    await formStore.add(formData);

    const response: FormResponse = {
      success: true,
      message: "Форма успешно отправлена",
      data: formData,
    };

    res.json(response);
  } catch (error) {
    const response: FormResponse = {
      success: false,
      message: "Ошибка при отправке формы",
    };
    res.status(400).json(response);
  }
};

const handleFormCount = async (_req: Request, res: Response): Promise<void> => {
  const count = await formStore.count();
  res.json({ count });
};

router.post("/form", handleFormSubmit);
router.get("/form/count", handleFormCount);

export default router;
