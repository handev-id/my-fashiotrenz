import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/get/products");
      const products = await response.json();
      return products;
    },
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export const useProduct = (id: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await fetch(`/api/get/product/${id}`);
      const product = await response.json();
      return product;
    },
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export const useCategory = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await fetch("/api/get/category");
      const category = await response.json();
      return category;
    },
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export const useCarts = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["carts"],
    queryFn: async () => {
      const response = await fetch("/api/get/carts");
      const carts = await response.json();
      return carts;
    },
  });
  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
