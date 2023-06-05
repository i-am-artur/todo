export interface IUser {
  id: number;
  email: string;
}

export interface IUserPassword {
  id: number;
  userId: number;
  value: string;
}
