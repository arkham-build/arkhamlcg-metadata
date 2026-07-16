import { z } from "zod";

export const scenarioSchema = z.strictObject({
    name: z.string().describe("Display name of the scenario."),
    code: z.string().describe("Unique code identifying the scenario."),
    campaign_code: z
        .string()
        .optional()
        .describe("Code of the campaign containing the scenario."),
    encounter_sets: z
        .array(
            z.strictObject({
                code: z
                    .string()
                    .describe("Code identifying the encounter set."),
                cards: z
                    .array(z.string())
                    .optional()
                    .describe(
                        "Specific card codes to include; when omitted, include the entire encounter set.",
                    ),
            }),
        )
        .describe("Encounter sets used by the scenario."),
});

export type Scenario = z.infer<typeof scenarioSchema>;
