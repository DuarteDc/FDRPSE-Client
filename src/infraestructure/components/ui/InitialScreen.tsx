import { Spinner } from '@nextui-org/react';

export const InitialScreen = () => {
    return (
        <section className="min-h-lvh absolute z-50 bg-white/40 w-full top-0 left-0">
            <div className="flex min-h-screen w-full flex-col justify-center items-center">
                <img src="/assets/loading.svg" alt="loading-icon" width={200}  height={50} className="animate-pulse"/>
                <span className="text-emerald-600 mt-20">
                    <Spinner size="lg" color="current" className="animate-pulse" />
                </span>
            </div>
        </section>
    )
}
