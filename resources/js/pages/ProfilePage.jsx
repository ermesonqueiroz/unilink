import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api";
import { ReadonlyLink } from "../components";

export function ProfilePage() {
    const { username } = useParams();

    const [data, setData] = useState({});

    useEffect(() => {
        async function execute() {
            const { data } = await api.get(`/profile/${username}`);
            setData(data);
        }

        execute();
    }, []);

    return (
        <div className="mt-20 mx-auto w-full max-w-screen-lg flex items-center flex-col px-4">
            <img
                src={`https://ui-avatars.com/api/?background=111&color=f1f2f6&name=${data?.display_name}`}
                alt={username}
                className="rounded-full aspect-square h-20 mb-4"
            />
            <p className="text-zinc-800 text-2xl font-bold tracking-tight leading-tight">
                {data?.display_name}
            </p>
            <h1 className="text-zinc-800 text-lg tracking-tight leading-tight">
                @{username}
            </h1>

            <div className="max-w-lg mx-auto mt-6 mb-14 w-full flex items-center flex-col px-4 gap-4">
                {data?.links?.length > 0 &&
                    data?.links
                        ?.sort(({ index: a }, { index: b }) => a - b)
                        ?.map((link) => (
                            <ReadonlyLink key={link.id} link={link} />
                        ))}
            </div>

            <footer className="absolute bottom-6">
                <Link
                    to="/"
                    className="font-bold text-zinc-900 text-2xl tracking-tight"
                >
                    unilink
                </Link>
            </footer>
        </div>
    );
}