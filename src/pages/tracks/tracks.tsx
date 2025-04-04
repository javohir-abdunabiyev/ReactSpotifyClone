import { useContext, useEffect, useReducer } from "react";
import { ReloadCTX } from "@/contexts/reload";
import { FaHeart, FaPlay } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { TfiMenuAlt } from "react-icons/tfi";
import { CiClock2 } from "react-icons/ci";
import NewReleases from "@/components/custom/newReleases";
import PopularArtists from "@/components/custom/popularArtists";
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
        location.assign("/login");
    }

    const selectedTrackPage = JSON.parse(localStorage.getItem("selectedTrackPage") || "{}");
    const { type, id } = selectedTrackPage;
    const [reload, setReload] = useContext(ReloadCTX);
    const [state, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        const getArtistOrAlbumData = async () => {
            try {
                let data;
                if (type === "artists") {
                    const tracksResponse = await fetch(
                        `${import.meta.env.VITE_PUBLIC_API}/artists/${id}/top-tracks?market=US`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    const tracksData = await tracksResponse.json();

                    const artistResponse = await fetch(
                        `${import.meta.env.VITE_PUBLIC_API}/artists/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    const artistData = await artistResponse.json();

                    data = { ...artistData, tracks: tracksData.tracks };
                } else {
                    const response = await fetch(
                        `${import.meta.env.VITE_PUBLIC_API}/${type}/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    data = await response.json();
                }

                dispatch({ type: "get", payload: data });
            } catch (err) {
                console.error(err);
            }
        };

        getArtistOrAlbumData();
    }, [reload]);

    const tracks = type === "artists" ? state.tracks : state.tracks?.items;
    const title = type === "artists" ? state?.tracks?.[0]?.artists?.[0]?.name : state.name;
    const subtitle = type === "artists" ? "Исполнитель" : state?.artists?.[0]?.name;

    return (
        <div className="relative overflow-y-scroll h-full no-scrollbar">
            <div className="flex gap-[20px] rounded-t-[10px] w-full h-[220px] bg-[#34295d] !pl-[16px] !pr-[16px] !pt-[40px]">
                <div className="relative max-w-[166px] max-h-[166px]">
                    <img src={state.images?.[0]?.url} alt="" className="max-w-[166px] max-h-[166px] rounded-[4px]" />
                </div>

                <div className="flex items-end !mb-[12px]">
                    <div>
                        <p className="font-[500] text-white text-[0.875rem]">{type === "artists" ? "Исполнитель" : "Альбом"}</p>
                        <h1 className="text-[2.7rem] font-[700] text-white">{title}</h1>
                        <div>
                            <p className="text-[#ffffffb2] text-[1.125rem] font-[500]">{subtitle}</p>
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
                    <p className="text-[#ffffffb2] max-w-[330px] w-full text-[14px] font-[500]"># Название</p>
                    <p className="text-[#ffffffb2] max-w-[167px] w-full text-[14px] font-[500]">Альбом</p>
                    <CiClock2 size={18} className="text-[#ffffffb2] max-w-[120px] w-full" />
                </div>

                {tracks?.map((uTrack: any) => (
                    <div key={uTrack.id} className="flex items-center w-full cursor-pointer !p-[4px] !pl-[15px] rounded-[6px] hover:bg-[#2c2c2c] gap-[15px]">
                        <div className="flex items-center gap-[15px] max-w-[315px] w-full">
                            <FaPlay color="white" />
                            <div>
                                <p className="text-white text-[16px] w-34 truncate">{uTrack.name}</p>
                                <p className="text-[#b3b3b3] text-[14px] font-[500] w-34 truncate">{uTrack.artists[0].name}</p>
                            </div>
                        </div>
                        <p className="text-[#b3b3b3] text-[14px] font-[500] w-34 truncate max-w-[167px] w-full">
                            {type === "artists" ? uTrack.album.name : uTrack.name}
                        </p>
                        <p className="text-[#b3b3b3] text-[14px] font-[500] w-34 truncate text-center">
                            {Math.floor(uTrack.duration_ms / 60000)}:{((uTrack.duration_ms % 60000) / 1000).toFixed(0).padStart(2, "0")}
                        </p>
                    </div>
                ))}

                <div className="overflow-y-hidden !mt-[30px]">
                    {type === "artists" ? <PopularArtists /> : <NewReleases />}
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Tracks;
