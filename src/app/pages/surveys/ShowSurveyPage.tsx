import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout } from '../../../infraestructure/components/ui';
import { surveyService } from '../../../domain/services/survey.service';
import { Button, Chip, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { CheckIcon, EyeIcon, FileDescription, PausePlayer,  PlayerPlay, StarsIcon, StarsOff } from '../../../infraestructure/components/icons';

import { useNavigation } from '../../hooks/useNavigation';
import { StatusGuide } from '../../../domain/models';

export const ShowSurveyPage = () => {

  const { id } = useParams();

  const { startShowSurvey, survey, startPausedOrContinueGuide, loading , startFinalizeGuideSurvey} = surveyService();

  const { navigate } = useNavigation();

  useEffect(() => {
    startShowSurvey(id!);
  }, []);

  return (
    <PageLayout title="Detalle de cuestionario">
      <span className="mb-5 block col-span-3">
        <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
          <FileDescription width={35} height={35} strokeWidth={1.5} />
          <p className="font-bold">Lista de cuestionarios</p>
        </span>
        <p className="text-gray-500 font-bold text-xs pl-10">Aquí se muestran la serie de cuestionarios que se aplican</p>
      </span>
      <Fragment>

        {
          survey?.guides && (
            <Table
              aria-label="Surveys data list"
            >
              <TableHeader>
                <TableColumn>#</TableColumn>
                <TableColumn>Nombre</TableColumn>
                <TableColumn>Fecha de inicio</TableColumn>
                <TableColumn>Estatus</TableColumn>
                <TableColumn>Tipo de cuestionario</TableColumn>
                <TableColumn> </TableColumn>
              </TableHeader>
              <TableBody loadingContent={<Spinner color="success" />} isLoading={loading}>
                {
                  survey?.guides?.map(({ id: guideId, name, status, createdAt, gradable }, index) => (
                    <TableRow key={`date-key-${id}-${name}`}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="text-xs">{name}</TableCell>
                      <TableCell>{createdAt.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Chip className="capitalize" color={status === 0 ? 'default' : (status === StatusGuide.inProgress || status === StatusGuide.paused) ? 'warning' : 'success'} size="sm" variant="flat">
                          {status === StatusGuide.noInitialized ? 'No iniciado' : (status === StatusGuide.inProgress || status === StatusGuide.paused) ? 'En proceso' : 'Finalizado'}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <Chip className="capitalize"
                          startContent={
                            gradable ?
                              <span className="text-green-600 bg-green-300/20 rounded-full p-[2px] flex items-center justify-center">
                                <StarsIcon width={15} height={15} />
                              </span> :
                              <span className="text-yellow-600 bg-yellow-300/20 rounded-full p-[2px] flex items-center justify-center">
                                <StarsOff width={15} height={15} />
                              </span>
                          }
                          classNames={{
                            base: `${gradable ? 'bg-green-500/10' : 'bg-yellow-500/10'}`,
                            content: 'font-bold text-xs'
                          }}
                          size="sm" variant="solid">
                          {gradable ? 'Evaluativo' : 'Informativo'}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <div className="relative flex items-center gap-2">
                          <Button onClick={() => navigate(`detail/${guideId}`)}
                            className="bg-slate-800 text-white text-xs h-9 font-bold"
                            endContent={
                              <span className="bg-white text-slate-800 rounded-full p-[1.2px]">
                                <EyeIcon width={15} height={15} strokeWidth={2} />
                              </span>}>
                            Ver
                          </Button>
                          {
                            (status === StatusGuide.inProgress) && (
                              <Fragment>
                                <Button 
                                  onClick={() => startPausedOrContinueGuide(id!, `${guideId}`, StatusGuide.paused)}
                                  className="bg-amber-600 text-white text-xs h-9 font-bold"
                                  endContent={
                                    <span className="bg-white text-amber-600 rounded-full p-[1.2px]">
                                      <PausePlayer width={15} height={15} strokeWidth={2.5} />
                                    </span>}>
                                  Pausar
                                </Button>
                                <Button onClick={() => startFinalizeGuideSurvey(id!, `${guideId}`)}
                                  className="bg-emerald-600 text-white text-xs h-9 font-bold"
                                  endContent={
                                    <span className="bg-white text-emerald-600 rounded-full p-[1.2px]">
                                      <CheckIcon width={15} height={15} strokeWidth={2.5} />
                                    </span>}>
                                  Terminar
                                </Button>
                              </Fragment>
                            )
                          }
                          {
                            status === StatusGuide.paused && (
                              <Button 
                                onClick={() => startPausedOrContinueGuide(id!, `${guideId}`, StatusGuide.inProgress)}
                                className="bg-amber-600 text-white text-xs h-9 font-bold"
                                endContent={
                                  <span className="bg-white text-amber-600 rounded-full p-[1.2px]">
                                    <PlayerPlay width={15} height={15} strokeWidth={2.5} />
                                  </span>}>
                                Continuar
                              </Button>
                            )
                          }
                          {
                            (status === 0 && survey.guides!.find(guide => guide.id !== guideId && guide.status === 2)) && (
                              <Button onClick={() => navigate(`detail/${id}`)}
                                className="bg-emerald-600 text-white text-xs h-9 font-bold"
                                endContent={
                                  <span className="bg-white text-emerald-600 rounded-full p-[1.2px]">
                                    <CheckIcon width={15} height={15} strokeWidth={2.5} />
                                  </span>}>
                                Comenzar
                              </Button>
                            )
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
      </Fragment>
    </PageLayout >
  )
}
