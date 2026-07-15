import { z } from "zod";

export const campaignSchema = z.strictObject({
    code: z.string().describe("Unique code identifying the campaign."),
    name: z.string().describe("Display name of the campaign."),
    scenarios: z
        .array(z.string())
        .describe("Codes of the scenarios included in the campaign."),
});

export type Campaign = z.infer<typeof campaignSchema>;
