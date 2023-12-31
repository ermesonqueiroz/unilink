import React from "react";
import { DeleteLinkButton } from "./DeleteLinkButton";
import { EditLinkButton } from "./EditLinkButton";
import { ToggleLinkVisibility } from "./ToggleLinkVisibility";

export function EditableLink({ link }) {
    return (
        <div
            key={link?.id}
            className="bg-white border-zinc-400 border w-full rounded-xl py-4 px-6 relative"
        >
            <div className="flex items-center justify-between">
                <h1 className="text-lg text-zinc-800 font-bold">
                    {link?.title}
                </h1>
            </div>

            <p className="text-zinc-800">{link?.url}</p>

            <div className="flex flex-col absolute top-4 right-6 gap-2 items-end">
                <div className="flex gap-2">
                    <EditLinkButton link={link} />
                    <DeleteLinkButton linkId={link?.id} />
                </div>

                <ToggleLinkVisibility link={link} />
            </div>
        </div>
    );
}
