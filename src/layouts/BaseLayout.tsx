import React from 'react';
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

const BaseLayout: React.FC = () => {
    return (
        <div className='w-full h-screen flex flex-col'>
            <header className='!pt-[8px] !pb-[8px] !pl-[20px]'>
                <div className='flex gap-[28px] items-center'>
                    <div className='flex justify-center items-center w-[48px] h-[48px]'>
                        <FaSpotify color='white' size={32} />
                    </div>
                    <div className='flex items-center gap-[8px]'>
                        <button className='flex justify-center items-center w-[48px] h-[48px] bg-[#1f1f1f] rounded-full'>
                            <GoHomeFill size={20} color='white' />
                        </button>
                        <Input placeholder='Что хочешь включить?' className='!pl-[15px] bg-[#1f1f1f] text-white w-[474px] h-[48px] rounded-[20px] border-0' />
                    </div>
                </div>
            </header>

            <div className='w-full h-screen'>
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
                        </div>
                    </ResizablePanel>
                    <ResizableHandle className='!cursor-grab bg-black hover:bg-white' />
                    <ResizablePanel >
                        <main className='bg-[#121212] h-full rounded-[10px] !pt-[12px] !pb-[12px] !pl-[40px] !pr-[40px]'>
                            <Outlet />
                        </main>
                    </ResizablePanel>
                    <ResizableHandle className='!cursor-grab bg-black hover:bg-white' />
                    <ResizablePanel defaultSize={30} className="max-w-[420px] min-w-[200px] !pl-[5px] !pr-[5px] !pt-[0] !pb-[0]">
                        <div className='bg-[#121212] h-full rounded-[10px]'>

                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    );
};

export default BaseLayout;
