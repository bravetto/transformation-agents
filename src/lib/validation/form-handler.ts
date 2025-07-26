import { ZodError, ZodSchema } from "zod";

interface ProcessedData {
  [key: string]: any;
}

export type FormState<T> = {
  data?: T;
  errors?: Partial<Record<keyof T, string>>;
  message?: string;
  success?: boolean;
};

export async function validateFormData<T>(
  formData: FormData,
  schema: ZodSchema<T>,
): Promise<FormState<T>> {
  try {
    // Convert FormData to object
    const rawData: ProcessedData = Object.fromEntries(formData);

    // Handle numeric fields
    if ("yearsKnown" in rawData && rawData.yearsKnown) {
      rawData.yearsKnown = parseInt(rawData.yearsKnown as string);
    }

    // Handle boolean fields
    ["isPublic", "willTestifyInCourt", "canBeContacted", "consent"].forEach(
      (field) => {
        if (field in rawData) {
          rawData[field] = rawData[field] === "true" || rawData[field] === "on";
        }
      },
    );

    // Validate data
    const data = schema.parse(rawData) as T;

    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: Partial<Record<keyof T, string>> = {};

      error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as keyof T] = err.message;
        }
      });

      return {
        success: false,
        errors,
        message: "Please check the form for errors",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
