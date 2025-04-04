import { useContext, useEffect, useReducer } from "react";
import { ReloadCTX } from "@/contexts/reload";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import "/src/pages/home/home.css"

const reducer = (state, action) => {
    switch (action.type) {
        case "get":
            return action.payload || action.payload?.artists || action.payload.albums;
        default:
            return state;
    }
};

function TracksDesc({ type, id }) {
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

    return (
        <>
            <div className="h-full">
                <div className="flex justify-between items-center !pb-[10px] max-w-[420px] w-full max-h-[64px] h-full ">
                    <h1 className="text-[16px] text-white font-[700] underline cursor-pointer">{state.name}</h1>
                    <div className="flex justify-center items-center gap-[8px]">
                        <div className="flex justify-center items-center w-[32px] h-[32px] cursor-pointer rounded-full hover:bg-[#1f1f1f]">
                            <HiDotsHorizontal size={19} color="gray" />
                        </div>
                        <div>
                            <div className="flex justify-center items-center w-[32px] h-[32px] cursor-pointer rounded-full hover:bg-[#1f1f1f]">
                                <IoClose size={19} color="gray" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-full !pb-[100px] overflow-y-auto no-scrollbar" >
                    {state?.images && state.images[0]?.url && (
                        <img src={state.images[0].url} alt="Album Cover" className="rounded-[6px]" />
                    )}
                    {state?.album?.images  && (
                        <img src={state.album.images[0].url} alt="Album Cover" className="rounded-[6px]" />
                    )}

                    {state?.artists?.[0]?.name && (
                        <p className="text-white text-[24px] font-[700] hover:underline cursor-pointer !mb-[30px] !mt-[10px]">{state.artists[0].name}</p>
                    )}

                    {type === "artists" && (
                        <p className="text-[#ffffffb2] text-[24px] font-[700] !mb-[30px] !mt-[10px]">Исполнитель</p>
                    )}
                    <div className="w-full !pr-[16px] !pl-[16px] !pt-[8px] !pb-[8px] bg-[#1f1f1f] rounded-[8px]">
                        <div className="flex justify-between items-center !mb-[12px]">
                            <h2 className="text-[16px] text-white font-[700]">Сведения</h2>
                            <p className="text-[16px] text-[#b3b3b3] font-[700] hover:underline cursor-pointer">Показать все</p>
                        </div>
                        <div>
                            {state?.artists?.[0]?.name && (
                                <p className="text-white text-[16px]">{state.artists[0].name}</p>
                            )}

                            {type === "artists" && (
                                <p className="text-white text-[16px]">Исполнитель</p>
                            )}
                            <p className="text-[14px] text-[#b3b3b3]">Основной Исполнитель</p>
                            {state?.followers?.total && (
                                <p className="text-[#ffffffb2] text-[16px] !mt-[20px]">{state.followers.total} слушателей</p>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default TracksDesc;
