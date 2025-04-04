import { useContext, useEffect, useReducer } from "react";
import { ReloadCTX } from "@/contexts/reload";
import { FaHeart, FaPlay } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { TfiMenuAlt } from "react-icons/tfi";
import { CiClock2 } from "react-icons/ci";
import NewReleases from "@/components/custom/newReleases";
import Footer from "@/components/custom/footer";


const reducer = (state, action) => {
    switch (action.type) {
        case "get":
            return action.payload || [];
        default:
            return state;
    }
};

function Tracks() {
    let token = localStorage.getItem("access_token");
    if (!token) {
        location.assign("/login")
    }
    const selectedTrackPage = JSON.parse(localStorage.getItem("selectedTrackPage") || "{}");
    const { type, id } = selectedTrackPage;
    const [reload, setReload] = useContext(ReloadCTX);
    const [state, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        const getArtistsAlbums = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_PUBLIC_API + `/${type}/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                console.log(data);
                dispatch({ type: "get", payload: data });

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
                            src={state?.images?.[0]?.url}
                            alt="Album Cover"
                            className="max-w-[166px] max-h-[166px] rounded-[4px]"
                        />
                        <FaHeart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" color="white" size={50} />
                    </div>

                    <div className="flex items-end !mb-[12px]">
                        <div>
                            <p className="font-[500] text-white text-[0.875rem]">Альбом</p>
                            <h1 className="text-[2.7rem] font-[700] text-white">{state.name}</h1>
                            <div>
                                <p className="text-[#ffffffb2] text-[1.125rem] font-[500]">{state?.artists?.[0]?.name}</p>
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
                        state?.tracks?.items?.map((uTrack: any) => (
                            <div key={uTrack.id} className="flex items-center w-full cursor-pointer !p-[4px] !pl-[15px] rounded-[6px] hover:bg-[#2c2c2c] gap-[15px]">
                                <div className="flex items-center gap-[15px] max-w-[315px] w-full">
                                    <FaPlay color="white" />
                                    <div>
                                        <p className="text-white text-[16px] w-34 truncate">{uTrack.name}</p>
                                        <p className="text-[#b3b3b3] text-[14px] font-[500] w-34 truncate">{uTrack.artists[0].name}</p>
                                    </div>
                                </div>
                                <p className="text-[#b3b3b3] text-[14px] font-[500] w-34 truncate max-w-[167px] w-full">{uTrack.name}</p>
                                <p className="text-[#b3b3b3] text-[14px] font-[500] w-34 truncate text-center">
                                    {Math.floor(uTrack.duration_ms / 60000)}:{((uTrack.duration_ms % 60000) / 1000).toFixed(0).padStart(2, "0")}
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
    );
}

export default Tracks;
