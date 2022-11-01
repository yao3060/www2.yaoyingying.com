/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

// You may need the next line in some situations
import * as IronSession from "iron-session";
import { User } from "hooks/useUser";

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
