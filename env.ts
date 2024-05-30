import { z } from "zod";

const schema = z.object({
    API_URL: z.string(),
});

export const parsedEnv = schema.parse(process.env);