import { DefaultSession } from "next-auth"
import type { Role } from "@realtyeaseai/database"

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            roles: Role[];
            primaryRole: Role;
        } & DefaultSession["user"]
    }

    interface User {
        roles?: { role: Role; isPrimary: boolean }[];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        roles: Role[];
        primaryRole: Role;
    }
}
