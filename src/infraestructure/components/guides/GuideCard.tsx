import { DragEvent, ReactNode } from 'react';
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { DotsVertical, EditIcon, FileDescription, PlusIcon, TrashIcon } from '../icons';
import { Guide } from '../../../domain/models';

interface Props {
    guide: Guide
    draggable?: boolean;
    onDragStart?: (event: DragEvent<any>, guide: Guide) => void;
    onDragEnd?: () => void;
    classNameItem?: string;
    showItemControls?: boolean;
    renderContentInsideItem?: (guide: Guide) => ReactNode;
    showType?: boolean;
}


const className = "isolate rounded-xl bg-white/20 shadow-lg relative p-5 overflow-hidden hover:border-emerald-600 border-2 transition-all duration-400 cursor-pointer my-2";
export const GuideCard = ({ guide, draggable = false, onDragEnd, onDragStart, classNameItem = className, showItemControls = false, renderContentInsideItem, showType = true }: Props) => {
    return (
        <article
            draggable={draggable}
            onDragStart={(event) => { onDragStart && onDragStart(event, guide) }}
            onDragEnd={() => { onDragEnd && onDragEnd() }}
            className={classNameItem}
        >
            {renderContentInsideItem && renderContentInsideItem(guide)}
            <div className="flex items-center justify-between w-full border-b-2 pb-2">
                <div className="flex justify-between items-center font-bold w-full mt-2">
                    <div className="flex items-center w-full">
                        <span className="min-w-[2rem] min-h-[2rem] rounded-full text-emerald-600 flex justify-center items-center mr-5 border-2">
                            <FileDescription width={20} height={20} strokeWidth={2} />
                        </span>
                        Cuestionario
                    </div>
                    {
                        showType && (
                            <Chip color={guide.gradable ? "success" : "primary"} variant="bordered" size="sm">
                                {guide.gradable ? 'Evaluativo' : 'Informativo'}
                            </Chip>
                        )
                    }
                </div>
                {
                    showItemControls && (
                        <span className="flex items-center [&>svg]:hover:text-emerald-600">
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button className="bg-transparent max-w-1 px-0 border-2" isIconOnly>
                                        <DotsVertical />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                                    <DropdownItem
                                        key="new"
                                        description="Agregar una nueva pregunta"
                                        startContent={<PlusIcon />}
                                    >
                                        Nueva pregunta
                                    </DropdownItem>
                                    <DropdownItem
                                        key="edit"
                                        description="Puedes modificar todo el cuestionario"
                                        startContent={<EditIcon />}
                                    >
                                        Editar
                                    </DropdownItem>
                                    <DropdownItem
                                        color="danger"
                                        className="text-danger"
                                        description="Puedes desactivar el cuestionario"
                                        startContent={<TrashIcon />}
                                    >
                                        Desactivar
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </span>
                    )
                }
            </div>
            <span className="text-xs capitalize">
                {guide.name}
            </span>
        </article>
    )
}
