const configuredApiUrl = import.meta.env.VITE_API_URL;

export const API_URL = (
  configuredApiUrl || "https://grading-api.rentify.software/api"
).replace(/\/+$/, "");
