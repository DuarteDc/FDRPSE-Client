import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react';
import { PageLayout } from '../../../infraestructure/components/ui';
import { EyeIcon, PlusIcon, SectionIcon } from '../../../infraestructure/components/icons';
import { sectionService } from '../../../domain/services/section.service';
import { useEffect } from 'react';

export const SectionPage = () => {


    const { startGetSections, sections, loading } = sectionService();

    useEffect(() => {
        startGetSections();
    }, []);

    return (
        <PageLayout title="Secciones" navigateTo="/admin">
            <span className="flex justify-end my-10">
                <Button className="bg-slate-800 text-white py-6 px-8 font-bold" startContent={
                    <span className="w-[2rem] h-[2rem] bg-white text-black rounded-full flex justify-center items-center">
                        <PlusIcon />
                    </span>
                }>
                    Agregar sección
                </Button>
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8">
                <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105" draggable>
                    <div>
                        <span className="w-[4rem] h-[4rem] bg-emerald-600  text-white mx-4 flex items-center justify-center rounded-full">
                            <SectionIcon width={30} height={30} />
                        </span>
                    </div>
                    <h2 className="font-bold">Para responder las preguntas piense en la cantidad de trabajo que tiene</h2>
                </div>
                <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105" draggable>
                    <div>
                        <span className="w-[4rem] h-[4rem] bg-emerald-600  text-white mx-4 flex items-center justify-center rounded-full">
                            <SectionIcon width={30} height={30} />
                        </span>
                    </div>
                    <div>
                        <h2 className="font-bold">Las preguntas siguientes están relacionadas con la atención a clientes y usuarios.</h2>
                        <p className="text-xs text-gray-500 font-bold">En mi trabajo debo brindar servicio a clientes o usuarios</p>
                    </div>
                </div>
                <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105" draggable>
                    <div>
                        <span className="w-[4rem] h-[4rem] bg-emerald-600  text-white mx-4 flex items-center justify-center rounded-full">
                            <SectionIcon width={30} height={30} />
                        </span>
                    </div>
                    <div>
                        <h2 className="font-bold">Las preguntas siguientes están relacionadas con la atención a clientes y usuarios.</h2>
                        <p className="text-xs text-gray-500 font-bold">En mi trabajo debo brindar servicio a clientes o usuarios</p>
                    </div>
                </div>
                <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105" draggable>
                    <div>
                        <span className="w-[4rem] h-[4rem] bg-emerald-600  text-white mx-4 flex items-center justify-center rounded-full">
                            <SectionIcon width={30} height={30} />
                        </span>
                    </div>
                    <div>
                        <h2 className="font-bold">Las preguntas siguientes están relacionadas con la atención a clientes y usuarios.</h2>
                        <p className="text-xs text-gray-500 font-bold">En mi trabajo debo brindar servicio a clientes o usuarios</p>
                    </div>
                </div>
                <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105" draggable>
                    <div>
                        <span className="w-[4rem] h-[4rem] bg-emerald-600  text-white mx-4 flex items-center justify-center rounded-full">
                            <SectionIcon width={30} height={30} />
                        </span>
                    </div>
                    <div>
                        <h2 className="font-bold">Las preguntas siguientes están relacionadas con la atención a clientes y usuarios.</h2>
                        <p className="text-xs text-gray-500 font-bold">En mi trabajo debo brindar servicio a clientes o usuarios</p>
                    </div>
                </div>
                <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105" draggable>
                    <div>
                        <span className="w-[4rem] h-[4rem] bg-emerald-600  text-white mx-4 flex items-center justify-center rounded-full">
                            <SectionIcon width={30} height={30} />
                        </span>
                    </div>
                    <div>
                        <h2 className="font-bold">Las preguntas siguientes están relacionadas con la atención a clientes y usuarios.</h2>
                        <p className="text-xs text-gray-500 font-bold">En mi trabajo debo brindar servicio a clientes o usuarios</p>
                    </div>
                </div>
                <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105" draggable>
                    <div>
                        <span className="w-[4rem] h-[4rem] bg-emerald-600  text-white mx-4 flex items-center justify-center rounded-full">
                            <SectionIcon width={30} height={30} />
                        </span>
                    </div>
                    <div>
                        <h2 className="font-bold">Las preguntas siguientes están relacionadas con la atención a clientes y usuarios.</h2>
                        <p className="text-xs text-gray-500 font-bold">En mi trabajo debo brindar servicio a clientes o usuarios</p>
                    </div>
                </div>
                <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105" draggable>
                    <div>
                        <span className="w-[4rem] h-[4rem] bg-emerald-600  text-white mx-4 flex items-center justify-center rounded-full">
                            <SectionIcon width={30} height={30} />
                        </span>
                    </div>
                    <div>
                        <h2 className="font-bold">Las preguntas siguientes están relacionadas con la atención a clientes y usuarios.</h2>
                        <p className="text-xs text-gray-500 font-bold">En mi trabajo debo brindar servicio a clientes o usuarios</p>
                    </div>
                </div>
                <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105" draggable>
                    <div>
                        <span className="w-[4rem] h-[4rem] bg-emerald-600  text-white mx-4 flex items-center justify-center rounded-full">
                            <SectionIcon width={30} height={30} />
                        </span>
                    </div>
                    <div>
                        <h2 className="font-bold">Las preguntas siguientes están relacionadas con la atención a clientes y usuarios.</h2>
                        <p className="text-xs text-gray-500 font-bold">En mi trabajo debo brindar servicio a clientes o usuarios</p>
                    </div>
                </div>
                <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105" draggable>
                    <div>
                        <span className="w-[4rem] h-[4rem] bg-emerald-600  text-white mx-4 flex items-center justify-center rounded-full">
                            <SectionIcon width={30} height={30} />
                        </span>
                    </div>
                    <div>
                        <h2 className="font-bold">Las preguntas siguientes están relacionadas con la atención a clientes y usuarios.</h2>
                        <p className="text-xs text-gray-500 font-bold">En mi trabajo debo brindar servicio a clientes o usuarios</p>
                    </div>
                </div>
                <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105" draggable>
                    <div>
                        <span className="w-[4rem] h-[4rem] bg-emerald-600  text-white mx-4 flex items-center justify-center rounded-full">
                            <SectionIcon width={30} height={30} />
                        </span>
                    </div>
                    <div>
                        <h2 className="font-bold">Las preguntas siguientes están relacionadas con la atención a clientes y usuarios.</h2>
                        <p className="text-xs text-gray-500 font-bold">En mi trabajo debo brindar servicio a clientes o usuarios</p>
                    </div>
                </div>
                <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105" draggable>
                    <div>
                        <span className="w-[4rem] h-[4rem] bg-emerald-600  text-white mx-4 flex items-center justify-center rounded-full">
                            <SectionIcon width={30} height={30} />
                        </span>
                    </div>
                    <div>
                        <h2 className="font-bold">Las preguntas siguientes están relacionadas con la atención a clientes y usuarios.</h2>
                        <p className="text-xs text-gray-500 font-bold">En mi trabajo debo brindar servicio a clientes o usuarios</p>
                    </div>
                </div>
                <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105" draggable>
                    <div>
                        <span className="w-[4rem] h-[4rem] bg-emerald-600  text-white mx-4 flex items-center justify-center rounded-full">
                            <SectionIcon width={30} height={30} />
                        </span>
                    </div>
                    <div>
                        <h2 className="font-bold">Las preguntas siguientes están relacionadas con la atención a clientes y usuarios.</h2>
                        <p className="text-xs text-gray-500 font-bold">En mi trabajo debo brindar servicio a clientes o usuarios</p>
                    </div>
                </div>
                <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105" draggable>
                    <div>
                        <span className="w-[4rem] h-[4rem] bg-emerald-600  text-white mx-4 flex items-center justify-center rounded-full">
                            <SectionIcon width={30} height={30} />
                        </span>
                    </div>
                    <div>
                        <h2 className="font-bold">Las preguntas siguientes están relacionadas con la atención a clientes y usuarios.</h2>
                        <p className="text-xs text-gray-500 font-bold">En mi trabajo debo brindar servicio a clientes o usuarios</p>
                    </div>
                </div>
                <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105" draggable>
                    <div>
                        <span className="w-[4rem] h-[4rem] bg-emerald-600  text-white mx-4 flex items-center justify-center rounded-full">
                            <SectionIcon width={30} height={30} />
                        </span>
                    </div>
                    <div>
                        <h2 className="font-bold">Las preguntas siguientes están relacionadas con la atención a clientes y usuarios.</h2>
                        <p className="text-xs text-gray-500 font-bold">En mi trabajo debo brindar servicio a clientes o usuarios</p>
                    </div>
                </div>
                <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105" draggable>
                    <div>
                        <span className="w-[4rem] h-[4rem] bg-emerald-600  text-white mx-4 flex items-center justify-center rounded-full">
                            <SectionIcon width={30} height={30} />
                        </span>
                    </div>
                    <div>
                        <h2 className="font-bold">Las preguntas siguientes están relacionadas con la atención a clientes y usuarios.</h2>
                        <p className="text-xs text-gray-500 font-bold">En mi trabajo debo brindar servicio a clientes o usuarios</p>
                    </div>
                </div>
                <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105" draggable>
                    <div>
                        <span className="w-[4rem] h-[4rem] bg-emerald-600  text-white mx-4 flex items-center justify-center rounded-full">
                            <SectionIcon width={30} height={30} />
                        </span>
                    </div>
                    <div>
                        <h2 className="font-bold">Las preguntas siguientes están relacionadas con la atención a clientes y usuarios.</h2>
                        <p className="text-xs text-gray-500 font-bold">En mi trabajo debo brindar servicio a clientes o usuarios</p>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

