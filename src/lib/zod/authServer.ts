import z from 'zod';
import { zPassword } from './definitions/password';
import { zEmailDoesNotExist, zEmailExist } from 'lib/zod/definitions/email/server';
import { getUserByEmail, validatePassword } from 'server/common/user';

export const validateRegister = (email: string, password: string, passwordDuplicate: string) =>
  z
    .object({ email: zEmailDoesNotExist, password: zPassword, passwordDuplicate: zPassword })
    .superRefine(({ password, passwordDuplicate }, ctx) => {
      if (password !== passwordDuplicate) {
        ctx.addIssue({
          code: 'custom',
          path: ['passwordDuplicate'],
          message: 'Passwords do not match',
        });
      }
    })
    .safeParse({ email, password, passwordDuplicate });

export const validateLogin = (email: string, password: string) =>
  z
    .object({ email: zEmailExist, password: zPassword })
    .superRefine(({ email, password }, ctx) => {
      const user = getUserByEmail(email);
      const validPassword = user && validatePassword(user.id, password);
      if (!validPassword) {
        ctx.addIssue({
          code: 'custom',
          path: ['password'],
          message: 'Incorrect password',
        });
      }
    })
    .safeParse({ email, password });
