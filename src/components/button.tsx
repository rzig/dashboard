import { ReactChildren, ReactNode } from "react";
import React from 'react';

interface Props {
    onClick?: () => void,
    children?: ReactNode
}
function Button({onClick, children}: Props) {
    return (
        <button onClick={onClick} className="bg-gray-300 rounded">
            {children}
        </button>
    )
}

export default Button;