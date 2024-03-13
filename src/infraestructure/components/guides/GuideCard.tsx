import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { DotsVertical, EditIcon, FileDescription, PlusIcon, TrashIcon } from '../icons';


export const GuideCard = () => {
    return (
        <article className="isolate rounded-xl bg-white/20 shadow-lg relative p-5 overflow-hidden hover:border-emerald-600 border-2 transition-all duration-400 cursor-pointer">
            <div className="flex items-center justify-between w-full border-b-2 pb-2">
                <div className="flex items-center font-bold">
                    <span className="min-w-[2rem] min-h-[2rem] rounded-full text-emerald-600 flex justify-center items-center mr-5 border-2">
                        <FileDescription width={20} height={20} strokeWidth={2} />
                    </span>
                    Cuestionario
                </div>
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
            </div>
            <span className="text-xs capitalize">
                CUESTIONARIO PARA IDENTIFICAR A LOS TRABAJADORES QUE FUERON SUJETOS A ACONTECIMIENTOS TRAUMÁTICOS SEVEROS
            </span>
        </article>
    )
}
