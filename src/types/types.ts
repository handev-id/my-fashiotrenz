export type ProductType = {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  size: string;
  quantity?: number | undefined;
  thumbnail: string;
  tags?: any | undefined;
  images: Array<string>;
  productId?: string;
};

export type UserRegisterType = {
  email: string;
  fullname: string;
  password: string;
  confPassword: string;
};

export type SessionType = {
  email: string;
  fullname: string;
  image: string;
};

export interface OrdersType {
  id?: string;
  accountName?: string;
  address?: string;
  email?: string;
  image?: string;
  name?: string;
  payment?: string;
  phone?: number;
  price?: number;
  quantity?: string;
  size?: string;
  status?: boolean;
  timestamp?: string;
  title?: string;
  userRekening?: string;
}