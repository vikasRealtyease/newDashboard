import { LoginForm } from "../../components/LoginForm";
import { signIn } from "@realtyeaseai/auth";
import { AuthError } from "next-auth";

export default function LoginPage() {
    async function authenticate(values: any) {
        "use server";
        try {
            await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: true,
                redirectTo: process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:4001" // Redirect to client app after login
            });
        } catch (error) {
            if (error instanceof AuthError) {
                switch (error.type) {
                    case "CredentialsSignin":
                        return { error: "Invalid credentials." };
                    default:
                        return { error: "Something went wrong." };
                }
            }
            throw error;
        }
    }

    return <LoginForm onSubmit={authenticate} />;
}
