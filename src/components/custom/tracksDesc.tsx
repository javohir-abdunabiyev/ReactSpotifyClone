import { useContext, useEffect, useReducer } from "react";
import { ReloadCTX } from "@/contexts/reload";

const reducer = (state, action) => {
    switch (action.type) {
        case "get":
            return action.payload || [];
        default:
            return state;
    }
};

function TracksDesc({ type, id }) {
    const [reload, setReload] = useContext(ReloadCTX);
    const [state, dispatch] = useReducer(reducer, []);
    let token = localStorage.getItem("access_token");

    useEffect(() => {
        if (!type || !id) return; // Проверяем, есть ли данные

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
    }, [reload, type, id]);

    return (
        <>
            <div>
                
            </div>
        </>
    );
}

export default TracksDesc;
