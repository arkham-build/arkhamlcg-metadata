import { z } from "zod";

const commonErrataShape = {
    ruling: z.string().describe("Corrected text supplied by the erratum."),
    citation: z
        .string()
        .describe(
            "Citation code identifying the source document version. (e.g. faq-1.9 or grimoire-1.0)",
        ),
};

const cardErrataSchema = z.strictObject({
    type: z.literal("card_errata").describe("Identifies a card erratum."),
    card_codes: z
        .array(z.string())
        .describe("Codes of the cards affected by the erratum."),
    ...commonErrataShape,
});

const campaignErrataSchema = z.strictObject({
    type: z
        .literal("campaign_errata")
        .describe("Identifies a campaign erratum."),
    cycles: z
        .array(z.string())
        .describe("Codes of the cycles affected by the erratum."),
    scenario_codes: z
        .array(z.string())
        .optional()
        .describe("Codes of the scenarios affected by the erratum."),
    ...commonErrataShape,
});

const rulebookErrataSchema = z.strictObject({
    type: z
        .literal("rulebook_errata")
        .describe("Identifies a rulebook erratum."),
    section: z
        .string()
        .describe("Id of the rulebook section affected by the erratum."),
    ...commonErrataShape,
});

export const errataSchema = z.discriminatedUnion("type", [
    cardErrataSchema,
    campaignErrataSchema,
    rulebookErrataSchema,
]);

export type Errata = z.infer<typeof errataSchema>;
