import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/services/public/categories.services";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};
