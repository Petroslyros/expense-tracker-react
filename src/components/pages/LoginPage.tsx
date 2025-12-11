import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { type UserLogin, userLoginSchema } from "@/schemas/login.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router";
import { useAuth } from "@/hooks/useAuth.ts";

export default function LoginPage() {
    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<UserLogin>({
        resolver: zodResolver(userLoginSchema),
        defaultValues: {
            username: "",
            password: "",
            keepLoggedIn: false,
        }
    });

    const onSubmit = async (data: UserLogin) => {
        try {
            await loginUser(data);
            toast.success("Login successful");
            navigate("/expenses");
        } catch (err) {
            // Debug: log what error we're getting
            console.error("Login error:", err);

            // Backend throws "Bad Credentials" for any auth failure
            // Don't specify which field is wrong (security best practice)
            if (err instanceof Error) {
                console.log("Error message:", err.message);

                if (err.message.includes("Bad Credentials") || err.message.includes("Unauthorized") || err.message.includes("Login failed")) {
                    // Set error on both fields so user knows something was wrong
                    setError("username", {
                        type: "manual",
                        message: "Invalid username or password"
                    });
                    setError("password", {
                        type: "manual",
                        message: "Invalid username or password"
                    });
                } else {
                    // Other errors (network, server error, etc.)
                    toast.error(err.message || "Login failed");
                }
            } else {
                toast.error("Login failed");
            }
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl text-center mb-6">Login</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-sm mx-auto p-8 border rounded-md space-y-4"
                autoComplete="off"
            >
                <div>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" {...register("username")} />
                    {errors.username && (
                        <div className="text-red-600 text-sm">
                            {errors.username.message}
                        </div>
                    )}
                </div>

                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" {...register("password")} />
                    {errors.password && (
                        <div className="text-red-600 text-sm">
                            {errors.password.message}
                        </div>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="keepLoggedIn"
                        {...register("keepLoggedIn")}
                        className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="keepLoggedIn" className="cursor-pointer font-normal">
                        Keep me logged in
                    </Label>
                </div>

                <Button disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Logging in..." : "Login"}
                </Button>

                <div className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Register here
                    </Link>
                </div>
            </form>
        </div>
    );
}