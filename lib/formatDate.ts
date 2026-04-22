import { formatDistanceToNow, format } from "date-fns";

export const formatTimeAgo = (date: string) => {
  const d = new Date(date);

  const timeAgo = formatDistanceToNow(d, { addSuffix: true });
  const formattedDate = format(d, "dd MMM yyyy, hh:mm a");

  return `${formattedDate} • ${timeAgo}`;
};
