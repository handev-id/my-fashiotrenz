export type ProductType = {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  quantity?: number | undefined;
  thumbnail: string;
  images: Array<string>;
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
