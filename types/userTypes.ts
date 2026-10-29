export interface User {
    name: string;
    email: string;
    phone: string | null;
    passwordHash: string;
    role: Role;
    status: UserStatus;
    image?: string
}

type Role = "ADMIN" | "USER";
type UserStatus = "ACTIVE" | "BLOCKED"