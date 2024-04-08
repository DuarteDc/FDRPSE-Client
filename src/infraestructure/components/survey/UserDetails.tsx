import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { LoadingScreen } from '../ui';
import { Fragment, useEffect } from 'react';
import { surveyService } from '../../../domain/services/survey.service';
import { getNameOfQualification, trasformDataToBarChart } from '../../../app/helpers/transformDataToBarChart';
import { Guide } from '../../../domain/models';
import { BarChart } from '../charts/BarChart';
interface Props {
  userId: string;
  guide: Guide;
  surveyId: string;
  guideId: string;
}

export const UserDetails = ({ userId, surveyId, guideId, guide }: Props) => {

  const { getUserDetail, userDetail, loading } = surveyService();

  useEffect(() => {
    getUserDetail(surveyId, userId, guideId);
  }, []);

  const sumGuideQualification = () => userDetail?.answers.reduce((a, b) => a += +b.qualification, 0) || 0;

  return (
    <>
      {(loading || !userDetail) ? <LoadingScreen title="Cargando ..." /> :
        <Fragment>
          <h3 className="font-bold text-lg">{userDetail?.user?.name} {userDetail?.user?.lastName}</h3>
          <span className="text-sm font-bold ml-4">{userDetail?.user?.area?.name}</span>
          {
            (userDetail && guide.gradable) &&
            <Fragment>
              <div className="w-full bg-emerald-600/10 rounded-lg p-5 lg:p-10 border-2 font-bold text-sm">
                <div>
                  <span>Calificación: {''}</span>
                  <b>{getNameOfQualification(
                    {
                      despicable: guide.qualification?.despicable!,
                      low: guide.qualification?.low!,
                      middle: guide.qualification?.middle!,
                      high: guide.qualification?.high!,
                      value: sumGuideQualification(),
                    }
                  )}
                  </b>
                </div>
                <div>
                  <span>Calificación del cuestionario: {''}</span>
                  {sumGuideQualification()}
                </div>
              </div>
              <section className="grid grid-cols-1 xl:grid-cols-2 overflow-auto">
                <BarChart
                  data={trasformDataToBarChart(userDetail, 'category')!}
                  type='category'
                />
                <BarChart
                  data={trasformDataToBarChart(userDetail, 'domain')!}
                  type='domain'
                />
              </section>
            </Fragment>
          }
          <Table aria-label="Example table with custom cells">
            <TableHeader>
              <TableColumn> # </TableColumn>
              <TableColumn> Nombre </TableColumn>
              <TableColumn>
                {
                  guide.gradable ? 'Calificación' : 'Respuesta'
                }
              </TableColumn>
              <TableColumn> Categoría </TableColumn>
              <TableColumn> Domino </TableColumn>
              <TableColumn> Dimension </TableColumn>
            </TableHeader>
            <TableBody>
              {
                userDetail?.answers?.map(({ questionId, name, qualification, category, dimension, domain }, index) => (
                  <TableRow key={questionId} className="[&>td]:py-4">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{name}</TableCell>
                    {
                      typeof qualification === 'boolean' ? (
                        <TableCell>{qualification ? 'Si' : 'No'}</TableCell>
                      ) : (
                        <TableCell>{qualification}</TableCell>
                      )
                    }
                    <TableCell>{category?.name || 'NA'}</TableCell>
                    <TableCell>{domain?.name || 'NA'}</TableCell>
                    <TableCell>{dimension?.name || 'NA'}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </Fragment>
      }
    </>
  )
}
