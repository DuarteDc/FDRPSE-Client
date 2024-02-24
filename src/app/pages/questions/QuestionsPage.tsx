import { useEffect } from 'react';
import { Button, Input, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

import { EyeIcon, PlusIcon, QuestionIcon, SearchIcon } from '../../../infraestructure/components/icons';
import { PageLayout } from '../../../infraestructure/components/ui';
import { questionService } from '../../../domain/services/question.service';
import { useNavigation } from '../../hooks/useNavigation';

export const QuestionsPage = () => {

    const { loading, questions, startGetQuestions } = questionService();
    const { navigate } = useNavigation();

    useEffect(() => {
        startGetQuestions();
    }, []);

    return (
        <PageLayout title="Preguntas" navigateTo="/auth/">
            <Button className="bg-slate-800 text-white py-[23px] px-8 font-bold float-right mb-10" color="primary"
                onClick={() => navigate('create')}
                startContent={
                    <span className="w-[1.5rem] h-[1.5rem] bg-white text-black rounded-full flex justify-center items-center">
                        <PlusIcon />
                    </span>
                }>
                Crear Pregunta
            </Button>
            <span className="mb-3 mt-20 block">
                <Input
                    className="w-full md:w-8/12 lg:w-4/12"
                    placeholder="Buscar por nombre..."
                    startContent={
                        <span className="text-emerald-600">
                            <SearchIcon />
                        </span>
                    }
                // onChange={({ target }) => setQuery(target.value)}
                // value={query}
                />
            </span>
            <Table aria-label="Table for users">
                <TableHeader>
                    <TableColumn className="py-5 text-emerald-700 font-extrabold text-base"> # </TableColumn>
                    <TableColumn className="py-5 text-emerald-700 font-extrabold text-base"> Pregunta </TableColumn>
                    <TableColumn className="py-5 text-emerald-700 font-extrabold text-base">  </TableColumn>
                </TableHeader>
                <TableBody items={questions} loadingContent={<Spinner color="success" />} isLoading={loading}>
                    {
                        questions.map(({ id, name }, index) => (
                            <TableRow key={id} className="[&>td]:py-4 hover:bg-gray-100 hover:cursor-pointer transition-all duration-400 ease-in [&>*:first-child]:rounded-s-large [&>*:last-child]:rounded-e-large">
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <span className="flex items-center gap-x-3">
                                        <span className="bg-emerald-600 h-[2.5rem] w-[2.5rem] flex items-center justify-center text-white rounded-xl">
                                            <QuestionIcon />
                                        </span>
                                        {name}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => navigate(`show/${id}`)}
                                        className="bg-slate-800 text-white text-xs h-9 font-bold"
                                        endContent={
                                            <span className="bg-white text-slate-800 rounded-full p-[1.2px]">
                                                <EyeIcon width={15} height={15} />
                                            </span>}>
                                        Ver
                                    </Button>
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