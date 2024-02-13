import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout } from '../../../infraestructure/components/ui';
import { surveyService } from '../../../domain/services/survey.service';
import { Input, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from '@nextui-org/react';
import { BoxIcon, BuildingComunity, CategoryIcon, SearchIcon } from '../../../infraestructure/components/icons';

export const ShowSurveyPage = () => {

  const { id } = useParams();

  const { getSurveyById, surveyUser } = surveyService();

  useEffect(() => {
    getSurveyById(id!);
  }, []);

  return (
    <PageLayout navigateTo="/admin/surveys" title="Detalle de cuestionario">
      <h2 className="bg-gradient-to-r from-primary to-emerald-600 inline-block text-transparent bg-clip-text lg:text-2xl font-bold">Filtros</h2>
      <div className="flex flex-nowrap gap-x-4 py-5 text-emerald-600">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Buscar por name..."
          startContent={<SearchIcon />}
        />
        <Select
          label="Área"
          placeholder="Selecciona una área"
          startContent={<BuildingComunity />}
        >
          <SelectItem key={1} value={1}>xD</SelectItem>
        </Select>
        <Select
          label="Categoría"
          placeholder="Selecciona una categoría"
          startContent={<CategoryIcon />}
        >
          <SelectItem key={1} value={1}>xD</SelectItem>
        </Select>
        <Select
          label="Dominio"
          placeholder="Selecciona un dominio"
          startContent={<BoxIcon />}
        >
          <SelectItem key={1} value={1}>xD</SelectItem>
        </Select>
      </div>


      <Table aria-label="Example table with custom cells">
        <TableHeader>
          <TableColumn> Item </TableColumn>
          <TableColumn> Área</TableColumn>
          <TableColumn> Calificación</TableColumn>
          <TableColumn> </TableColumn>
        </TableHeader>
        <TableBody>
          {
            surveyUser?.map(({ user, total }) => (
              <TableRow key={user.id} className="[&>td]:py-4">
                <TableCell>
                  <User
                    avatarProps={{ radius: "lg", src: `https://ui-avatars.com/api?name=${user.userName}&background=EAFAF5&color=059669` }}
                    name={user.userName}
                  >
                    {user.userName}
                  </User>

                </TableCell>
                <TableCell>{user.area.name}</TableCell>
                <TableCell>{total || 'NA'}</TableCell>
                <TableCell>{total || 'NA'}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>


    </PageLayout >
  )
}
