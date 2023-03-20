import UserRole from './user-role';

import { CoreOutput } from './../Output/output';

export type CreateAccountOutput = CoreOutput & {};

export type CreateAcountMutation = {
  createAccount: CreateAccountOutput;
};

export type CreateAccountMutationVariables = {
  email: string;
  password: string;
  role: UserRole;
};
