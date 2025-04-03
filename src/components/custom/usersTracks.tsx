function UTracksBtn() {
    return (
        <>
            <div onClick={() => location.assign("/savedTracks")} className="flex !mb-[10px] w-full cursor-pointer !p-[8px] rounded-[6px] hover:bg-[#2c2c2c] gap-[10px]">
                <img className="w-[48px] h-[48px] rounded-[4px]" src="https://img.freepik.com/free-vector/polygonal-background_53876-60251.jpg" alt="img" />
                <div>
                    <p className="text-white text-[16px] w-34 truncate font-[500]">Любимые треки</p>
                    <p className="text-[#b3b3b3] text-[14px] font-[500] w-34 truncate">Плейлист • треки</p>
                </div>
            </div>
        </>
    )
}

export default UTracksBtn;