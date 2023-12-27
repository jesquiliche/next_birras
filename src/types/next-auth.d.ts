import "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    two_factor_secret: string | null;
    two_factor_recovery_codes: string[] | null;
    two_factor_confirmed_at: string | null;
    created_at: string;
    updated_at: string;
  }
  
  interface Authorization {
    token: string;
    type: string;
  }
  
  interface Session {
    user: User;
    authorization: Authorization;
    iat: number;
    exp: number;
    jti: string;
  }
  
}
