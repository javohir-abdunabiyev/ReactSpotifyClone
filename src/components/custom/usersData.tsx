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

function UsersData() {
    let token = localStorage.getItem("access_token");
    const [reload, setReload] = useContext(ReloadCTX)
    const [state, dispatch] = useReducer(reducer, [])
    useEffect(() => {
        const getArtistsAlbums = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_PUBLIC_API + "/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                console.log(data);
                dispatch({ type: "get", payload: data })

            } catch (err) {
                console.error(err);
            }
        };

        getArtistsAlbums();
    }, [reload]);
    return (
        <>
            <div>
                <p className="text-white text-[0.875rem] font-bold cursor-pointer hover:underline">{state.display_name}</p>
            </div>
        </>
    )
}

export default UsersData;