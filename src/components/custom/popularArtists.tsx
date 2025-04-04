import { useContext, useEffect, useReducer, useState } from "react";
import { ReloadCTX } from "@/contexts/reload";
import { artistIds } from "@/exports";
import { FaPlay } from "react-icons/fa";
import { Button } from "../ui/button";
import { SelectedTrackCTX } from "@/contexts/selectedTrack";

const reducer = (state, action) => {
    switch (action.type) {
        case "get":
            return action.payload.artists;
        default:
            return state;
    }
}

function PopularArtists() {
    let token = localStorage.getItem("access_token");
    const { selectedTrack, setSelectedTrack } = useContext(SelectedTrackCTX);
    const [reload, setReload] = useContext(ReloadCTX);
    const [state, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        const fetchPopularArtists = async () => {
            try {
                const response = await fetch(
                    `https://api.spotify.com/v1/artists?ids=${artistIds}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();
                dispatch({ type: "get", payload: data });
            } catch (err) {
                console.error("Error fetching artists:", err);
            }
        };

        fetchPopularArtists();
    }, [reload]);

    return (
        <div>
            <h1 className="text-white text-[24px] hover:underline cursor-pointer font-bold !pl-[10px] !mb-[10px]">
                Популярные исполнители
            </h1>
            <div className="flex overflow-x-scroll no-scrollbar !pr-[34px] !mb-[40px]">
                {
                    state.map((artist: any) => (
                        <div
                            key={artist.id}
                            className="relative flex-shrink-0 max-w-[177px] w-full h-[225px] !p-[12px] hover:bg-[#2c2b2b] rounded-[4px] cursor-pointer group"
                        >
                            <img
                                src={artist.images[0]?.url}
                                alt={artist.name}
                                className="w-[153px] h-[153px] object-cover rounded-full !mb-[2px]"
                            />
                            <Button
                                className="absolute rounded-full w-[48px] h-[48px] bg-[#1ed760] right-[20px] bottom-[80px] 
                            opacity-0 translate-y-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 cursor-pointer hover:bg-[#79dc9c] hover:w-[50px] hover:h-[50px]"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    const trackData = {
                                        type: artist.type + "s",
                                        id: artist.id,
                                    };
                                    setSelectedTrack(trackData);
                                    localStorage.setItem("selectedTrack", JSON.stringify(trackData));
                                }}
                            >
                                <FaPlay color="black" />
                            </Button>
                            <p className="text-white text-[16px] w-34 truncate">{artist.name}</p>
                            <p className="text-[#b3b3b3] text-[14px] font-[500] w-34 truncate">Исполнитель</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default PopularArtists;
