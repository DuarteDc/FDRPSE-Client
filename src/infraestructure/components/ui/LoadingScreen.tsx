import { Spinner } from '@nextui-org/react';

interface Props {
    title?: string;
}
export const LoadingScreen = ({ title }: Props) => {
    return (
        <section className="min-h-screen bg-gray-100/95 w-full top-0 left-0 z-[99999] fixed flex items-center justify-center flex-col text-emerald-500">
            <Spinner color="current" size="lg" />
            {title && <p className="text-emerald-600 animate-pulse font-bold text-sm">{title}</p>}
        </section>
    )
}
