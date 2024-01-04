import { ReactNode } from 'react';
interface IconProps {
    width       ?: number;
    height      ?: number;
}

export type IconFunction = ({ width, height }: IconProps) => ReactNode;