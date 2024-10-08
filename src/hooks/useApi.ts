import { useQuery, useMutation } from "@tanstack/react-query";
import { ApiService } from "@/services/api.service";
import { LoginCredentials } from "@/services/api.types";

export const useProducts = (params: {
  limit?: number;
  skip?: number;
  category?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => ApiService.getProducts(params),
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => ApiService.getProduct(id),
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: ApiService.getCategories,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      ApiService.login(credentials),
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: ApiService.getCurrentUser,
  });
};
