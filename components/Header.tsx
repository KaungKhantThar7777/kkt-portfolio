import { createClient } from '@/prismicio'
import { PrismicNextLink } from '@prismicio/next';
import Link from 'next/link';
import React from 'react'

const Header = async () => {
    const client = createClient();
    const settings = await client.getSingle('settings')
    return (
        <header className='top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4 '>
            <nav>
                <ul>
                    <li>

                        <Link href={"/"} aria-label='home page'>

                            {settings.data.name}
                        </Link>

                    </li>
                    {settings.data.nav_item.map(item => (
                        <li key={item.label}>
                            <PrismicNextLink field={item.link}>{item.label}</PrismicNextLink>
                        </li>
                    ))}

                </ul>
            </nav>
        </header>
    )
}

export default Header