
import { Button } from "@/components/ui/button";

const CLIENT_ID = '617c6261c1e64cb598313397af4c08b1';
const CLIENT_SECRET = '5c2db882af3d4a56bc366a2f15b08c44';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

export async function getSpotifyToken() {
    const response = await fetch(TOKEN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }),
    });

    const data = await response.json();
    return data.access_token;
}

function Login() {

    const handleLogin = async () => {
        try {
            const accessToken = await getSpotifyToken();
            localStorage.setItem('access_token', accessToken);
            console.log("Токен сохранён в localStorage:", accessToken);
            if (accessToken) {
                location.assign("/")
            }
        } catch (error) {
            console.error("Ошибка получения токена:", error);
        }
    };



    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex justify-center items-center flex-col gap-[50px]">
                <h1 className="text-center text-green-400 text-[150px]">Spotify</h1>
                <Button onClick={handleLogin} className="block mx-auto mt-4 w-[300px] cursor-pointer h-[50px] bg-white text-black font-bold hover:text-white">Log in</Button>
            </div>
        </div>

    );
}

export default Login;
