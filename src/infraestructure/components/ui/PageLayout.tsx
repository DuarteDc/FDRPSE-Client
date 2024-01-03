import { useNavigate } from 'react-router-dom';
import { ArrowNarrowLeft } from '../icons';


interface Props {
    title       : string;
    navigateTo  : string;
    children    : JSX.Element | Array<JSX.Element>;
}
export const PageLayout = ({ title, navigateTo, children }: Props) => {

    const navigate = useNavigate();

    return (
        <>
            <header className="flex items-center text-emerald-700 mb-10">
                <span className="cursor-pointer" title="Back" onClick={() => navigate(navigateTo)}>
                    <ArrowNarrowLeft width={50} height={50} />
                </span>
                <h1 className="text-4xl font-extrabold ml-2">{title}</h1>
            </header>
            {children}
        </>
    )
}
