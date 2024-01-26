
import { CSSProperties, ReactNode } from 'react';
import ComponetDrawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

type Direction = 'right' | 'left' | 'top' | 'bottom';

interface Props {
  children: Array<ReactNode> | ReactNode;
  open: boolean;
  onClose: () => void;
  direction?: Direction;
  size?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}


export const Drawer = ({ children, direction = "right", size = 300, duration = 400, ...props }: Props) => {
  return (
    <ComponetDrawer
      size={size}
      duration={duration}
      direction={direction}
      {...props}
      zIndex={20}
    >
      { children }
    </ComponetDrawer>
  )
}
