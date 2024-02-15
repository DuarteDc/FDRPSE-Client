import { Fragment, useEffect, useState } from 'react';
import { surveyService } from '../../../domain/services/survey.service';
import { LoadingScreen, PageLayout } from '../../../infraestructure/components/ui';
import { Button, Chip, ModalFooter, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import { CircleCheck, EyeIcon, PlayerPlay, QuestionIcon } from '../../../infraestructure/components/icons';
import { Link } from 'react-router-dom';
import { Modal } from '../../../infraestructure/components/ui/Modal';

export const SurveyPage = () => {

  const { startGetSurveys, surveys, startNewSurvey, loading, startFinalizeSurvey } = surveyService();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [surveyId, setSurveyId] = useState<string>();

  useEffect(() => {
    startGetSurveys();
  }, []);

  return (

    <PageLayout navigateTo="/auth" title="Cuestionarios">
      <>
        {loading && <LoadingScreen title="Cargando ..." />}
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
          <TableColumn>#</TableColumn>
          <TableColumn>Fecha de inicio</TableColumn>
          <TableColumn>Fecha de finalización</TableColumn>
          <TableColumn>Estatus</TableColumn>
          <TableColumn> </TableColumn>
        </TableHeader>
        <TableBody>
          {
            surveys.map(({ id, startDate, endDate, status }, index) => (
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
                    <Button as={Link} to={`show/${id}`}
                      className="bg-slate-800 text-white text-xs h-9 font-bold"
                      endContent={
                        <span className="bg-white text-slate-800 rounded-full p-[1.2px]">
                          <EyeIcon width={15} height={15} />
                        </span>}>
                      Ver
                    </Button>
                    {
                      !status && (<Button
                        onClick={() => { onOpen(); setSurveyId(id) }}
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
      <Modal
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
      />
    </PageLayout >

  )
}
