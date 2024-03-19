import { useNavigate, NavigateOptions } from 'react-router-dom';


export const useNavigation = () => {

    const navigation = useNavigate();

    const navigate = (to: string, options?: NavigateOptions): void => {
        if (!document?.startViewTransition) return navigation(to, options);
        document.startViewTransition(() => navigation(to, options));
    }

    return { navigate }

}
