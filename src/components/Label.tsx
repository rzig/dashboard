import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode
}

function Label({children}: Props) {
    return (
        <label className="text-xs font-bold text-gray-600">{children}</label>
    )
}

export default Label;