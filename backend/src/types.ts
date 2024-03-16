import { User } from "@prisma/client";

export interface AccessTokenPayloadUser {
  userId: string;
  role: User["role"];
}

export interface RefreshTokenPayload {
  userId: string;
  jti: any;
}
