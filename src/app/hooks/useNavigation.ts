import { useNavigate, To, NavigateOptions, NavigateFunction as RRDNavigateFunction } from 'react-router-dom';

export type NavigateFunction = (to: To | number, options?: NavigateOptions) => void;

export const useNavigation = () => {

    const navigation: RRDNavigateFunction = useNavigate();

    const navigate: NavigateFunction = (to: To | number, options?: NavigateOptions): void => {
        if (typeof to === 'number') {
            if (!document?.startViewTransition) return navigation(to);
            document.startViewTransition(() => navigation(to));
            return;
        }
        
        if (!document?.startViewTransition) return navigation(to, options);
        document.startViewTransition(() => navigation(to, options));
    }

    return { navigate }
}
