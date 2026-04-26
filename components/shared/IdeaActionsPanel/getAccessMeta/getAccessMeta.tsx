export const getAccessMeta = (level: string) => {
  switch (level) {
    case "ADMIN_FULL_ACCESS":
    case "OWNER_FULL_ACCESS":
    case "PAID_FULL_ACCESS":
    case "PURCHASED_FULL_ACCESS":
    case "PUBLIC_FREE":
    case "PUBLIC_FREE_GUEST":
    case "LIMITED_PREVIEW":
    case "GUEST_PREVIEW":
      return {
        label: level.replaceAll("_", " "),
        color: "bg-muted text-foreground",
      };

    default:
      return {
        label: "Unknown",
        color: "bg-muted text-foreground",
      };
  }
};
