"use client"



import { Content, KeyTextField, asLink } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { MdClose, MdMenu } from 'react-icons/md'
import Button from '@/components/Button'

const Navbar = ({ settings }: { settings: Content.SettingsDocument }) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname()
    return (
        <nav aria-label="Main Navigation">
            <ul className='bg-slate-50 flex flex-col justify-between rounded-b-lg px-4 py-2 md:m-4 md:flex-row md:items-center md:rounded-xl'>
                <div className='flex items-center justify-between'>
                    <NameLogo name={settings.data.name} />
                    <button className='block md:hidden p-2 text-2xl text-slate-800' onClick={() => setOpen(true)}><MdMenu /></button>
                </div>

                <div className={clsx('fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-end gap-4 bg-slate-50 pr-4 pt-14 transition-transform ease-in-out md:hidden', open ? 'translate-x-0' : 'translate-x-[100%]')}>
                    <button className="text-slate-800 text-2xl" aria-label='Close Menu' aria-expanded={open} onClick={() => setOpen(false)}>
                        <MdClose />
                    </button>

                    {
                        settings.data.nav_item.map(({ label, link }, index) => (
                            <React.Fragment key={index}>
                                <li className="first:mt-8">
                                    <PrismicNextLink
                                        className={clsx(
                                            "group relative block overflow-hidden rounded px-3 text-3xl font-bold text-slate-900 ",
                                        )}
                                        field={link}
                                        onClick={() => setOpen(false)}
                                        aria-current={
                                            pathname.includes(asLink(link) as string)
                                                ? "page"
                                                : undefined
                                        }
                                    >
                                        <span
                                            className={clsx(
                                                "absolute inset-0 z-0 h-full translate-y-12 rounded bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0",
                                                pathname.includes(asLink(link) as string)
                                                    ? "translate-y-6"
                                                    : "translate-y-18",
                                            )}
                                        />
                                        <span className="relative">{label}</span>
                                    </PrismicNextLink>
                                </li>
                                {index < settings.data.nav_item.length - 1 && (
                                    <span
                                        className="hidden text-4xl font-thin leading-[0] text-slate-400 md:inline"
                                        aria-hidden="true"
                                    >
                                        /
                                    </span>
                                )}
                            </React.Fragment>
                        ))
                    }
                </div>
                <DesktopMenu settings={settings} pathname={pathname} />
            </ul>
        </nav>
    )
}


function NameLogo({ name }: { name: KeyTextField }) {
    return (
        <Link href={'/'} aria-label='Home Page' className='text-xl font-extrabold tracking-tighter text-slate-900' >{name} </Link>
    )
}

function DesktopMenu({
    settings,
    pathname,
}: {
    settings: Content.SettingsDocument;
    pathname: string;
}) {
    return (
        <div className="relative z-50 hidden flex-row items-center gap-1 bg-transparent py-0 md:flex">
            {settings.data.nav_item.map(({ link, label }, index) => (
                <React.Fragment key={label}>
                    <li>
                        <PrismicNextLink
                            className={clsx(
                                "group relative block overflow-hidden rounded px-3 py-1 text-base font-bold text-slate-900",
                            )}
                            field={link}
                            aria-current={
                                pathname.includes(asLink(link) as string) ? "page" : undefined
                            }
                        >
                            <span
                                className={clsx(
                                    "absolute inset-0 z-0 h-full rounded bg-yellow-300 transition-transform  duration-300 ease-in-out group-hover:translate-y-0",
                                    pathname.includes(asLink(link) as string)
                                        ? "translate-y-6"
                                        : "translate-y-8",
                                )}
                            />
                            <span className="relative">{label}</span>
                        </PrismicNextLink>
                    </li>
                    {index < settings.data.nav_item.length - 1 && (
                        <span
                            className="hidden text-4xl font-thin leading-[0] text-slate-400 md:inline"
                            aria-hidden="true"
                        >
                            /
                        </span>
                    )}
                </React.Fragment>
            ))}
            <li>
                <Button
                    linkField={settings.data.cta_link}
                    label={settings.data.cta_label}
                    className="ml-3"
                />
            </li>
        </div>
    );
}
export default Navbar