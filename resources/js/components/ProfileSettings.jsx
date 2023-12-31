import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/Auth";
import { Avatar } from "./Avatar";
import { UploadAvatarDialog } from "./UploadAvatarButton";
import { DeleteAvatarButton } from "./DeleteAvatarButton";

export function ProfileSettings() {
    const { user, updateUser } = useAuth();
    const [username, setUsername] = useState(user.username);
    const [displayName, setDisplayName] = useState(user.displayName);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        setHasChanges(
            username !== user?.username || displayName !== user?.displayName
        );
    }, [username, displayName, user]);

    function handleUpdateProfile() {
        updateUser({
            username,
            displayName,
        });
    }

    return (
        <div className="flex flex-col w-full gap-2">
            <h1 className="text-3xl text-zinc-800 font-bold">Profile</h1>

            <div className="flex flex-col p-6 rounded-xl bg-white border border-zinc-400 gap-2">
                <div className="flex gap-6">
                    <div className="w-32">
                        <Avatar />
                    </div>
                    <div className="flex w-full flex-col gap-2">
                        <UploadAvatarDialog />
                        <DeleteAvatarButton />
                    </div>
                </div>

                <div>
                    <label className="text-sm text-gray-800" htmlFor="username">
                        Display Name
                    </label>
                    <input
                        className="w-full h-12 px-4 bg-zinc-50 rounded-xl text-zinc-700 border border-gray-400 focus:outline-none"
                        id="display_name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-sm text-gray-800" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="w-full h-12 px-4 bg-zinc-50 rounded-xl text-zinc-700 border border-gray-400 focus:outline-none"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <button
                    type="button"
                    className={`h-10 w-full mt-1 font-medium rounded-full text-zinc-200 transition-colors bg-zinc ${
                        !hasChanges ? "bg-gray-500" : "bg-zinc-800"
                    }`}
                    style={{
                        cursor: !hasChanges ? "not-allowed" : "default",
                    }}
                    onClick={handleUpdateProfile}
                    disabled={!hasChanges}
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
