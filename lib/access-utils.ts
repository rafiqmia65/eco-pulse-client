export const AccessLevel = {
  ADMIN_FULL_ACCESS: "ADMIN_FULL_ACCESS",
  OWNER_FULL_ACCESS: "OWNER_FULL_ACCESS",
  PAID_FULL_ACCESS: "PAID_FULL_ACCESS",
  PUBLIC_FREE: "PUBLIC_FREE",
  PUBLIC_FREE_GUEST: "PUBLIC_FREE_GUEST",
  LIMITED_PREVIEW: "LIMITED_PREVIEW",
  GUEST_PREVIEW: "GUEST_PREVIEW",
  PURCHASED_FULL_ACCESS: "PURCHASED_FULL_ACCESS",
} as const;

export const isLockedAccess = (level: string) =>
  level === AccessLevel.LIMITED_PREVIEW || level === AccessLevel.GUEST_PREVIEW;

export const isOwnerOrAdmin = (level: string) =>
  level === AccessLevel.OWNER_FULL_ACCESS ||
  level === AccessLevel.ADMIN_FULL_ACCESS;

export const isPaidOrFreeAccess = (level: string) =>
  level === AccessLevel.PAID_FULL_ACCESS ||
  level === AccessLevel.PURCHASED_FULL_ACCESS ||
  level === AccessLevel.PUBLIC_FREE ||
  level === AccessLevel.PUBLIC_FREE_GUEST;

export const canVote = (level: string) => isPaidOrFreeAccess(level);

export const canInteract = (level: string) => isPaidOrFreeAccess(level);

export const canPurchase = (level: string) =>
  level === AccessLevel.LIMITED_PREVIEW ||
  level === AccessLevel.GUEST_PREVIEW ||
  level === AccessLevel.PUBLIC_FREE_GUEST;

export const isFullAccess = (level: string) =>
  level === AccessLevel.ADMIN_FULL_ACCESS ||
  level === AccessLevel.OWNER_FULL_ACCESS ||
  level === AccessLevel.PAID_FULL_ACCESS ||
  level === AccessLevel.PURCHASED_FULL_ACCESS ||
  level === AccessLevel.PUBLIC_FREE ||
  level === AccessLevel.PUBLIC_FREE_GUEST;
