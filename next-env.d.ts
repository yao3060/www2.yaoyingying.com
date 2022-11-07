/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

import { User } from "hooks/useUser";
import * as IronSession from "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
