import { ArrowNarrowLeft } from '../icons';
import { useNavigation } from '../../../app/hooks/useNavigation';
interface Props {
    title: string;
    children: JSX.Element | Array<JSX.Element>;
}
export const PageLayout = ({ title, children }: Props) => {

    const { navigate } = useNavigation();

    return (
        <>
            <header className="flex items-center text-emerald-600 mb-10 cursor-pointer transition-all">
                <span className="cursor-pointer rounded-lg border-2 transition-all hover:border-emerald-600" title="Back" onClick={() => navigate(-1)}>
                    <ArrowNarrowLeft width={40} height={40} />
                </span>
                <h1 className="text-4xl font-extrabold ml-2">{title}</h1>
            </header>
            {children}
        </>
    )
}
