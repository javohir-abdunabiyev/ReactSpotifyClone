import { Button } from "@/components/ui/button";
import NewReleases from "@/components/custom/newReleases";
import "./home.css"
import TracksFunc from "@/components/custom/tracks";
import PopularArtists from "@/components/custom/popularArtists";


let token = localStorage.getItem("access_token");
if (!token) {
    location.assign("/login")
}

function Home() {
    const hash = window.location.hash;
    if (!token && hash) {
        const hashParams = hash.slice(1).split('&');
        for (let param of hashParams) {
            let [key, value] = param.split('=');
            if (key === 'access_token') {
                token = value;
                break;
            }
        }

        if (token) {
            localStorage.setItem("access_token", token);
            location.assign("/")
        }
    }

    return (
        <>
            <div className="!pl-[34px] !pt-[12px]">
                <nav className="flex gap-[8px] !pl-[10px] !mb-[40px]">
                    <Button className="!rounded-[16px] text-black bg-white hover:bg-white !pt-[4px] !pb-[4px] !pl-[12px] !pr-[12px] cursor-pointer">Все</Button>
                    <Button className="!rounded-[16px] bg-[#2c2b2b] !pt-[4px] !pb-[4px] !pl-[12px] !pr-[12px] cursor-pointer">Музыка</Button>
                    <Button className="!rounded-[16px] bg-[#2c2b2b] !pt-[4px] !pb-[4px] !pl-[12px] !pr-[12px] cursor-pointer">Подкасты</Button>
                </nav>

                <div className="max-h-[490px] overflow-y-scroll no-scrollbar">
                    <NewReleases />
                    <TracksFunc />
                    <PopularArtists />
                </div>
            </div>
        </>
    )
}

export default Home;