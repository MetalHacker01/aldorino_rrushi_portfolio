import data from "@/v2/data/latest-commit.json";

export const useLatestCommit = (): string => {
  const msg = (data as { message?: string }).message ?? "";
  if (!msg) return "";
  return msg.length > 60 ? msg.slice(0, 57) + "..." : msg;
};
