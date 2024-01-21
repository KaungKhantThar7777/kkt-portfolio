import { createClient } from '@/prismicio'
import { PrismicNextLink } from '@prismicio/next';
import Link from 'next/link';
import React from 'react'
import Navbar from '@/components/Navbar';

const Header = async () => {
    const client = createClient();
    const settings = await client.getSingle('settings')
    return (
        <header className='top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4 '>
            <Navbar settings={settings} />
        </header>
    )
}

export default Header