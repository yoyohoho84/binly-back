import { Router, Request, Response } from "express";
import { Form } from "../../entities/form/entity/Form";
import { validateForm } from "../../config/validation";
import logger from "../../config/logger";
import { formStore } from "../../entities/form/model/store";

const router = Router();

router.post("/form", async (req: Request, res: Response): Promise<void> => {
  try {
    // Валидация входящих данных
    const { error, value } = validateForm(req.body);
    if (error) {
      logger.warn("Validation error:", error.details);
      res.status(400).json({
        error: "Validation Error",
        details: error.details.map((detail) => ({
          field: detail.path.join("."),
          message: detail.message,
        })),
      });
      return;
    }

    const form = formStore.add(value as Form);
    logger.info("Form submitted successfully:", { id: form.id });

    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      data: form,
    });
  } catch (err) {
    logger.error("Error submitting form:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to submit form",
    });
  }
});

router.get("/form", async (_req: Request, res: Response): Promise<void> => {
  try {
    const forms = formStore.getAll();
    res.json(forms);
  } catch (err) {
    logger.error("Error fetching forms:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch forms",
    });
  }
});

router.get("/form/count", (_req: Request, res: Response): void => {
  try {
    const count = formStore.getAll().length;
    res.json({ count });
  } catch (err) {
    logger.error("Error counting forms:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to count forms",
    });
  }
});

export default router;
