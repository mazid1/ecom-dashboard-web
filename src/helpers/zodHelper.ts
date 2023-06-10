import { z } from "zod";

/** Transform empty string to undefined */
const emptyStringToUndefined = z.literal("").transform(() => undefined);

/** Allow empty string and transform it to undefined */
export function asOptionalField<T extends z.ZodTypeAny>(schema: T) {
  return schema.optional().or(emptyStringToUndefined);
}
