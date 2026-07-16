import { z } from "zod";

const commonGrimoireShape = {
    citation: z
        .string()
        .describe(
            "Citation code identifying the source document version. (e.g. faq-1.9 or grimoire-1.0)",
        ),
    id: z.string().describe("Unique identifier for the Grimoire entry."),
    position: z
        .number()
        .int()
        .min(1)
        .describe("Display position within the section."),
    section: z
        .string()
        .describe("Code of the Grimoire section containing the entry."),
    title: z.string().describe("Display title of the Grimoire entry."),
};

const grimoireTextEntrySchema = z.strictObject({
    ...commonGrimoireShape,
    references: z
        .array(z.string())
        .optional()
        .describe("Identifiers of related Grimoire entries."),
    text: z.string().optional().describe("Body text of the Grimoire entry."),
});

const grimoireFaqEntrySchema = z.strictObject({
    ...commonGrimoireShape,
    question: z.string().describe("Question addressed by the entry."),
    ruling: z.string().describe("Answer to the question."),
});

export const grimoireSchema = z.union([
    grimoireTextEntrySchema,
    grimoireFaqEntrySchema,
]);

export type Grimoire = z.infer<typeof grimoireSchema>;
