import { db } from 'server/db';
import { IUser } from 'common/user';
import { decrypt } from 'server/common/encrypt';

export function getUserByEmail(email: string): IUser | null {
  return db.users.find((el) => el.email === email) ?? null;
}

export function validatePassword(userId: number, password: string): boolean {
  const userPassword = db.passwords.find((el) => el.userId === userId);
  const decryptedPassword =
    userPassword && decrypt(process.env.REACT_APP_SALT_KEY, userPassword.value);

  return decryptedPassword === password;
}
