import { zEmail } from 'lib/zod/definitions/email/client';
import { db } from 'server/db';
import { getUserByEmail } from 'server/common/user';

export const zEmailDoesNotExist = zEmail.refine((e) => {
  return !getUserByEmail(e);
}, 'Email already exists');

export const zEmailExist = zEmail.refine((e) => {
  return db.users.some((el) => el.email === e);
}, 'Email does not exist');
