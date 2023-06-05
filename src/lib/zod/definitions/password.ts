import z from 'zod';

const minPasswordLength = 4;

export const zPassword = z
  .string()
  .min(minPasswordLength, { message: `Minimum ${minPasswordLength} characters` });
