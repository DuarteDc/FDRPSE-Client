import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { LoadingScreen } from '../ui';
import { Fragment, useEffect } from 'react';
import { surveyService } from '../../../domain/services/survey.service';
import { trasformDataToBarChart } from '../../../app/helpers/transformDataToBarChart';
import { Guide } from '../../../domain/models';
import { BarChart } from '../charts/BarChart';
import { UserIcon } from '../icons';
import { GuideSurveyQualification } from '.';
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



  return (
    <>
      {(loading || !userDetail) ? <LoadingScreen title="Cargando ..." /> :
        <Fragment>
          <div className="flex items-center font-bold [&>svg]:text-emerald-600 text-xl [&>svg]:mr-1 pt-4 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1">
            <UserIcon width={35} height={35} strokeWidth={1.5} />
            <h3 className="font-bold text-lg">
              {userDetail?.user?.name} {userDetail?.user?.lastName}
            </h3>
          </div>
          <span className="text-sm font-bold ml-4">{userDetail?.user?.area?.name}</span>
          {
            (userDetail && guide.gradable) &&
            <Fragment>
              <GuideSurveyQualification
                guide={guide}
                userDetail={userDetail}
              />
              <section className="grid grid-cols-1 xl:grid-cols-2 overflow-auto">
                <BarChart
                  data={trasformDataToBarChart(userDetail, 'category')!}
                  type="category"
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
                  <TableRow key={questionId} className={`[&>td]:py-4 ${typeof qualification === 'boolean' && isNaN(questionId) && 'bg-emerald-600/10 [&>*]:font-bold'}`}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{name}</TableCell>
                    {
                      typeof qualification === 'boolean' ? (
                        <TableCell>{qualification ? 'Si' : 'No'}</TableCell>
                      ) : (
                        <TableCell>{qualification}</TableCell>
                      )
                    }
                    <TableCell>{
                      typeof qualification === 'boolean' ? '' :
                        category?.name || 'NA'
                    }</TableCell>
                    <TableCell>{
                      typeof qualification === 'boolean' ? '' :
                        domain?.name || 'NA'
                    }</TableCell>
                    <TableCell>{
                      typeof qualification === 'boolean' ? '' :
                        dimension?.name || 'NA'
                    }</TableCell>
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
