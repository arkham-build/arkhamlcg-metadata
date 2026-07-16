import { z } from "zod";

export const faqSchema = z.strictObject({
    card_codes: z
        .array(z.string())
        .optional()
        .describe("Codes of cards relevant to the question."),
    citation: z
        .string()
        .describe(
            "Citation code identifying the source document version. (e.g. faq-1.9 or grimoire-1.0)",
        ),
    cycles: z
        .array(z.string())
        .optional()
        .describe("Codes of cycles relevant to the question."),
    question: z.string().describe("Question addressed by the ruling."),
    ruling: z.string().describe("Answer to the question."),
    scenario_codes: z
        .array(z.string())
        .optional()
        .describe("Codes of scenarios relevant to the question."),
    type: z.literal("faq").describe("Identifies a frequently asked question."),
});

export type Faq = z.infer<typeof faqSchema>;
