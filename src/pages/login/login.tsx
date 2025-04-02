import { Button } from "@/components/ui/button";
import { AUTH_ENDPOINT, REDIRECT_URI } from "@/exports";

function Login() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex justify-center items-center flex-col gap-[50px]">
                <h1 className="text-center text-green-400 text-[150px]">Spotify</h1>
                <a href={`${AUTH_ENDPOINT}?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=user-read-private user-read-email user-library-read user-library-modify playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-follow-read user-follow-modify user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played user-top-read streaming`}>
                    <Button className="block mx-auto mt-4 w-[300px] cursor-pointer h-[50px] bg-white text-black font-bold hover:text-white">Log in</Button>
                </a>
            </div>
        </div>
    );
}

export default Login;