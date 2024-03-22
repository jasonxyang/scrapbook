const ROUTES = {
  open_ai: ["healthcheck"],
  healthcheck: [],
} as const;

type Routes = typeof ROUTES;

export type ApiRoutes = {
  [key in keyof Routes]: `/api/${key}/${Routes[key][number]}` | `/api/${key}`;
}[keyof Routes];
