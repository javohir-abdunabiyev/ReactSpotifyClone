import { Button } from "@/components/ui/button";
import NewReleases from "@/components/custom/newReleases";
import "./home.css"
import TracksFunc from "@/components/custom/tracks";
import PopularArtists from "@/components/custom/popularArtists";
import Footer from "@/components/custom/footer";



function Home() {
    let token = localStorage.getItem("access_token");
    if (!token) {
        location.assign("/login")
    }
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
            <div className="relative">
                <div className="absolute flex gap-[20px] rounded-t-[10px] w-full h-[220px] bg-[#34295d] !pl-[16px] !pr-[16px] !pt-[40px]">
                </div>
                <div className="absolute top-[220px] w-full h-[200px] bg-gradient-to-b from-[#564697]/50 to-[#121212]  !pl-[16px] !pr-[16px]"></div>

                <div className="relative !pl-[34px] !pt-[12px] z-10">
                    <div>
                        <nav className="flex gap-[8px] !pl-[10px] !mb-[40px]">
                            <Button className="!rounded-[16px] text-black bg-white hover:bg-white !pt-[4px] !pb-[4px] !pl-[12px] !pr-[12px] cursor-pointer">Все</Button>
                            <Button className="!rounded-[16px] bg-[#2c2b2b] !pt-[4px] !pb-[4px] !pl-[12px] !pr-[12px] cursor-pointer">Музыка</Button>
                            <Button className="!rounded-[16px] bg-[#2c2b2b] !pt-[4px] !pb-[4px] !pl-[12px] !pr-[12px] cursor-pointer">Подкасты</Button>
                        </nav>

                        <div className="flex-1 overflow-y-auto no-scrollbar">
                            <NewReleases />
                            <TracksFunc />
                            <PopularArtists />
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;