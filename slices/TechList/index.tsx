"use client"

import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { MdCircle } from "react-icons/md";
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { GiAsparagus } from "react-icons/gi";

gsap.registerPlugin(ScrollTrigger)
/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList = ({ slice }: TechListProps): JSX.Element => {

  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 4
        }
      })


      tl.fromTo('.tech-row', {
        x: (index) => {
          return index % 2 === 0 ? gsap.utils.random(600, 400) : gsap.utils.random(-600, -400)
        },
      }, {
        x: (index) => {
          return index % 2 === 0 ? gsap.utils.random(-600, -400) : gsap.utils.random(600, 400)
        },
        ease: 'power1.inOut'
      })
    }, ref)

    return () => ctx.revert()
  }, [])
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden"
      ref={ref}
    >
      <Bounded as="div">
        <Heading size="xl" as="h2" className="mb-8" >{slice.primary.heading}</Heading>
      </Bounded>


      {slice.items.map((item, i) => (
        <div key={i} className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
          aria-label={item.tech_name || undefined} >
          {Array.from({ length: 15 }).map((_, index) => (
            <>
              <span className="tech-item text-8xl font-extrabold uppercase tracking-tighter"
                style={{
                  color: index === 7 && item.tech_color ? item.tech_color : 'inherit'
                }}
              >
                {item.tech_name}
              </span>
              <span className="text-3xl">
                <MdCircle />
              </span>
            </>
          ))}
        </div>
      ))}
    </section>
  );
};

export default TechList;
