import { useContext, useEffect, useReducer } from "react";
import { ReloadCTX } from "@/contexts/reload";
import { FaHeart, FaPlay } from "react-icons/fa";
import UsersData from "@/components/custom/usersData";
import { Button } from "@/components/ui/button";
import { TfiMenuAlt } from "react-icons/tfi";
import { CiClock2 } from "react-icons/ci";
import "./uTracks.css"
import NewReleases from "@/components/custom/newReleases";
import Footer from "@/components/custom/footer";
import { SelectedTrackCTX } from "@/contexts/selectedTrack";
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
    if (!token) {
        location.assign("/login")
    }
    const { selectedTrack, setSelectedTrack } = useContext(SelectedTrackCTX);
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
            <div className="relative overflow-y-scroll h-full no-scrollbar">
                <div className="flex gap-[20px] rounded-t-[10px] w-full h-[220px] bg-[#34295d] !pl-[16px] !pr-[16px] !pt-[40px]">
                    <div className="relative max-w-[166px] max-h-[166px]">
                        <img
                            draggable={false}
                            src="https://img.freepik.com/free-vector/polygonal-background_53876-60251.jpg"
                            alt=""
                            className="max-w-[166px] max-h-[166px] rounded-[4px]"
                        />
                        <FaHeart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" color="white" size={50} />
                    </div>

                    <div className="flex items-end !mb-[12px]">
                        <div>
                            <p className="font-[500] text-white text-[0.875rem]">Плейлист</p>
                            <h1 className="text-[3rem] font-[700] text-white">Любимые треки</h1>
                            <div>
                                <UsersData />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="absolute top-[220px] w-full h-[200px] bg-gradient-to-b from-[#564697]/50 to-[#121212]  !pl-[16px] !pr-[16px]"></div>

                <div className="relative z-10 !pl-[16px] !pr-[16px]">
                    <div className="flex justify-between items-center !p-[18px] !pl-0">
                        <Button className="bg-[#1ed760] w-[56px] h-[56px] rounded-full cursor-pointer hover:bg-[#79dc9c] hover:w-[58px] hover:h-[58px]">
                            <FaPlay color="black" />
                        </Button>
                        <div className="cursor-pointer">
                            <p className="flex items-center gap-[8px] text-[#ffffffb2] text-[14px] font-[500]">Список <TfiMenuAlt color="#ffffffb2" size={18} /></p>
                        </div>
                    </div>
                    <div className="flex gap-[16px] h-[35px] border-b-[1px] border-b-[#ffffffb2] !mb-[15px]">
                        <p className="text-[#ffffffb2] max-w-[330px] w-full text-[14px] font-[500]">#  Название</p>
                        <p className="text-[#ffffffb2] max-w-[167px] w-full text-[14px] font-[500]">Альбом</p>
                        <CiClock2 size={18} className="text-[#ffffffb2] max-w-[120px] w-full" />
                    </div>
                    {

                        state.map((uTrack: any) => (
                            <div onClick={() => {
                                const trackData = {
                                    type: uTrack.track.type + "s",
                                    id: uTrack.track.id,
                                };
                                setSelectedTrack(trackData);
                                localStorage.setItem("selectedTrack", JSON.stringify(trackData));
                            }} key={uTrack.track.id} className="flex items-center w-full cursor-pointer !p-[4px] !pl-[15px] rounded-[6px] hover:bg-[#2c2c2c] gap-[15px]">
                                <div className="flex items-center gap-[15px] max-w-[315px] w-full">
                                    <FaPlay color="white" />
                                    <img className="w-[38px] h-[38px] rounded-[4px]" src={uTrack.track.album.images[0].url} alt="img" />
                                    <div>
                                        <p className="text-white text-[16px] w-34 truncate">{uTrack.track.name}</p>
                                        <p className="text-[#b3b3b3] text-[14px] font-[500] w-34 truncate">{uTrack.track.artists[0].name}</p>
                                    </div>
                                </div>
                                <p className="text-[#b3b3b3] text-[14px] font-[500] w-34 truncate max-w-[167px] w-full">{uTrack.track.album.name}</p>
                                <p className="text-[#b3b3b3] text-[14px] font-[500] w-34 truncate text-center">
                                    {Math.floor(uTrack.track.duration_ms / 60000)}:{((uTrack.track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, "0")}
                                </p>
                            </div>
                        ))
                    }
                    <div className="overflow-y-hidden !mt-[30px]">
                        <NewReleases />
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UsersTracks;