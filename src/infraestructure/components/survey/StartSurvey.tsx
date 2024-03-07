import { ForwardedRef, Fragment, forwardRef, useImperativeHandle } from 'react';
import { ValidateStep } from '../../../app/utils/surveySteps';
import { Modal } from '../ui/Modal';
import { Button, Skeleton, Tooltip, useDisclosure } from '@nextui-org/react';
import { ArrowNarrowLeft, ArrowNarrowRight, BuildingComunity, BuildingIcon, CheckboxIcon, ClearAllIcon, HomeIcon, PlusIcon, SaveIcon, XIcon } from '../icons';
import { Steper } from '../ui/Steper';
import { DATETIME_STEP } from '../../../app/utils/dateTimeSteps';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useNewSurvey } from '../../../app/hooks/useNewSurvey';
import { areaService } from '../../../domain/services/area.service';
import { TypeAreas } from '../../../domain/models/Area';
import { AreasList } from '../../../app/pages/surveys';


export const StartSurvey = forwardRef<ValidateStep>((__, ref: ForwardedRef<ValidateStep>) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { areas, areasWithDatetime } = areaService();

    const { onDragStart, onDragEnd, allowDrop, onDropArea, isDrag, onDeleteArea, handleSelectAllAreas, multiSelect, handleMultiSelect, handleSelectMultiplesAreas, handleOnChageSelectedAreas, multipleAreasSelected, handleRollbackSelectedAreas } = useNewSurvey({ openDatetime: onOpen });


    useImperativeHandle(ref, () => ({
        canContinue: () => true,
    }));

    return (
        <Fragment>
            <Modal
                title=""
                isOpen={isOpen}
                onChange={onOpenChange}
                size="5xl"
                hideCloseButton
                renderContent={(onClose) => (
                    <div className="-mx-4 my-4">
                        <Button className="absolute top-2 right-2 bg-transparent border-2 hover:bg-danger hover:text-white transition-all hover:border-danger-600 duration-700" isIconOnly
                            onClick={() => { onClose(); handleRollbackSelectedAreas(); }} >
                            <XIcon width={16} height={16} />
                        </Button>
                        <Steper
                            steps={DATETIME_STEP}
                            renderButtons={({ step, backStep, nextStep, isValidStep }) =>
                                <Fragment>
                                    <Button
                                        onClick={backStep}
                                        className="border-2 border-transparent hover:border-slate-800  bg-transparent"
                                        isDisabled={(step < 1)}
                                        startContent={<ArrowNarrowLeft />}>
                                        Atras
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            if ((step + 1) >= DATETIME_STEP.length) {
                                                nextStep(),
                                                    isValidStep && onClose();
                                                return
                                            }
                                            nextStep();
                                        }}
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
                <Button onClick={handleMultiSelect} isDisabled={!areas.length}
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
            <section className="grid grid-cols-7 gap-x-4 gap-0 relative pt-5 overflow-hidden">
                <div className={`col-span-5 w-full border-2 transition-all duration-400 rounded-xl flex flex-wrap p-2 gap-x-2


                    ${isDrag ? 'bg-gray-200 border-dashed border-gray-400 ease-in' : 'opacity-100 ease-in-out'}`}
                    onDrop={onDropArea}
                    onDragOver={allowDrop}
                >
                    {
                        areasWithDatetime?.map((area) => (
                            <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out w-full lg:w-[calc(50%-5px)] xl:w-[calc(33%-5px)] my-2 animate-[fadeIn_0.5s] max-h-[6rem] relative [&>*:first-child>*:first-child]:hover:bg-danger overflow-hidden"
                                key={area?.id}
                            >
                                <div>
                                    <Tooltip content="Eliminar" color="danger">
                                        <span className="text-white right-1 absolute top-1 rounded-full p-[3px] transition-all duration-500
                                        bg-emerald-600/20 after:absolute after:border-2 after:border-white after:rounded-full after:z-50  after:w-[calc(100%-4px)] 
                                        after:h-[calc(100%-4px)] z-20 after:top-0 after:left-0 after:m-auto after:bottom-0 after:right-0
                                    "
                                            aria-label={`delete-area-${area.id}`} onClick={() => onDeleteArea(area)}
                                        >
                                            <XIcon width={18} height={18} />
                                        </span>
                                    </Tooltip>
                                    <span className="lg:w-[4rem] lg:h-[4rem] w-[3rem] h-[3rem] bg-emerald-600  text-white mx-4 flex items-center justify-center rounded-full">
                                        {
                                            area.typeArea === TypeAreas.Direction ? (
                                                <BuildingComunity width={30} height={30} />
                                            ) : (
                                                area.typeArea === TypeAreas.Subdirection ? (
                                                    <BuildingIcon width={30} height={30} />
                                                ) : (
                                                    <HomeIcon width={30} height={30} />
                                                )
                                            )
                                        }
                                    </span>
                                </div>
                                <div className="relative w-full [&>b]:text-[10px] [&>b]:text-emerald-600 lg:text-[10px]">
                                    <span className="font-bold text-sm block">{area?.name}</span>
                                    {
                                        area.startDate && area.endDate ? (
                                            <Fragment>
                                                <b>{format(area?.startDate!, 'P h:mm a', { locale: es })} - </b>
                                                <b>{format(area?.endDate!, 'P h:mm a', { locale: es })}</b>
                                            </Fragment>
                                        ) :
                                            (
                                                <Skeleton className="w-10/12 h-2 rounded-full mt-2" />
                                            )
                                    }
                                </div>
                            </div>
                        ))
                    }

                </div>
                <AreasList
                    areas={areas as any}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    canMultiSelect={multiSelect}
                    onChangeSelected={handleOnChageSelectedAreas}
                    selectedAreas={multipleAreasSelected}
                    areasWithDatetime={areasWithDatetime}
                />
                {
                    multiSelect && (
                        <Tooltip content="Agregar areas seleccionadas" color="primary">
                            <Button className="animate-[fadeIn_0.5s] bottom-20 h-[3.5rem] w-[3.5rem] right-20 z-[999] rounded-full fixed bg-emerald-600 text-white font-bold
                            shadow-xl" onClick={handleSelectMultiplesAreas}
                                isIconOnly
                            >
                                <PlusIcon width={30} height={30} />
                            </Button>
                        </Tooltip>
                    )
                }
            </section>
        </Fragment>
    )
})
