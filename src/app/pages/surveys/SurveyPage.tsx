import { useEffect, useState } from 'react';
import { surveyService } from '../../../domain/services/survey.service';
import { LoadingScreen } from '../../../infraestructure/components/ui';
import { Button, Card, CardBody, Chip, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { CircleCheck, EyeIcon, PlayerPlay } from '../../../infraestructure/components/icons';
import { parseDate } from '../../helpers/parseDate';
import { authService } from '../../../domain/services/auth.service';
import { useNavigation } from '../../hooks/useNavigation';

export const SurveyPage = () => {

  const { user } = authService();
  const { startGetSurveys, surveys, loading, startFinalizeSurvey } = surveyService();
  const { navigate } = useNavigation();

  const [page, setPage] = useState(1);

  useEffect(() => {
    startGetSurveys(page);
  }, [page]);

  return (
    <>
      <Card className="p-10 bg-emerald-600/10">
        <CardBody className=" grid grid-cols-1 lg:grid-cols-2 lg:grid-col-2">
          <div>
            <span className="text-3xl lg:text-6xl mb-5 block text-slate-800">Bienvenido de vuelta </span>
            <span className="text-emerald-600 text-2xl lg:text-5xl font-bold">{user?.name}</span>
          </div>
          <div className="lg:flex justify-end text-slate-800 font-bold text-sm lg:text-lg">
            <span>{parseDate(new Date())}</span>
          </div>
        </CardBody>
      </Card>
      {
        loading && <LoadingScreen title="Cargando ..." />
      }

      <span className="flex justify-end my-10">
        <Button className="bg-slate-800 text-white py-6 px-8 font-bold" onClick={() => navigate('start')}
          startContent={
            <span className="w-[1.5rem] h-[1.5rem] bg-white text-black rounded-full flex justify-center items-center">
              <PlayerPlay width={20} height={20} />
            </span>
          }>
          Comenzar serie de cuestionarios
        </Button>
      </span>

      {
        surveys && (
          <Table
            aria-label="Surveys data list"
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  showControls
                  showShadow
                  classNames={{
                    cursor: "bg-slate-800 text-background",
                  }}
                  color="default"
                  page={page}
                  total={Math.round(surveys.total / surveys.perPage)}
                  onChange={(newPage) => setPage(newPage)}
                />
              </div>
            }
          >
            <TableHeader>
              <TableColumn>#</TableColumn>
              <TableColumn>Fecha de inicio</TableColumn>
              <TableColumn>Fecha de finalización</TableColumn>
              <TableColumn>Estatus</TableColumn>
              <TableColumn> </TableColumn>
            </TableHeader>
            <TableBody>
              {
                surveys?.surveys?.map(({ id, startDate, endDate, status }, index) => (
                  <TableRow key={`date-key-${id}`}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{new Date(startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{endDate ? new Date(endDate).toLocaleDateString() : ''}</TableCell>
                    <TableCell>
                      <Chip className="capitalize" color={status ? "success" : "warning"} size="sm" variant="flat">
                        {status ? 'Finalizado' : 'En proceso'}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <div className="relative flex items-center gap-2">
                        <Button onClick={() => navigate(`show/${id}`)}
                          className="bg-slate-800 text-white text-xs h-9 font-bold"
                          endContent={
                            <span className="bg-white text-slate-800 rounded-full p-[1.2px]">
                              <EyeIcon width={15} height={15} />
                            </span>}>
                          Ver
                        </Button>
                        {
                          !status && (<Button
                            onClick={() => startFinalizeSurvey(`${id}`)}
                            className="bg-emerald-600 text-white text-xs h-9 font-bold"
                            endContent={
                              <CircleCheck />
                            }>
                            Terminar
                          </Button>)
                        }
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        )
      }
      {/* <Modal
        title=""
        isOpen={isOpen}
        onChange={onOpenChange}
        size="lg"
        renderContent={(onClose) => (
          <Fragment>
            <div className="flex flex-col items-center font-bold text-center">
              <span className="text-white h-14 w-14 bg-red-500 rounded-full flex items-center justify-center mb-2">
                <QuestionIcon width={40} height={40} />
              </span>
              <p>Antest de continuar.</p>

              <p>¿Esta seguro que sea finalizar el cuestionario?</p>

            </div>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button className="bg-emerald-600 text-white" onPress={() => { onClose(); startFinalizeSurvey(surveyId!) }}>
                Aceptar
              </Button>
            </ModalFooter>
          </Fragment>
        )}
      /> */}
    </>

  )
}
