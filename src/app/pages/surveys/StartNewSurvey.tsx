import { DragEvent, Fragment, useEffect, useState } from "react"
import { PageLayout } from "../../../infraestructure/components/ui";
import { surveyService } from "../../../domain/services/survey.service";
import { Area } from "../../../domain/models";
import { BuildingComunity } from "../../../infraestructure/components/icons";
import { Button, Checkbox, VisuallyHidden, useDisclosure } from "@nextui-org/react";
import { Modal } from "../../../infraestructure/components/ui/Modal";

import Datetime from 'react-datetime';
import moment from 'moment';
import 'moment/locale/es';
import "react-datetime/css/react-datetime.css";


export const StartNewSurvey = () => {

    const { getAreasToSearch, areas, handleAddAndDeleteAreas } = surveyService();
    const [isDrag, seTisDrag] = useState(false);
    const [selectedArea, setSelectedArea] = useState<Array<Area>>([]);
    const [multiSelect, setMiltiSelect] = useState<boolean>(false);

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
        setSelectedArea(prev => [...prev, area])
        handleAddAndDeleteAreas(area, false)
        endDrag();
        onOpen()
    }

    const onDeleteSelectedAres = (area: Area) => {
        handleAddAndDeleteAreas(area, true);
        setSelectedArea(prev => prev.filter(selectedArea => selectedArea.id !== area.id));
    }

    const endDrag = () => seTisDrag(false);

    useEffect(() => {
        getAreasToSearch();
    }, []);


    const setDateTime = (e: any) => {
        console.log(e._d);
    }

    return (
        <PageLayout navigateTo="/admin" title="Comenzar encuesta">
            <Modal
                title="Asignar Horario"
                isOpen={isOpen}
                onChange={onOpenChange}
                size="3xl"
                renderContent={(onClose) => (
                    <Fragment>
                        <Datetime locale="es" input={false} onChange={(e: any) => setDateTime(e)} />
                        <Button onClick={onClose}>
                            Aceptar
                        </Button>
                    </Fragment>
                )}
            />
            <div className="flex justify-end my-4">
                <Button onClick={() => setMiltiSelect(prev => !prev)}>
                    Seleccionar varias areas
                </Button>
            </div>
            <section className="grid grid-cols-7 gap-x-4">
                <div className={`col-span-5 w-full border-2 transition-all duration-400 rounded-xl min-h-screen round px-5 grid grid-cols-3 gap-2 h-auto
                    ${isDrag ? 'bg-gray-200 border-dashed border-gray-400 ease-in' : 'opacity-100 ease-in-out'}`}
                    onDrop={onDropArea}
                    onDragOver={allowDrop}
                >
                    {
                        selectedArea?.map((area) => (
                            <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out w-full my-2 animate-[fadeIn_0.5s] max-h-[6rem] relative"
                                key={area?.id}
                            >
                                <div>
                                    <span className="absolute top-1 right-2" onClick={() => onDeleteSelectedAres(area)}>
                                        X
                                    </span>
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
                    <span className="sticky top-0 z-10 bg-white block w-full">
                        <h3 className="text-2xl font-bold uppercase bg-gradient-to-r from-primary via-emerald-600 to-emerald-600 inline-block text-transparent bg-clip-text">Lista de areas</h3>
                    </span>
                    {
                        areas.map(({ id, name }) => (
                            <>
                                {
                                    multiSelect ? (
                                        <Checkbox className="w-full">
                                            <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105 w-full my-2"
                                                key={id}
                                                draggable
                                                onDragStart={(event: DragEvent<HTMLDivElement>) => onDragStart(event, id)}
                                            // onDragEnd={() => seTisDrag(false)}
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
                                        </Checkbox >
                                    ) :
                                        (
                                            <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105 w-full my-2"
                                                key={id}
                                                draggable
                                                onDragStart={(event: DragEvent<HTMLDivElement>) => onDragStart(event, id)}
                                            // onDragEnd={() => seTisDrag(false)}
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
                                        )
                                }
                            </>
                        ))
                    }
                </div>

                {
                    multiSelect && (
                        <Button className="absolute right-10 z-[999] rounded-full">
                            Agregar selecciones
                        </Button>
                    )
                }
            </section>
        </PageLayout >
    )
}
