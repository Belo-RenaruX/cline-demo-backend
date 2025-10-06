import { z } from 'zod';

import { UserDMSchema } from '../../dms/user.dm';

export const UserDTOSchema = UserDMSchema.partial();

export type UserDTO = z.infer<typeof UserDTOSchema>;
