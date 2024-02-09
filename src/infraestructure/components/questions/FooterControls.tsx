import { Button, Progress } from "@nextui-org/react";
// import { ChevronLeft } from "../icons";
import { getProgessByStep } from "../../../app/helpers/getProgessByStep";
import { ChevronRight } from "../icons";

interface Props {
    currentPage         : number;
    totalItems          : number;
    handlePreviousStep  : () => void;
}

export const FooterControls = ({ currentPage, totalItems }: Props) => {
    return (
        <footer className="fixed left-0 bottom-0 w-full backdrop-blur-lg bg-background/70 border-t border-divider">
            <Progress value={getProgessByStep(totalItems, currentPage - 1)} aria-label="question-pogress" classNames={{ indicator: "bg-gradient-to-r from-primary via-emerald-500 to-emerald-500", }} />
            <div className="flex justify-end py-2 px-4 md:px-40 lg:max-w-[2000px] mx-auto">
                <Button className="bg-slate-800 text-white text-sm font-bold" type="submit" 
                    endContent={
                        <span className="w-[1.5rem] h-[1.5rem] bg-white text-black rounded-full flex justify-center items-center">
                            <ChevronRight width={20} height={20} />
                        </span>
                    }
                >
                    {
                        currentPage < totalItems ? 'Siguiente' : 'Finalizar'
                    }
                </Button>
            </div>
        </footer >
    )
};
