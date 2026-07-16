import { z } from "zod";

export const faqSchema = z.strictObject({
    type: z.literal("faq").describe("Identifies a frequently asked question."),
    card_codes: z
        .array(z.string())
        .optional()
        .describe("Codes of cards relevant to the question."),
    cycles: z
        .array(z.string())
        .optional()
        .describe("Codes of cycles relevant to the question."),
    scenario_codes: z
        .array(z.string())
        .optional()
        .describe("Codes of scenarios relevant to the question."),
    question: z.string().describe("Question addressed by the ruling."),
    ruling: z.string().describe("Answer to the question."),
    citation: z
        .string()
        .describe(
            "Citation code identifying the source document version. (e.g. faq-1.9 or grimoire-1.0)",
        ),
});

export type Faq = z.infer<typeof faqSchema>;
