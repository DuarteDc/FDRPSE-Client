import { DragEvent, Fragment, useEffect, useState } from 'react';
import { Button, Checkbox, CheckboxGroup, Tooltip, cn, useDisclosure } from '@nextui-org/react';
import { SelectSingleEventHandler } from 'react-day-picker';

import { Area } from '../../../domain/models';

import { Modal } from '../../../infraestructure/components/ui/Modal';
import { DatePicker, PageLayout } from '../../../infraestructure/components/ui';
import { ArrowNarrowLeft, ArrowNarrowRight, BuildingComunity, CheckIcon, CheckboxIcon, ClearAllIcon, PlusIcon, SaveIcon, XIcon } from '../../../infraestructure/components/icons';

import { surveyService } from '../../../domain/services/survey.service';
import 'react-day-picker/dist/style.css';
import { Steper } from '../../../infraestructure/components/ui/Steper';
import { DATETIME_STEP } from '../../utils/dateTimeSteps';
import { areaService } from '../../../domain/services/area.service';

export const StartNewSurvey = () => {

    const { getAreasToSearch, areas, handleAddAndDeleteAreas } = surveyService();
    const [isDrag, seTisDrag] = useState(false);
    const [selectedArea, setSelectedArea] = useState<Array<Area>>([]);
    const [multiSelect, setMiltiSelect] = useState<boolean>(false);
    const [groupSelectAreas, setGroupSelectAreas] = useState<Array<string>>([]);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { setDatetime } = areaService();


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


    const handleAddMultipleAreas = (newAreas: Array<string>) => {
        setSelectedArea(prev => [...prev,
        ...newAreas.map((areaId) => areas.find(({ id }) => id.toString() === areaId!.toString())!),
        ]);

        newAreas.map((areaId) => {
            const deleteArea = areas.find(({ id }) => areaId == id)!;
            handleAddAndDeleteAreas(deleteArea, false);
        })
        setMiltiSelect(false)
        onOpen()
    }

    const handleSelectAllAreas = () => {
        setSelectedArea(prev => [...prev, ...areas]);
        areas.map((area) => handleAddAndDeleteAreas(area, false));
        onOpen()
    }

    return (
        <PageLayout navigateTo="/admin" title="Comenzar encuesta">
            <Modal
                title=""
                isOpen={isOpen}
                onChange={onOpenChange}
                size="3xl"
                hideCloseButton
                renderContent={(onClose) => (
                    <div className="-mx-4 -mt-8">
                        <Steper
                            steps={DATETIME_STEP}
                            renderButtons={({ step, backStep, nextStep }) =>
                                <Fragment>
                                    <Button
                                        onClick={backStep}
                                        className="border-2 border-transparent hover:border-slate-800  bg-transparent"
                                        isDisabled={(step < 1)}
                                        startContent={<ArrowNarrowLeft />}>
                                        Atras
                                    </Button>
                                    <Button
                                        onClick={nextStep}
                                        className="float-right bg-slate-800 text-white"
                                        endContent={(step + 1) >= DATETIME_STEP.length ? <SaveIcon /> : <ArrowNarrowRight />}
                                    // spinner={<Spinner />}
                                    >
                                        {(step + 1) >= DATETIME_STEP.length ? 'Guardar' : 'Sieguiente'}
                                    </Button>
                                </Fragment>
                            }
                        />
                    </div>
                )}
            />
            <div className="flex justify-end my-4 gap-x-2">
                <Button onClick={handleSelectAllAreas} className="bg-slate-800 text-white py-6 px-8 font-bold" isDisabled={!areas.length}
                    endContent={
                        <span className="w-[1.5rem] h-[1.5rem] bg-white text-black rounded-full flex justify-center items-center">
                            <ClearAllIcon width={20} height={20} />
                        </span>}
                >
                    Seleccionar todas
                </Button>
                <Button onClick={() => setMiltiSelect(prev => !prev)} isDisabled={!areas.length}
                    className="bg-slate-800 text-white py-6 px-8 font-bold"
                    endContent={
                        <span className="w-[1.5rem] h-[1.5rem] bg-white text-black rounded-full flex justify-center items-center">
                            {
                                multiSelect ? <XIcon width={20} height={20} /> : <CheckboxIcon width={20} height={20} />
                            }
                        </span>
                    }>
                    {multiSelect ? 'Cancelar selección' : 'Selección multiple'}
                </Button>
            </div>
            <section className="grid grid-cols-7 gap-x-4 gap-0 relative pt-5">
                <div className={`col-span-5 overflow-y-auto row-span-1 w-full border-2 transition-all duration-400 rounded-xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 px-2 gap-4 grid-rows-10 
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
                                    <Tooltip content="Eliminar" color="danger">
                                        <span className="text-white hover:bg-danger right-1 absolute top-1 rounded-full p-[3px] transition-all duration-500
                                        bg-emerald-600 after:absolute after:border-2 after:border-white after:rounded-full after:z-50  after:w-[calc(100%-4px)] 
                                        after:h-[calc(100%-4px)] z-20 after:top-0 after:left-0 after:m-auto after:bottom-0 after:right-0
                                    " aria-label={`delete-area-${area.id}`} onClick={() => onDeleteSelectedAres(area)}>
                                            <XIcon width={18} height={18} />
                                        </span>
                                    </Tooltip>
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
                    <CheckboxGroup
                        label={multiSelect ? 'Selecciona multiples areas' : 'Selecciona una area'}
                        value={groupSelectAreas}
                        onChange={setGroupSelectAreas}
                    >
                        {
                            areas.map(({ id, name }) => (
                                <>
                                    {
                                        multiSelect ? (
                                            <Checkbox classNames={{
                                                base: cn(
                                                    "inline-flex max-w-md w-full",
                                                    "hover:bg-content2 items-center justify-start",
                                                    "cursor-pointer rounded-lg",
                                                ),
                                                label: "w-full",
                                            }}
                                                value={id + ''}
                                            >
                                                <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105 w-full my-2"
                                                    key={id}
                                                >
                                                    <div>
                                                        <span className="lg:w-[4rem] lg:h-[4rem] w-[3rem] h-[3rem] bg-emerald-600  text-white mx-4 flex items-center justify-center rounded-full">
                                                            <BuildingComunity width={30} height={30} />
                                                        </span>
                                                    </div>
                                                    <div className="w-full">
                                                        <h2 className="font-bold text-sm w-full">{name}</h2>
                                                    </div>
                                                </div>
                                            </Checkbox>
                                        ) :
                                            (
                                                <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105 w-full my-2"
                                                    key={id}
                                                    draggable
                                                    onDragStart={(event: DragEvent<HTMLDivElement>) => onDragStart(event, id)}
                                                    onDragEnd={endDrag}
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
                    </CheckboxGroup >
                </div>

                {
                    multiSelect && groupSelectAreas.length && (
                        <Tooltip content="Agregar areas seleccionadas" color="primary">
                            <Button className="animate-[fadeIn_0.5s] bottom-20 h-[3.5rem] w-[3.5rem] right-20 shadow-lg z-[999] rounded-full fixed bg-emerald-600 text-white font-bold" isIconOnly onClick={() => handleAddMultipleAreas(groupSelectAreas)}>
                                <PlusIcon width={40} height={40} />
                            </Button>
                        </Tooltip>
                    )
                }
            </section>
        </PageLayout >
    )
}
