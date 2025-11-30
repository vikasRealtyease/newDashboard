import { LoginForm } from "@realtyeaseai/ui";
import { signIn } from "@realtyeaseai/auth";
import { AuthError } from "next-auth";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.realtyeaseai.com";

export default function LoginPage() {
    async function authenticate(values: any) {
        "use server";
        try {
            // Attempt to sign in with credentials
            await signIn("credentials", {
                ...values,
                redirectTo: `${APP_URL}/dashboard`,
            });
        } catch (error) {
            if (error instanceof AuthError) {
                switch (error.type) {
                    case "CredentialsSignin":
                        return "Invalid credentials.";
                    default:
                        return "Something went wrong.";
                }
            }
            // Re-throw redirect errors (Next.js uses errors for redirects)
            throw error;
        }
    }

    return (
        <LoginForm onSubmit={authenticate} />
    );
}
