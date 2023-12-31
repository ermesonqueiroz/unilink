import React, { useEffect, useState } from "react";
import { CaretLeft, CaretRight, Spinner } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { Link, Navigate, useLocation } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../contexts/Auth";

export function SignupPage() {
    const { search } = useLocation();
    const params = new URLSearchParams(search);

    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState(params.get("email") ?? "");
    const [password, setPassword] = useState("");

    const { updateAccessToken, isAuthenticated } = useAuth();

    const registerMutation = useMutation({
        mutationFn: async (user) => {
            const { data } = await api.post("/auth/signup", user);

            updateAccessToken(data.access_token);
        },
    });

    function handleRegisterSubmit(e) {
        e.preventDefault();

        registerMutation.mutate({
            username,
            display_name: displayName,
            email,
            password,
        });
    }

    useEffect(() => {
        setEmail(params.get("email"));
    }, []);

    if (isAuthenticated) return <Navigate to="/app" />;
    return (
        <div>
            <header className="absolute px-4 md:px-8 mt-8 top-0">
                <a
                    className="text-zinc-700 font-bold flex items-center gap-1 text-lg hover:text-zinc-900 transition-colors"
                    href="/"
                >
                    <CaretLeft size={16} weight="bold" /> Home
                </a>
            </header>

            <form
                className="max-w-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-start flex-col px-4"
                onSubmit={handleRegisterSubmit}
            >
                <h1 className="text-zinc-900 font-bold text-2xl tracking-tight">
                    Sign up to unilink
                </h1>
                <p className="text-zinc-500 text-lg pb-4">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-blue-400">
                        Sign in
                    </Link>
                </p>

                <div className="flex flex-col gap-1 w-full pb-2">
                    <p className="text-zinc-700">Username</p>
                    <input
                        className="border-zinc-300 border px-2 rounded-md h-10 bg-zinc-100 w-full text-zinc-800 placeholder:text-zinc-500"
                        type="text"
                        placeholder="johndoe"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                </div>

                <div className="flex flex-col gap-1 w-full pb-2">
                    <p className="text-zinc-700">Display name</p>
                    <input
                        className="border-zinc-300 border px-2 rounded-md h-10 bg-zinc-100 w-full text-zinc-800 placeholder:text-zinc-500"
                        type="text"
                        placeholder="John Doe"
                        onChange={(e) => setDisplayName(e.target.value)}
                        value={displayName}
                    />
                </div>

                <div className="flex flex-col gap-1 w-full pb-2">
                    <p className="text-zinc-700">Email</p>
                    <input
                        className="border-zinc-300 border px-2 rounded-md h-10 bg-zinc-100 w-full text-zinc-800 placeholder:text-zinc-500"
                        type="email"
                        placeholder="john.doe@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className="flex flex-col gap-1 w-full pb-3">
                    <p className="text-zinc-700">Password</p>
                    <input
                        className="border-zinc-300 border px-2 rounded-md h-10 bg-zinc-100 w-full text-zinc-800 placeholder:text-zinc-400"
                        type="password"
                        placeholder="••••••••"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <button
                    className="bg-zinc-900 w-full h-10 rounded-md flex text-zinc-200 items-center justify-center gap-1 leading-none font-medium"
                    type="submit"
                >
                    {!registerMutation.isLoading ? (
                        <>
                            Continue{" "}
                            <CaretRight
                                className="text-zinc-400"
                                size={16}
                                weight="bold"
                            />
                        </>
                    ) : (
                        <Spinner
                            className="text-zinc-200 animate-spin"
                            size={18}
                            weight="bold"
                        />
                    )}
                </button>
            </form>
        </div>
    );
}
