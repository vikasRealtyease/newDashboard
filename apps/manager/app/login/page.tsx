import { LoginForm } from "@realtyeaseai/ui";
import { signIn } from "@realtyeaseai/auth";
import { AuthError } from "next-auth";

export default function LoginPage() {
    async function authenticate(values: any) {
        "use server";
        try {
            await signIn("credentials", values);
        } catch (error) {
            if (error instanceof AuthError) {
                switch (error.type) {
                    case "CredentialsSignin":
                        return "Invalid credentials.";
                    default:
                        return "Something went wrong.";
                }
            }
            throw error;
        }
    }

    return (
        <LoginForm onSubmit={authenticate} />
    );
}
