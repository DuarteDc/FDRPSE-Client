import { ArrowNarrowLeft } from '../icons';
import { useNavigation } from '../../../app/hooks/useNavigation';
interface Props {
    title       : string;
    navigateTo  : string;
    children    : JSX.Element | Array<JSX.Element>;
}
export const PageLayout = ({ title, navigateTo, children }: Props) => {

    const { navigate } = useNavigation();

    return (
        <>
            <header className="flex items-center text-emerald-600 mb-10">
                <span className="cursor-pointer" title="Back" onClick={() => navigate(navigateTo)}>
                    <ArrowNarrowLeft width={50} height={50} />
                </span>
                <h1 className="text-4xl font-extrabold ml-2">{title}</h1>
            </header>
            {children}
        </>
    )
}
