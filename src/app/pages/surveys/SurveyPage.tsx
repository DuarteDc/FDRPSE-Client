import { useEffect } from 'react';
import { surveyService } from '../../../domain/services/survey.service';
import { PageLayout } from '../../../infraestructure/components/ui';
import { Button, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react';
import { PlayerPlay } from '../../../infraestructure/components/icons';
import { Link } from 'react-router-dom';

export const SurveyPage = () => {

  const { startGetSurveys, surveys } = surveyService();

  useEffect(() => {
    startGetSurveys();
  }, []);

  return (

    <PageLayout navigateTo="/admin" title="Encuestas">

      <span className="flex justify-end my-10">
        <Button className="bg-slate-800 text-white py-6 px-8 font-bold" as={Link} to="start"
          startContent={
            <span className="w-[1.5rem] h-[1.5rem] bg-white text-black rounded-full flex justify-center items-center">
              <PlayerPlay width={20} height={20} />
            </span>
          }>
          Comenzar encuesta
        </Button>
      </span>

      <Table>
        <TableHeader>
          <TableColumn>indice</TableColumn>
          <TableColumn>Fecha de inicio</TableColumn>
          <TableColumn>Fecha de finalización</TableColumn>
          <TableColumn>Estatus</TableColumn>
          <TableColumn> </TableColumn>
        </TableHeader>
        <TableBody>
          {
            surveys.map(({ id, start_date, end_date, status }) => (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>{new Date(start_date).toLocaleDateString()}</TableCell>
                <TableCell>{end_date}</TableCell>
                <TableCell>
                  <Chip className="capitalize" color={status ? "success" : "warning"} size="sm" variant="flat">
                    {status ? 'Finalizado' : 'En proceso'}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Link to={`show/${id}`}>
                      <Tooltip content="Detalles">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          ver
                        </span>
                      </Tooltip>
                    </Link>
                    <Tooltip color="danger" content="Delete user">
                      <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        terminar
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </PageLayout>

  )
}
