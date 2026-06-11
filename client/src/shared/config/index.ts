const apiOrigin = import.meta.env.VITE_API_URL?.replace(/\/$/, '');

/** Local dev: `/api` → Vite proxy. Production: `VITE_API_URL` + `/api`. */
export const API_BASE_URL = apiOrigin ? `${apiOrigin}/api` : '/api';
