import { RoleType } from "@/constants/roles";

export const PUBLIC_AUTH_ROUTES = ["/login", "/register"];

export const isAuthRoute = (pathname: string) =>
  PUBLIC_AUTH_ROUTES.includes(pathname);

export type RouteConfig = {
  exact: string[];
  pattern: RegExp[];
};

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/change-password"],
  pattern: [],
};

export const adminProtectedRoutes: RouteConfig = {
  pattern: [/^\/admin/],
  exact: [],
};

export const memberProtectedRoutes: RouteConfig = {
  pattern: [/^\/dashboard/],
  exact: [],
};

export const isRouteMatches = (pathname: string, routes: RouteConfig) => {
  if (routes.exact.includes(pathname)) return true;
  return routes.pattern.some((pattern) => pattern.test(pathname));
};

export type RouteOwner = "ADMIN" | "MEMBER" | "COMMON";

export const getRouteOwner = (pathname: string): RouteOwner | null => {
  if (isRouteMatches(pathname, adminProtectedRoutes)) return "ADMIN";
  if (isRouteMatches(pathname, memberProtectedRoutes)) return "MEMBER";
  if (isRouteMatches(pathname, commonProtectedRoutes)) return "COMMON";
  return null;
};

export const getDefaultDashboardRoute = (role: RoleType): string => {
  if (role === "ADMIN") return "/admin/dashboard";
  return "/dashboard";
};

export const isValidRedirectForRole = (
  redirectPath: string,
  role: RoleType,
): boolean => {
  const sanitizedPath = redirectPath.split("?")[0];
  const routeOwner = getRouteOwner(sanitizedPath);

  if (routeOwner === null || routeOwner === "COMMON") return true;

  if (role === "ADMIN" && routeOwner === "ADMIN") return true;
  if (role === "MEMBER" && routeOwner === "MEMBER") return true;

  return false;
};
