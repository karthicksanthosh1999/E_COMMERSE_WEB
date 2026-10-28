import React from 'react';
import { headerData } from "@/data/header.json";
import { LuTruck } from 'react-icons/lu';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

const CommonNavbar = () => {
  return (
    <header className="w-full">
      <div className="bg-chart-4 w-full text-white">
        <h1 className="animate-pulse text-[17px] text-center flex items-center justify-center gap-2">
            <LuTruck size={20}/>
            {headerData.topHeader}
        </h1>
      </div>
      <div className="w-full bg-[#490512] flex items-center justify-between py-4">
        {/* LOGO */}
        <div>
            <Image src={''} alt="" />
        </div>
        {/* SEARCH INPUT */}
        <div className="flex items-center w-lg">
            <Input 
                placeholder="Search groceries, sarees, apparel, spices & more"
                className="py-5 text-6xl text-white placeholder:text-brand-yellow-light font-normal tracking-wide rounded-l-sm rounded-r-none border"
            />
            <Button className={"rounded-r-sm rounded-l-none py-5 cursor-pointer bg-brand-yellow-light"}>
                <Search className="text-black font-semibold" size={20}/>
            </Button>
        </div>
        {/* USER ACCOUNTS */}
        <div className="flex items-center">
            <Button type='button' className={"hover:bg-transparent cursor-pointer"} variant={'ghost'} size={'icon'}>
                <ShoppingCart className="cursor-pointer hover:opacity-25" size={28} />
            </Button>
        </div>
      </div>
    </header>
  )
}

export default CommonNavbar
