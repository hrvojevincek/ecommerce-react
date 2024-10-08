// src/services/api.service.ts
import { AxiosResponse } from "axios";
import { axiosInstance } from "@/lib/axios";
import {
  Product,
  ProductsResponse,
  LoginCredentials,
  AuthResponse,
} from "./api.types";
import { User } from "@/types/auth.types";

export class ApiService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/login",
      credentials
    );
    return response.data;
  }

  static async getCurrentUser(): Promise<User> {
    const response = await axiosInstance.get<User>("/auth/me");
    return response.data;
  }

  static async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/refresh-token",
      {
        refreshToken,
      }
    );
    return response.data;
  }

  static async getProducts(params: {
    limit?: number;
    skip?: number;
    category?: string;
    search?: string;
  }): Promise<ProductsResponse> {
    const response = await axiosInstance.get<ProductsResponse>("/products", {
      params,
    });
    return response.data;
  }

  static async getProduct(id: number): Promise<Product> {
    const response = await axiosInstance.get<Product>(`/products/${id}`);
    return response.data;
  }

  static async getCategories(): Promise<string[]> {
    const response = await axiosInstance.get<string[]>("/products/categories");
    return response.data;
  }
}
