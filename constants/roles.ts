export const role = {
  ADMIN: "ADMIN",
  MEMBER: "MEMBER",
} as const;

export type RoleType = (typeof role)[keyof typeof role];
