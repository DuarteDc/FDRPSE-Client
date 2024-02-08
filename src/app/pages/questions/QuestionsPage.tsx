import { useEffect } from 'react';
import { Button, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react';

import { EyeIcon, PlusIcon } from '../../../infraestructure/components/icons';
import { PageLayout } from '../../../infraestructure/components/ui';
import { questionService } from '../../../domain/services/question.service';
import { Link } from 'react-router-dom';

export const QuestionsPage = () => {

    const { loading, questions, startGetQuestions } = questionService();

    useEffect(() => {
        startGetQuestions();
    }, []);

    return (
        <PageLayout title="Preguntas" navigateTo="/admin/">
            <Button startContent={<PlusIcon />} className="float-right mb-10" color="primary" as={Link} to="create">
                Crear Pregunta
            </Button>
            <Table aria-label="Example table with custom cells">
                <TableHeader>
                    <TableColumn> Item </TableColumn>
                    <TableColumn> Pregunta </TableColumn>
                    <TableColumn>  </TableColumn>
                </TableHeader>
                <TableBody items={questions} loadingContent={<Spinner color="success" />} isLoading={loading}>
                    {
                        questions.map(({ id, name }) => (
                            <TableRow key={id} className="[&>td]:py-4">
                                <TableCell>{id}</TableCell>
                                <TableCell>{name}</TableCell>
                                <TableCell>
                                    <Tooltip content="Ver" color="success">
                                        <Link to={`show/${id}`} className="text-lg text-emerald-600 cursor-pointer active:opacity-10">
                                            <EyeIcon />
                                        </Link>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </PageLayout>
    )
}

// <QuestionControls>
//     <div className="flex flex-col items-center justify-center">
//         <h1 className="font-semibold text-emerald-600">Para responder las preguntas siguientes considere las condiciones ambientales de sus centro de trabajo</h1>
//         <div className="text-left">
//             <div className="my-14">
//                 <p className="font-bold">El espacio donde trabajo me permite realizar mis actividades de manera segura e higienica</p>
//                 <span>
//                     <CheckboxGroup
//                         color="primary"
//                         orientation="horizontal"
//                         isRequired
//                     >
//                         <Checkbox value="0">Siempre</Checkbox>
//                         <Checkbox value="1">Casi Siempre</Checkbox>
//                         <Checkbox value="2">Algunas veces</Checkbox>
//                         <Checkbox value="3">Casi nunca</Checkbox>
//                         <Checkbox value="4">Nunca</Checkbox>
//                     </CheckboxGroup>
//                 </span>
//             </div>
//             <div className="my-14">
//                 <p className="font-bold">El espacio donde trabajo me permite realizar mis actividades de manera segura e higienica</p>
//                 <span>
//                     <CheckboxGroup
//                         // color="primary"
//                         orientation="horizontal"
//                         isRequired
//                         className="text-[#01454F]"
//                     >
//                         <Checkbox value="buenos-aires">Siempre</Checkbox>
//                         <Checkbox value="sydney">Casi Siempre</Checkbox>
//                         <Checkbox value="san-francisco">Algunas veces</Checkbox>
//                         <Checkbox value="london">Casi nunca</Checkbox>
//                         <Checkbox value="tokyo">Nunca</Checkbox>
//                     </CheckboxGroup>
//                 </span>
//             </div>
//             <div className="my-14">
//                 <p className="font-bold">El espacio donde trabajo me permite realizar mis actividades de manera segura e higienica</p>
//                 <span>
//                     <CheckboxGroup
//                         color="primary"
//                         orientation="horizontal"
//                         isRequired
//                     >
//                         <Checkbox value="buenos-aires">Siempre</Checkbox>
//                         <Checkbox value="sydney">Casi Siempre</Checkbox>
//                         <Checkbox value="san-francisco">Algunas veces</Checkbox>
//                         <Checkbox value="london">Casi nunca</Checkbox>
//                         <Checkbox value="tokyo">Nunca</Checkbox>
//                     </CheckboxGroup>
//                 </span>
//             </div>
//             <div className="my-14">
//                 <p className="font-bold">El espacio donde trabajo me permite realizar mis actividades de manera segura e higienica</p>
//                 <span>
//                     <CheckboxGroup
//                         color="primary"
//                         orientation="horizontal"
//                         isRequired
//                     >
//                         <Checkbox value="buenos-aires">Siempre</Checkbox>
//                         <Checkbox value="sydney">Casi Siempre</Checkbox>
//                         <Checkbox value="san-francisco">Algunas veces</Checkbox>
//                         <Checkbox value="london">Casi nunca</Checkbox>
//                         <Checkbox value="tokyo">Nunca</Checkbox>
//                     </CheckboxGroup>
//                 </span>
//             </div>
//         </div>
//     </div>
// </QuestionControls>