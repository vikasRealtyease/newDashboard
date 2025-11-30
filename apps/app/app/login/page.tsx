import { LoginForm } from "@realtyeaseai/ui";
import { signIn } from "@realtyeaseai/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default function LoginPage() {
    async function authenticate(values: any) {
        "use server";
        try {
            // Attempt to sign in with credentials
            // NextAuth will handle the redirect to /dashboard via middleware
            await signIn("credentials", {
                ...values,
                redirectTo: "/dashboard",
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
