import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { FaSpotify } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { RiBookShelfLine } from "react-icons/ri";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GoPlus } from "react-icons/go";
import { IoArrowForward } from "react-icons/io5";
import { tokenCTX } from '@/contexts/token';
import Player from '@/components/custom/player';
import { IoIosSearch } from "react-icons/io";
import UTracksBtn from '@/components/custom/usersTracks';
import "./layout.css"
import TracksDesc from '@/components/custom/tracksDesc';
import { SelectedTrackCTX } from '@/contexts/selectedTrack';

const BaseLayout: React.FC = () => {
    const token: string = localStorage.getItem("token") || "";
    const [selectedTrack, setSelectedTrack] = useState(() => JSON.parse(localStorage.getItem("selectedTrack") || "null"));


    return (
        <tokenCTX.Provider value={token}>
            <SelectedTrackCTX.Provider value={{ selectedTrack, setSelectedTrack }}>
                <div className='w-full h-screen flex flex-col'>
                    <header className='!pt-[8px] !pb-[8px] !pl-[20px]'>
                        <div className='flex gap-[28px] items-center'>
                            <div className='flex justify-center items-center w-[48px] h-[48px]'>
                                <FaSpotify color='white' size={32} />
                            </div>
                            <div className='flex items-center gap-[8px]'>
                                <button onClick={() => location.assign("/")} className='flex justify-center items-center w-[48px] h-[48px] bg-[#1f1f1f] rounded-full cursor-pointer'>
                                    <GoHomeFill size={20} color='white' />
                                </button>
                                <Input placeholder='Что хочешь включить?' className='!pl-[15px] bg-[#1f1f1f] text-white w-[474px] h-[48px] rounded-[20px] border-0' />
                            </div>
                        </div>
                    </header>

                    <div className='w-full flex-grow flex flex-col min-h-0'>
                        <ResizablePanelGroup direction="horizontal">
                            <ResizablePanel defaultSize={30} className="max-w-[420px]  min-w-[200px] !pl-[5px] !pr-[5px] !pt-[0] !pb-[0]">
                                <div className='bg-[#121212] h-full rounded-[10px] !pt-[12px] !pb-[12px] !pl-[16px] !pr-[16px]'>
                                    <header className='flex justify-between items-center'>
                                        <div className='flex gap-[8px] items-center'>
                                            <RiBookShelfLine color='white' size={30} />
                                            <p className='font-[700] text-[1rem] text-[#b3b3b3]'>Моя методика</p>
                                        </div>
                                        <div className='flex items-center gap-[8px]'>
                                            <Button className='cursor-pointer !pt-[8px] !pb-[8px] !pl-[16px] !pr-[16px] bg-[#1f1f1f] rounded-[16px]'><GoPlus color='#b3b3b3' size={16} /> Создать</Button>
                                            <div className='flex justify-center items-center w-[35px] h-[35px] rounded-full hover:bg-[#1f1f1f] cursor-pointer'>
                                                <IoArrowForward color='#b3b3b3' size={16} />
                                            </div>
                                        </div>
                                    </header>
                                    <div>
                                        <div className='flex justify-between items-center !mt-[30px] !mb-[20px]'>
                                            <IoIosSearch className='cursor-pointer' size={23} color='grey' />
                                            <p className='cursor-pointer text-[#b3b3b3] text-[0.875rem] font-[500]'>Недавно прослушано</p>
                                        </div>
                                        <UTracksBtn />
                                    </div>
                                </div>
                            </ResizablePanel>
                            <ResizableHandle className='!cursor-grab bg-black hover:bg-white' />
                            <ResizablePanel>
                                <main className="bg-[#121212] rounded-[10px] h-full flex flex-col">
                                    <div className="flex-1 overflow-y-auto no-scrollbar">
                                        <Outlet />
                                    </div>
                                </main>
                            </ResizablePanel>
                            <ResizableHandle className='!cursor-grab bg-black hover:bg-white' />
                            <ResizablePanel defaultSize={30} className="max-w-[420px] min-w-[200px] !pl-[5px] !pr-[5px] !pt-[0] !pb-[0]">
                                <div className='bg-[#121212] h-full rounded-[10px] !pt-[12px] !pb-[12px] !pl-[16px] !pr-[16px]'>
                                    <TracksDesc type={selectedTrack?.type} id={selectedTrack?.id} />                                </div>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </div>
                    <div className='w-full'>
                        <Player type={selectedTrack?.type} id={selectedTrack?.id} />
                    </div>
                </div>
            </SelectedTrackCTX.Provider>
        </tokenCTX.Provider>
    );
};

export default BaseLayout;
