import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { LoadingScreen } from '../ui';
import { Fragment, useEffect } from 'react';
import { surveyService } from '../../../domain/services/survey.service';
import { trasformDataToBarChart } from '../../../app/helpers/transformDataToBarChart';
import { categoriesService } from '../../../domain/services/categories.service';
import { BarChart } from '../charts/BarChart';
import { domianService } from '../../../domain/services/domian.service';
interface Props {
  userId: string;
  surveyId: string;
}

export const UserDetails = ({ userId, surveyId }: Props) => {

  const { getUserDetail, userDetail, loading } = surveyService();
  const { startGetCategoriesWithQualifications, categoriesQualifications } = categoriesService();
  const { startDomainsWithQualifications, domainsQualifications } = domianService();

  useEffect(() => {
    getUserDetail(surveyId, userId);
    startGetCategoriesWithQualifications();
    startDomainsWithQualifications();
  }, []);

  return (
    <>
      {(loading || !userDetail || !categoriesQualifications) ? <LoadingScreen title="Cargando ..." /> :
        <Fragment>
          <h3>{userDetail.user.name} {userDetail.user.last_name}</h3>
          <section className="grid grid-cols-1 lg:grid-cols-2 overflow-scroll">
            <BarChart
              data={trasformDataToBarChart(userDetail, 'category', categoriesQualifications)}
            />
            <BarChart
              data={trasformDataToBarChart(userDetail, 'domain', domainsQualifications)}
            />
          </section>
          <Table aria-label="Example table with custom cells">
            <TableHeader>
              <TableColumn> # </TableColumn>
              <TableColumn> Nombre </TableColumn>
              <TableColumn> Calificación </TableColumn>
              <TableColumn> Categoría </TableColumn>
              <TableColumn> Domino </TableColumn>
              <TableColumn> Dimension </TableColumn>
            </TableHeader>
            <TableBody>
              {
                userDetail?.answers?.map(({ name, qualification, category, dimension, domain }, index) => (
                  <TableRow key={name} className="[&>td]:py-4">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{qualification}</TableCell>
                    <TableCell>{category.name || 'NA'}</TableCell>
                    <TableCell>{domain.name || 'NA'}</TableCell>
                    <TableCell>{dimension.name || 'NA'}</TableCell>

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
