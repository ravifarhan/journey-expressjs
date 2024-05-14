export interface IRegister {
  fullname: string;
  email: string;
  password: string;
  phone: string;
}

export type authMiddlewareData = {
  id: string;
};

export interface IJourney {
  id: number;
  title: string;
  description: string;
  image?: string;
  userId: number;
}

