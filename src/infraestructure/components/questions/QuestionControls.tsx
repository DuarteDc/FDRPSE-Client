import { ReactNode } from 'react'
import { Button, Progress } from '@nextui-org/react';

import { ChevonLeft } from '../icons';

interface Props {
  children: ReactNode;
}

export const QuestionControls = ({ children }: Props) => {
  return (
    <>
      {children}
      <footer className="absolute bottom-0 left-0 z-50 w-full backdrop-blur-lg bg-background/70 border-t border-divider">
        <Progress color="success" aria-label="Loading..." value={9} size="sm" />
        <div className="flex justify-between py-2 px-96">
          <Button className="hover:border-slate-800 hover:border-2 border-2 border-transparent" variant="bordered" startContent={
            <ChevonLeft />
          }>
            Regresar
          </Button>
          <Button color="primary">
            Siguiente
          </Button>
        </div>
      </footer>
    </>
  )
}
