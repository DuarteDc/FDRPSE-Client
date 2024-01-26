import { useCallback, useState } from 'react';

export const useDrawer = (initState = false) => {

    const [ isOpen, setIsOpen ] = useState(initState);

    const onOpenDrawer = useCallback(() => setIsOpen(prev => !prev), []);

   return { isOpen, onOpenDrawer }
}
