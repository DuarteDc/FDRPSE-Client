import { DragEvent, useEffect, useState } from "react"
import { PageLayout } from "../../../infraestructure/components/ui";
import { surveyService } from "../../../domain/services/survey.service";
import { Area } from "../../../domain/models";
import { BuildingComunity, ClockIcon } from "../../../infraestructure/components/icons";
import { Button, useDisclosure } from "@nextui-org/react";
import { Modal } from "../../../infraestructure/components/ui/Modal";

export const StartNewSurvey = () => {

    const { getAreasToSearch, areas } = surveyService();
    const [isDrag, seTisDrag] = useState(false);
    const [selectedArea, setSelectedArea] = useState<Array<Area>>([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    const onDragStart = (event: DragEvent<HTMLDivElement>, id: string) => {
        event.dataTransfer!.setData('text', id!);

        seTisDrag(true);
    }

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const onDropArea = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text');

        const area = areas.find(a => a.id == id)!;
        // onOpen()
        setSelectedArea(prev => [...prev, area])
    }

    useEffect(() => {
        getAreasToSearch();
    }, []);

    return (
        <PageLayout navigateTo="/admin" title="Comenzar encuesta">
            <Modal
                title="Asignar Horario"
                isOpen={isOpen}
                onChange={onOpenChange}
                size="3xl"
                renderContent={(onClose) => (
                    <p>Aqui va a seleccionar la fecha</p>
                )}
            />
            <section className="grid grid-cols-7 gap-x-4">
                <div className={`col-span-5 w-full border-2 transition-all duration-400 rounded-xl min-h-screen round px-5 grid grid-cols-3 gap-2
                    ${isDrag ? 'bg-gray-200 border-dashed border-gray-400 ease-in' : 'opacity-100 ease-in-out'}`}
                    onDrop={onDropArea}
                    onDragOver={allowDrop}
                >
                    {
                        selectedArea?.map((area) => (
                            <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out w-full my-2 animate-[fadeIn_0.5s] max-h-[6rem]"
                                key={area.id}
                            >
                                <div>
                                    <span className="lg:w-[4rem] lg:h-[4rem] w-[3rem] h-[3rem] bg-emerald-600  text-white mx-4 flex items-center justify-center rounded-full">
                                        <BuildingComunity width={30} height={30} />
                                    </span>
                                </div>
                                <div className="relative w-full">
                                    <h2 className="font-bold text-sm">{area?.name}</h2>
                                </div>
                            </div>
                        ))
                    }

                </div>
                <div className="col-span-2 w-full min-h-screen px-4 max-h-[300px] overflow-y-auto">
                    <span className="sticky top-0 z-20 bg-white block w-full">
                        <h3 className="text-2xl font-bold uppercase bg-gradient-to-r from-primary via-emerald-600 to-emerald-600 inline-block text-transparent bg-clip-text">Lista de areas</h3>
                    </span>
                    {
                        areas.map(({ id, name }) => (
                            <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105 w-full my-2"
                                key={id}
                                draggable
                                onDragStart={(event: DragEvent<HTMLDivElement>) => onDragStart(event, id)}
                                onDragEnd={() => seTisDrag(false)}
                            >
                                <div>
                                    <span className="lg:w-[4rem] lg:h-[4rem] w-[3rem] h-[3rem] bg-emerald-600  text-white mx-4 flex items-center justify-center rounded-full">
                                        <BuildingComunity width={30} height={30} />
                                    </span>
                                </div>
                                <div className="relative w-full">
                                    <h2 className="font-bold text-sm">{name}</h2>
                                </div>
                            </div>

                        ))
                    }
                </div>
            </section>
        </PageLayout>
    )
}
