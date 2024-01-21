"use client"


import { Content, asImageSrc, isFilled } from '@prismicio/client'
import { gsap } from 'gsap';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { MdArrowOutward } from 'react-icons/md';


type ContentListProps = {
    items: Content.BlogPostDocument[] | Content.ProjectDocument[],
    contentType: Content.ContentIndexSlice['primary']['content_type'],
    viewMoreText: Content.ContentIndexSlice['primary']['view_more_text'],
    fallbackItemImage: Content.ContentIndexSlice['primary']['fallback_item_image']

}
function ContentList({ items, contentType, fallbackItemImage, viewMoreText }: ContentListProps) {

    const componentRef = useRef(null);
    const [currentItem, setCurrentItem] = useState<number | null>(null)
    const [hovering, setHovering] = useState(false);
    const lastMousePos = useRef({ x: 0, y: 0 })
    const revealRef = useRef(null)
    const itemsRef = useRef<Array<HTMLLIElement | null>>([])


    useEffect(() => {
        // animate list items with stagger
        let ctx = gsap.context(() => {
            itemsRef.current.map((item, index) => {
                gsap.fromTo(item, {
                    opacity: 0,
                    y: 20
                }, {

                    opacity: 1,
                    y: 0,
                    duration: 1.3,
                    ease: 'elastic.out(1, 0.3)',
                    stagger: .2,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top bottom-=100px',
                        end: 'bottom center',
                        toggleActions: 'play none none none'
                    }
                },)
            })
        }, componentRef)


        return () => ctx.revert()
    }, [])


    useEffect(() => {
        // animate mouse hover 
        const handleMouseHover = (e: MouseEvent) => {
            const mousePos = { x: e.clientX, y: e.clientY + window.scrollY }
            const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2))

            let ctx = gsap.context(() => {
                // animate the image holder
                if (currentItem !== null) {
                    // why 350, cuz image height is 320
                    const maxY = window.scrollY + window.innerHeight - 350;
                    // why 250, cuz image height is 220
                    const maxX = window.innerWidth - 250

                    gsap.to(revealRef.current, {
                        x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
                        y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
                        rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1),
                        ease: 'back.out(2)',
                        duration: 1.2
                    })


                    gsap.to(revealRef.current, {
                        opacity: hovering ? 1 : 0,
                        visibility: 'visible',
                        ease: 'power3.out',
                        duration: 0.4
                    })



                }


            })
            lastMousePos.current = mousePos;
            return () => ctx.revert()
        }


        window.addEventListener('mousemove', handleMouseHover)


        return () => window.removeEventListener('mousemove', handleMouseHover)
    }, [currentItem, hovering])



    const contentImages = items.map(item => {
        const image = isFilled.image(item.data.hover_image) ?
            item.data.hover_image :
            fallbackItemImage

        return asImageSrc(image, {
            fit: 'crop',
            w: 220,
            h: 320,
            exp: -10
        })
    })

    useEffect(() => {
        contentImages.map(url => {
            if (!url) return null;

            const image = new Image()
            image.src = url
        })
    }, [contentImages])



    const urlPrefix = contentType === 'Blog' ? '/blog' : '/project'

    const handleMouseEnter = (index: number) => {
        setCurrentItem(index)
        if (!hovering) setHovering(true)
    }

    const handleMouseLeave = () => {
        setCurrentItem(null)
        setHovering(false)
    }
    return (
        <>
            <ul ref={componentRef} className='grid border-b border-b-slate-100' onMouseLeave={handleMouseLeave}>
                {items.map((item, i) => (
                    <li key={i} className='opacity-0 list-item' onMouseEnter={() => handleMouseEnter(i)} ref={el => (itemsRef.current[i] = el)}>
                        <Link href={`${urlPrefix} / ${item.id}`} className='flex flex-col md:flex-row justify-between border-t border-t-slate-100 py-10  text-slate-200 '>
                            <div className='flex flex-col'>
                                <span className='text-3xl font-bold'>

                                    {item.data.title}
                                </span>

                                <div className="flex gap-3 text-yellow-300">{
                                    item.tags.map(tag => (
                                        <span key={tag} className='text-xl font-bold'>{tag}</span>
                                    ))
                                }</div>
                            </div>
                            <span className='ml-auto flex items-center gap-2 text-xl font-medium md:ml-0'>
                                {viewMoreText} <MdArrowOutward />
                            </span>
                        </Link>
                    </li>
                ))}

                {/* hover element */}
                <div className='hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center transition-[background] duration-300 opacity-0' style={{
                    backgroundImage: currentItem !== null ? `url(${contentImages[currentItem]})` : ''
                }} ref={revealRef}> </div>
            </ul>
        </>
    )
}

export default ContentList