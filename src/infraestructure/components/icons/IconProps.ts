import { ReactNode } from 'react';
interface IconProps {
    width       ?: number;
    height      ?: number;
    strokeWidth ?: number;
}

export type IconFunction = ({ width, height, strokeWidth }: IconProps) => ReactNode;