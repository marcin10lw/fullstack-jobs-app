import { createClient } from "@supabase/supabase-js";

const projectUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseAPIKey = process.env.SUPABASE_API_KEY;

if (!projectUrl || !supabaseAPIKey) {
  throw new Error("Need to provide supabase project url and API key");
}

export const supabase = createClient(projectUrl, supabaseAPIKey);
