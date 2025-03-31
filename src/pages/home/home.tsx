import { ReloadCTX } from "@/contexts/reload";
import { useApi, method } from "@/hooks/getApi";
import { useContext, useEffect, useReducer } from "react";
import { getSpotifyToken } from "../login/login";

const reducer = (state, action) => {
    switch (action.type) {
        case "get":
            return action.payload;
        default:
            return state;
    }
}

function Home() {
    const token = getSpotifyToken()
    const { fetchData, error, loading } = useApi(import.meta.env.VITE_PUBLIC_API)
    const [reload, setReload] = useContext(ReloadCTX)
    const [state, dispatch] = useReducer(reducer, [])

    useEffect(() => {
        fetchData("/tracks", method.get, { Authorization: `Bearer ${token}` })
            .then(res => {
                console.log(res?.data);
                dispatch({ type: "get", payload: res?.data })
            })
        if (error) {
            console.log(error);
        }
    }, [reload])

    return (
        <>
            <div>

            </div>
        </>
    )
}

export default Home;