const configuredApiUrl = import.meta.env.VITE_API_URL;

export const API_URL = (
  configuredApiUrl || "https://grading-api.207.127.97.160.sslip.io/api"
).replace(/\/+$/, "");
