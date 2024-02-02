import { Button, Progress } from "@nextui-org/react";
import { ChevonLeft } from "../icons";
import { memo } from "react";
import { getProgessByStep } from "../../../app/helpers/getProgessByStep";

interface Props {
    currentPage : number;
    totalItems  : number;
}

export const FooterControls = memo(({ currentPage, totalItems }: Props) => {
    return (
        <footer className="fixed left-0 bottom-0 w-full backdrop-blur-lg bg-background/70 border-t border-divider">
            <Progress value={getProgessByStep(totalItems, currentPage - 1)} aria-label="question-pogress" classNames={{ indicator: "bg-gradient-to-r from-primary via-emerald-500 to-emerald-500", }} />
            <div className="flex justify-between py-2 px-4 md:px-40 lg:max-w-[2000px] mx-auto">
                <Button className="hover:border-slate-800 hover:border-2 border-2 border-transparent"
                    // onClick={handlePreviousStep}
                    variant="bordered" startContent={
                        <ChevonLeft />
                    }>
                    Regresar
                </Button>
                <Button color="primary" type="submit"
                >
                    Siguiente
                </Button>
            </div>
        </footer >
    )
});
