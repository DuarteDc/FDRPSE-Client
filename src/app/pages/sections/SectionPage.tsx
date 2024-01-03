import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react';
import { PageLayout } from '../../../infraestructure/components/ui';
import { EyeIcon, PlusIcon } from '../../../infraestructure/components/icons';
import { sectionService } from '../../../domain/services/section.service';
import { useEffect } from 'react';

export const SectionPage = () => {


    const { startGetSections, sections, loading } = sectionService();

    useEffect(() => {
        startGetSections();
    }, []);

    return (
        <PageLayout title="Secciones" navigateTo="/">
            <div className="w-full flex justify-end my-5">
                <Button color="primary" startContent={<PlusIcon />}>
                    Crear nueva sección
                </Button>
            </div>
            <Table aria-label="Ususarios" color="danger">
                <TableHeader>
                    <TableColumn> Nombre </TableColumn>
                    <TableColumn> { }</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="py-5">
                            Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo
                        </TableCell>
                        <TableCell>
                            <Tooltip content="Ver" color="success">
                                <span className="text-lg text-emerald-600 cursor-pointer active:opacity-10">
                                    <EyeIcon />
                                </span>
                            </Tooltip>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="py-5">
                            Para responder las preguntas siguientes Piense en la cantidad y ritmo de trabajo que tiene</TableCell>
                        <TableCell>
                            <Tooltip content="Ver" color="success">
                                <span className="text-lg text-emerald-600 cursor-pointer active:opacity-10">
                                    <EyeIcon />
                                </span>
                            </Tooltip>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="py-5">
                            Las preguntas siguientes estan relacionadas con el esfuerzo mental que le exige su trabajo</TableCell>
                        <TableCell>
                            <Tooltip content="Ver" color="success">
                                <span className="text-lg text-emerald-600 cursor-pointer active:opacity-10">
                                    <EyeIcon />
                                </span>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </PageLayout>
    )
}
