import { RxMixerHorizontal } from "react-icons/rx";
import { MdSkipPrevious } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
import { Button } from "../ui/button";
import { FaPlay } from "react-icons/fa";
import { RiRepeat2Line } from "react-icons/ri";
import { SlScreenSmartphone } from "react-icons/sl";
import { TbMicrophone2 } from "react-icons/tb";
import { HiOutlineQueueList } from "react-icons/hi2";
import { AiOutlineSound } from "react-icons/ai";
import { BsMusicPlayerFill } from "react-icons/bs";
import { AiOutlineFullscreen } from "react-icons/ai";
import { useContext, useEffect, useReducer } from "react";
import { ReloadCTX } from "@/contexts/reload";

const reducer = (state, action) => {
    switch (action.type) {
        case "get":
            return action.payload || action.payload?.artists || action.payload.albums;
        default:
            return state;
    }
};

function Player({ type, id }) {
    const [reload, setReload] = useContext(ReloadCTX);
    const [state, dispatch] = useReducer(reducer, []);
    const token = localStorage.getItem("access_token");

    useEffect(() => {

        if (!type || !id || !token) return;

        const getArtistsAlbums = async () => {
            try {
                const url = import.meta.env.VITE_PUBLIC_API + `/${type}/${id}`;
                const response = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = await response.json();
                console.log(data);
                dispatch({ type: "get", payload: data?.items || data });
            } catch (err) {
                console.error("Ошибка при загрузке данных:", err);
            }
        };
        getArtistsAlbums();
    }, [reload, type, id, token]);
    const trackDuration = state?.tracks?.items?.[0]?.duration_ms;
    const formattedDuration = trackDuration
        ? `${Math.floor(trackDuration / 60000)}:${((trackDuration % 60000) / 1000).toFixed(0).padStart(2, "0")}`
        : "00:00";


    return (
        <>
            <div className="flex w-full h-[92px] bg-[#000] !pl-[12px] !pr-[12px] !pt-[14px] justify-between items-center">
                <div className="flex items-center gap-[12px] max-w-[280px] w-full">
                    {state?.images && state.images[0]?.url && (
                        <img src={state.images[0].url} alt="Album Cover" className="w-[56px] h-[56px]" />
                    )}
                    {state?.album?.images && (
                        <img src={state.album.images[0].url} alt="Album Cover" className="w-[56px] h-[56px]" />
                    )}
                    <div>
                        <p className="text-[14px] text-white font-[500]">{state.name}</p>
                        <p className="text-[12px] text-[#b3b3b3]">
                            {type === "artists"
                                ? state?.album?.artists?.[0]?.name || "Исполнитель"
                                : state?.artists?.[0]?.name
                            }
                        </p>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <div className="flex items-center gap-[16px] !mb-[5px]">
                            <RxMixerHorizontal color="gray" size={20} />
                            <MdSkipPrevious color="gray" size={27} />
                            <Button className="w-[36px] h-[36px] rounded-full bg-white cursor-pointer hover:bg-[] hover:w-[37px] hover:h-[37px] hover:rounded-full flex justify-center items-center">
                                <FaPlay color="black" />
                            </Button>
                            <MdSkipNext color="gray" size={27} />
                            <RiRepeat2Line color="gray" size={20} />
                        </div>
                        <div className="flex items-center gap-[8px]">
                            <p className="text-[#b3b3b3] text-[12px] font-[600]">0:00</p>
                            <input type="range" className="w-[512px] min-w-[512px] h-[4px] bg-gray-400" />
                            <p className="text-[#b3b3b3] text-[12px] font-[600]">
                                {formattedDuration}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center gap-[12px]">
                    <SlScreenSmartphone color="#b3b3b3" size={20} />
                    <TbMicrophone2 color="#b3b3b3" size={20} />
                    <HiOutlineQueueList color="#b3b3b3" size={20} />
                    <AiOutlineSound color="#b3b3b3" size={20} />
                    <input type="range" className="w-[93px] min-w-[33px] h-[4px] bg-gray-400" />
                    <BsMusicPlayerFill color="#b3b3b3" size={20} />
                    <AiOutlineFullscreen color="#b3b3b3" size={20} />
                </div>
            </div>
        </>
    )
}

export default Player;