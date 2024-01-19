import { KeyTextField, LinkField } from "@prismicio/client"
import { PrismicNextLink } from "@prismicio/next"
import clsx from "clsx"
import { MdArrowOutward } from "react-icons/md";



type ButtonProps = {
    linkField: LinkField,
    label: KeyTextField,
    showIcon?: boolean,
    className?: string
}


export default function Button({ label, linkField, className, showIcon }: ButtonProps) {

    return (
        <PrismicNextLink field={linkField} className={clsx("group overflow-hidden cursor-pointer relative w-fit flex items-center justify-center border-slate-900 border-2 bg-slate-50  text-black font-bold px-4 py-2 rounded-md transition-transform ease-out hover:scale-105", className)} >
            <span className="absolute inset-0 z-0 bg-yellow-300 transition-transform duration-300 ease-in-out  translate-y-9  group-hover:translate-y-0" />
            <span className="relative inline-flex items-center justify-center gap-2 ">{label}
                {showIcon && <MdArrowOutward className="inline-block" />}</span>
        </PrismicNextLink>
    )
}