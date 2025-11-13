'use client'
import { useTheme } from "next-themes"
import { Sun,Moon } from "lucide-react"
import { button, div } from "motion/react-client";
import { ShoppingCartIcon } from "lucide-react";

export function ThemeToggle(){
    const {theme,setTheme}= useTheme();
    return(
        <ShoppingCartIcon className='w-7 h-7 sm:w-9 sm:h-9  
                cursor-pointer duration-300 hover:scale-[1.1] '/>
    );
}