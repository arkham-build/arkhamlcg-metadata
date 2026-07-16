import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { type ZodType, z } from "zod";

import { campaignSchema } from "../schemas/campaign.schema.ts";
import { errataSchema } from "../schemas/errata.schema.ts";
import { faqSchema } from "../schemas/faq.schema.ts";
import { grimoireSchema } from "../schemas/grimoire.schema.ts";
import { scenarioSchema } from "../schemas/scenario.schema.ts";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));

function jsonFiles(directory: string, excludedFiles: string[] = []): string[] {
    const directoryPath = join(projectRoot, directory);

    return readdirSync(directoryPath, { withFileTypes: true })
        .filter(
            (entry) =>
                entry.isFile() &&
                entry.name.endsWith(".json") &&
                !excludedFiles.includes(entry.name),
        )
        .map((entry) => join(directoryPath, entry.name))
        .sort();
}

const datasets: Array<{ schema: ZodType; files: string[] }> = [
    {
        files: [join(projectRoot, "campaigns/campaigns.json")],
        schema: campaignSchema,
    },
    { files: jsonFiles("errata"), schema: errataSchema },
    { files: jsonFiles("faqs"), schema: faqSchema },
    {
        files: jsonFiles("grimoire", ["sections.json"]),
        schema: grimoireSchema,
    },
    {
        files: [join(projectRoot, "scenarios/scenarios.json")],
        schema: scenarioSchema,
    },
];

let validatedObjectCount = 0;
let validatedFileCount = 0;

for (const { schema, files } of datasets) {
    for (const file of files) {
        try {
            const input: unknown = JSON.parse(readFileSync(file, "utf8"));
            const objects = z.array(schema).parse(input);
            validatedObjectCount += objects.length;
            validatedFileCount += 1;
        } catch (error) {
            throw new Error(
                `Validation failed for ${relative(projectRoot, file)}`,
                { cause: error },
            );
        }
    }
}

console.log(
    `Validated ${validatedObjectCount} objects across ${validatedFileCount} files.`,
);
