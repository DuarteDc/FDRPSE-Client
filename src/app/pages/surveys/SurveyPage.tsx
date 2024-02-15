import { useEffect } from 'react';
import { surveyService } from '../../../domain/services/survey.service';
import { LoadingScreen, PageLayout } from '../../../infraestructure/components/ui';
import { Button, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react';
import { EyeIcon, PlayerPlay } from '../../../infraestructure/components/icons';
import { Link } from 'react-router-dom';

export const SurveyPage = () => {

  const { startGetSurveys, surveys, startNewSurvey, loading } = surveyService();

  useEffect(() => {
    startGetSurveys();
  }, []);

  return (

    <PageLayout navigateTo="/admin" title="Encuestas">
      <>
        {loading && <LoadingScreen title="Cargando ..."/>}
      </>
      <span className="flex justify-end my-10">
        <Button className="bg-slate-800 text-white py-6 px-8 font-bold" onClick={startNewSurvey}
          startContent={
            <span className="w-[1.5rem] h-[1.5rem] bg-white text-black rounded-full flex justify-center items-center">
              <PlayerPlay width={20} height={20} />
            </span>
          }>
          Comenzar encuesta
        </Button>
      </span>

      <Table aria-label="Surveys data list">
        <TableHeader>
          <TableColumn>indice</TableColumn>
          <TableColumn>Fecha de inicio</TableColumn>
          <TableColumn>Fecha de finalización</TableColumn>
          <TableColumn>Estatus</TableColumn>
          <TableColumn> </TableColumn>
        </TableHeader>
        <TableBody>
          {
            surveys.map(({ id, startDate, endDate, status }) => (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>{new Date(startDate).toLocaleDateString()}</TableCell>
                <TableCell>{endDate}</TableCell>
                <TableCell>
                  <Chip className="capitalize" color={status ? "success" : "warning"} size="sm" variant="flat">
                    {status ? 'Finalizado' : 'En proceso'}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Button as={Link} to={`show/${id}`}
                      className="bg-slate-800 text-white text-xs h-9 font-bold"
                      endContent={
                        <span className="bg-white text-slate-800 rounded-full p-[1.2px]">
                          <EyeIcon width={15} height={15} />
                        </span>}>
                      Ver
                    </Button>
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
