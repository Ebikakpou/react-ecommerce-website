import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Auth() {
    const [mode, setMode] = useState("signup");
    const [error, setError] = useState(null);

    const { signUp, login } = useAuth();
    const navigate = useNavigate();
const location = useLocation();

const from =
    location.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    function onSubmit(data) {
        setError(null);

        const result =
            mode === "signup"
                ? signUp(data.email, data.password)
                : login(data.email, data.password);

        if (result.success) {
            navigate(from, { replace: true });
        } else {
            setError(result.error);
        }
    }

    return (
        <div className="page">
            <div className="container">
                <div className="auth-container">
                    <h1 className="page-title">
                        {mode === "signup"
                            ? "Sign Up"
                            : "Login"}
                    </h1>

                    <form
                        className="auth-form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label
                                className="form-label"
                                htmlFor="email"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                className="form-input"
                                placeholder="Enter your email"
                                autoComplete="email"
                                {...register("email", {
                                    required:
                                        "Email is required",
                                    pattern: {
                                        value:
                                            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message:
                                            "Please enter a valid email address",
                                    },
                                })}
                            />

                            {errors.email && (
                                <span className="form-error">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>

                        <div className="form-group">
                            <label
                                className="form-label"
                                htmlFor="password"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                className="form-input"
                                placeholder="Enter your password"
                                autoComplete={
                                    mode === "signup"
                                        ? "new-password"
                                        : "current-password"
                                }
                                {...register("password", {
                                    required:
                                        "Password is required",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters",
                                    },
                                    maxLength: {
                                        value: 20,
                                        message:
                                            "Password must not exceed 20 characters",
                                    },
                                })}
                            />

                            {errors.password && (
                                <span className="form-error">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-large"
                        >
                            {mode === "signup"
                                ? "Sign Up"
                                : "Login"}
                        </button>
                    </form>

                    <div className="auth-switch">
                        {mode === "signup" ? (
                            <p>
                                Already have an account?{" "}
                                <span
                                    className="auth-link"
                                    onClick={() =>
                                        setMode("login")
                                    }
                                >
                                    Login
                                </span>
                            </p>
                        ) : (
                            <p>
                                Don't have an account?{" "}
                                <span
                                    className="auth-link"
                                    onClick={() =>
                                        setMode("signup")
                                    }
                                >
                                    Sign Up
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}