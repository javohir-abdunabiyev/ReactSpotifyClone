import { useContext, useEffect, useReducer } from "react";
import { ReloadCTX } from "@/contexts/reload";
const reducer = (state, action) => {
    switch (action.type) {
        case "get":
            return action.payload || [];
        default:
            return state;
    }
}

function UsersTracks() {
    let token = localStorage.getItem("access_token");
    const [reload, setReload] = useContext(ReloadCTX)
    const [state, dispatch] = useReducer(reducer, [])
    useEffect(() => {
        const getArtistsAlbums = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_PUBLIC_API + "/me/tracks", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                console.log(data.items);
                dispatch({ type: "get", payload: data.items })

            } catch (err) {
                console.error(err);
            }
        };

        getArtistsAlbums();
    }, [reload]);


    return (
        <>
            <div>
                {
                    state.map((uTrack: any) => (
                        <div key={uTrack.track.id} className="flex !mb-[10px] w-full cursor-pointer !p-[8px] rounded-[6px] hover:bg-[#2c2c2c] gap-[10px]">
                            <img className="w-[48px] h-[48px] rounded-[4px]" src={uTrack.track.album.images[0].url} alt="img" />
                            <div>
                                <p className="text-white text-[16px] w-34 truncate">{uTrack.track.name}</p>
                                <p className="text-[#b3b3b3] text-[14px] font-[500] w-34 truncate">{uTrack.track.artists[0].name}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default UsersTracks;