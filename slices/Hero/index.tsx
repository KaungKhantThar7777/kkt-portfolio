"use client"
import Bounded from "@/components/Bounded";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {

  const component = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline()


      tl.fromTo('.name-animation', {
        x: -100, opacity: 0, rotate: -30
      }, {
        x: 0, opacity: 1, rotate: 0,
        ease: "elastic.out(1,0.3)",
        duration: 1,
        transformOrigin: "left top",
        delay: 0.5,
        stagger: {
          each: 0.1,
          from: 'random'
        }
      })

      tl.fromTo('.job-title', {
        y: 20,
        opacity: 0,
        scale: 1.2
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        ease: 'elastic.out(1,0.3)',
        duration: 1,

      })
    })


    return () => ctx.revert()
  }, [])

  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return

    return name.split('').map((letter, index) => (
      <span key={index} className={`name-animation name-animation-${key} inline-block opacity-0`}>{letter}</span>
    ))
  }
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">
        <div>
          <h1 className="mb-8 text-3xl md:text-[8rem] font-extrabold leading-none tracking-tighter"
            aria-label={`${slice.primary.first_name} ${slice.primary.last_name}`}>
            <span className="block text-slate-300">{renderLetters(slice.primary.first_name, 'first')}</span>
            <span className="block -mt-[0.06em] text-slate-500">{renderLetters(slice.primary.last_name, 'last')}</span>
          </h1>
          <span className="job-title  block text-2xl font-bold uppercase tracking-wide text-transparent bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text opacity-0">{slice.primary.tag_line}</span>
        </div>
        <div></div>
      </div>
    </Bounded>
  );
};

export default Hero;
