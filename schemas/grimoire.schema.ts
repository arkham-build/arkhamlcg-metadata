import { z } from "zod";

const commonGrimoireShape = {
    section: z
        .string()
        .describe("Code of the Grimoire section containing the entry."),
    id: z.string().describe("Unique identifier for the Grimoire entry."),
    position: z
        .number()
        .int()
        .min(1)
        .describe("Display position within the section."),
    title: z.string().describe("Display title of the Grimoire entry."),
    citation: z
        .string()
        .describe(
            "Citation code identifying the source document version. (e.g. faq-1.9 or grimoire-1.0)",
        ),
};

const grimoireTextEntrySchema = z.strictObject({
    ...commonGrimoireShape,
    text: z.string().optional().describe("Body text of the Grimoire entry."),
    references: z
        .array(z.string())
        .optional()
        .describe("Identifiers of related Grimoire entries."),
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
