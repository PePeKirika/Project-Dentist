'use client'
import { useState, useEffect, useRef, use } from "react"
import useWindowListener from "@/hooks/useWindowListener"

export default function VideoPlayer({vdoSrc, isPlaying} : {vdoSrc:string, isPlaying:boolean}) {

    const vdoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
            if(isPlaying){
                vdoRef.current?.play()
            } else {
                vdoRef.current?.pause()
            }

    }, [isPlaying])

    //useWindowListener("resize", (e) => { alert("Window Width is " + (e.target as Window).innerWidth)})

    return (
        <video className="w-[40%]" src={vdoSrc} ref={vdoRef} controls loop muted/>
    )
}