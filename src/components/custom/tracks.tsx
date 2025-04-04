import { useContext, useEffect, useReducer, useState } from "react";
import { ReloadCTX } from "@/contexts/reload";
import { Button } from "../ui/button";
import { FaPlay } from "react-icons/fa";
import { SelectedTrackCTX } from "@/contexts/selectedTrack";

const reducer = (state, action) => {
    switch (action.type) {
        case "get":
            return action.payload || [];
        default:
            return state;
    }
};

function TracksFunc() {
    let token = localStorage.getItem("access_token");
    const [reload, setReload] = useContext(ReloadCTX);
    const { selectedTrack, setSelectedTrack } = useContext(SelectedTrackCTX);
    const [state, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        const getArtistsAlbums = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_PUBLIC_API + "/artists/0TnOYISbd1XYRBk9myaseg/albums", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                dispatch({ type: "get", payload: data.items });
            } catch (err) {
                console.error(err);
            }
        };

        getArtistsAlbums();
    }, [reload]);

    return (
        <div>
            <h1 className="text-white text-[24px] hover:underline cursor-pointer font-bold !pl-[10px] !mb-[10px]">
                Популярные альбомы
            </h1>
            <div className="flex overflow-x-scroll no-scrollbar !pr-[34px] !mb-[40px]">
                {state.map((album: any) => (
                    <div
                        key={album.id}
                        className="relative group flex-shrink-0 max-w-[177px] w-full h-[240px] !p-[12px] hover:bg-[#2c2b2b] rounded-[4px] cursor-pointer"
                        onClick={() => {
                            const trackData = {
                                type: album.type + "s",
                                id: album.id,
                            };
                            setSelectedTrack(trackData);
                            localStorage.setItem("selectedTrackPage", JSON.stringify(trackData));
                            window.location.href = `/tracks/${album.id}`;
                        }}
                    >
                        <img
                            src={album.images[0]?.url}
                            alt={album.name}
                            className="w-[153px] h-[153px] object-cover rounded-[4px] !mb-[2px]"
                        />
                        <Button
                            className="absolute rounded-full w-[48px] h-[48px] bg-[#1ed760] right-[20px] bottom-[80px] 
                            opacity-0 translate-y-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 cursor-pointer hover:bg-[#79dc9c] hover:w-[50px] hover:h-[50px]"
                            onClick={(e) => {
                                e.stopPropagation()
                                const trackData = {
                                    type: album.type + "s",
                                    id: album.id,
                                };
                                setSelectedTrack(trackData);
                                localStorage.setItem("selectedTrack", JSON.stringify(trackData));
                            }}
                        >
                            <FaPlay color="black" />
                        </Button>
                        <p className="text-white text-[16px] w-34 truncate">{album.name}</p>
                        <p className="text-[#b3b3b3] text-[14px] font-[500] w-34 truncate">{album.artists[0].name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TracksFunc;
