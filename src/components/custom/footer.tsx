function Footer() {
    return (
        <>
            <div className="flex !p-[32px]">
                <div className="flex flex-col gap-[8px] max-w-[487px] w-full">
                    <h1 className="text-white text-[16px] font-[700]">Компания</h1>
                    <a href="https://www.spotify.com/uz/about-us/contact/" className="text-[#b3b3b3] text-[16px] cursor-pointer hover:text-white hover:underline font-[500]">О нас</a>
                    <a href="https://www.lifeatspotify.com/" className="text-[#b3b3b3] text-[16px] cursor-pointer hover:text-white hover:underline font-[500]">Вакансии</a>
                    <a href="https://newsroom.spotify.com/" className="text-[#b3b3b3] text-[16px] cursor-pointer hover:text-white hover:underline font-[500]">For the record</a>
                </div>
                <div className="flex flex-col gap-[8px] max-w-[487px] w-full">
                    <h1 className="text-white text-[16px] font-[700]">Сообщества</h1>
                    <a href="https://artists.spotify.com/home" className="text-[#b3b3b3] text-[16px] cursor-pointer hover:text-white hover:underline font-[500] w-[107px]">Для исполнителей</a>
                    <a href="https://developer.spotify.com/" className="text-[#b3b3b3] text-[16px] cursor-pointer hover:text-white hover:underline font-[500] w-[107px]">Для разработчиков</a>
                    <a href="https://ads.spotify.com/en-US/" className="text-[#b3b3b3] text-[16px] cursor-pointer hover:text-white hover:underline font-[500] w-[107px]">Реклама</a>
                    <a href="https://investors.spotify.com/home/default.aspx" className="text-[#b3b3b3] text-[16px] cursor-pointer hover:text-white hover:underline font-[500] w-[107px]">Для инвесторов</a>
                    <a href="https://spotifyforvendors.com/" className="text-[#b3b3b3] text-[16px] cursor-pointer hover:text-white hover:underline font-[500] w-[107px]">Для вендоров</a>

                </div>
                <div className="flex flex-col gap-[8px] max-w-[487px] w-full">
                    <h1 className="text-white text-[16px] font-[700] w-[107px]">Полезные ссылки</h1>
                    <a href="https://support.spotify.com/uz/" className="text-[#b3b3b3] text-[16px] cursor-pointer hover:text-white hover:underline font-[500]">Справка</a>
                    <a href="https://www.spotify.com/uz/download/windows/" className="text-[#b3b3b3] text-[16px] cursor-pointer hover:text-white hover:underline font-[500]">Бесплатное мобильное приложение</a>
                </div>
                <div className="flex flex-col gap-[8px] max-w-[487px] w-full">
                    <h1 className="text-white text-[16px] font-[700] w-[107px]">Планы Spotify</h1>
                    <a href="https://www.spotify.com/uz/premium/#ref=spotifycom_footer_premium_individual" className="text-[#b3b3b3] text-[16px] cursor-pointer hover:text-white hover:underline font-[500] max-w-[127px]">Индивидуальная подписка Spotify Premium</a>
                    <a href="https://www.spotify.com/uz/duo/#ref=spotifycom_footer_premium_duo" className="text-[#b3b3b3] text-[16px] cursor-pointer hover:text-white hover:underline font-[500] w-[107px]">Premium для двоих</a>
                    <a href="https://www.spotify.com/uz/family/#ref=spotifycom_footer_premium_family" className="text-[#b3b3b3] text-[16px] cursor-pointer hover:text-white hover:underline font-[500] w-[107px]">Premium для семьи</a>
                    <a href="https://www.spotify.com/uz/student/#ref=spotifycom_footer_premium_student" className="text-[#b3b3b3] text-[16px] cursor-pointer hover:text-white hover:underline font-[500] w-[107px]">Premium для студентов</a>
                    <a href="https://www.spotify.com/uz/free/#ref=spotifycom_footer_free" className="text-[#b3b3b3] text-[16px] cursor-pointer hover:text-white hover:underline font-[500] w-[107px]">Бесплатная версия Spotify</a>
                </div>
            </div>
        </>
    )
}

export default Footer;