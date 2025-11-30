import { LoginForm } from "../../components/LoginForm";
import { signIn, auth } from "@realtyeaseai/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default function LoginPage() {
    async function authenticate(values: any) {
        "use server";
        try {
            await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            const session = await auth();
            const user = session?.user;

            if (!user) {
                return { error: "Authentication failed." };
            }

            // @ts-ignore
            const roles = user.roles || [];
            // @ts-ignore
            const primaryRole = roles.find((r: any) => r.isPrimary)?.role || roles[0]?.role;

            let redirectUrl = process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:4001";

            switch (primaryRole) {
                case 'ADMIN':
                    redirectUrl = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:4003";
                    break;
                case 'MANAGER':
                    redirectUrl = process.env.NEXT_PUBLIC_MANAGER_URL || "http://localhost:4002";
                    break;
                case 'VA':
                    redirectUrl = process.env.NEXT_PUBLIC_VA_URL || "http://localhost:4004";
                    break;
                case 'CLIENT':
                default:
                    redirectUrl = process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:4001";
                    break;
            }

            redirect(redirectUrl);

        } catch (error) {
            if (error instanceof AuthError) {
                switch (error.type) {
                    case "CredentialsSignin":
                        return { error: "Invalid credentials." };
                    default:
                        return { error: "Something went wrong." };
                }
            }
            // If it's a redirect error (from next/navigation), rethrow it
            throw error;
        }
    }

    return <LoginForm onSubmit={authenticate} />;
}
