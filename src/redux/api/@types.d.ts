export type User = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
};

export type LoginDto = {
  username: string;
  password: string;
};
