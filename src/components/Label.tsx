import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode,
    className?: string
}

function Label({children, className}: Props) {
    return (
        <label className={"text-xs font-bold text-gray-600 " + className}>{children}</label>
    )
}

export default Label;