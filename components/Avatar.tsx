"use client";


import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";


export default function Avatar({
    image,
    className
}: { image: ImageField, className?: string }) {
    const ref = useRef(null);


    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".avatar", {
                opacity: 0,
                scale: 1.4,
            }, {
                opacity: 1,
                scale: 1,
                duration: 1.3,
                ease: 'power3.out'
            })


            window.onmousemove = (e) => {
                if (!ref.current) return


                const componentRect = (ref.current as HTMLElement).getBoundingClientRect();
                const componentCenterX = componentRect.left + componentRect.width / 2;

                let componentPercent = {
                    x: (e.clientX - componentCenterX) / componentRect.width / 2
                }

                let distFromCenter = 1 - Math.abs(componentPercent.x)


                gsap.timeline({
                    defaults: {
                        duration: 0.5, overwrite: 'auto', ease: 'power3.out'
                    }
                }).to('.avatar', {
                    rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x),
                    duration: 0
                },
                    0).to('.highlight', {
                        opacity: distFromCenter - 0.7,
                        x: -10 + 20 * componentPercent.x,
                        duration: 0.5
                    }, 0)
            }
        }, ref)

        return () => ctx.revert()
    }, [])
    return (
        <div ref={ref} className={clsx("relative w-full h-full", className)}>
            <div className="avatar aspect-square overflow-hidden rounded-3xl border-2 border-slate-700 opacity-0" style={{ perspective: '500px', perspectiveOrigin: '150% 150%' }}>

                <PrismicNextImage field={image} imgixParams={{ q: 100 }}
                    className="avatar-image w-full h-full object-fill" />


                <div className="highlight absolute inset-0 w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent md:block opacity-0"></div>
            </div>
        </div>
    )
}