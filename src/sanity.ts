import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "rpqti50y",
  dataset: "production",
  apiVersion: "2025-06-11",
  useCdn: true,
});