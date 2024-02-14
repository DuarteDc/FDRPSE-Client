import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingScreen, PageLayout } from '../../../infraestructure/components/ui';
import { surveyService } from '../../../domain/services/survey.service';
import { Autocomplete, AutocompleteItem, Button, Card, CardBody, Chip, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User, useDisclosure } from '@nextui-org/react';
import { BuildingComunity, ClearAllIcon, SearchIcon } from '../../../infraestructure/components/icons';

import { useDebounce } from '../../hooks/useDebounce';
import { PieChart } from '../../../infraestructure/components/charts';
import { TransformDataToPieChart } from '../../helpers/TransformDataToPieChart';
import { Modal } from '../../../infraestructure/components/ui/Modal';

export const ShowSurveyPage = () => {

  const { id } = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { surveyUser, searchByNameAndArea, loading, areas, getAreasToSearch } = surveyService();
  const [query, setQuery] = useState('');
  const [area, setArea] = useState('');

  useEffect(() => {
    getAreasToSearch();
  }, []);

  const updated = useDebounce(query, 400);

  const handleClearSearch = () => {
    if (!query && !area) return;
    setQuery('');
    setArea('');
  }

  useEffect(() => {
    searchByNameAndArea(id!, query, area);
  }, [updated, area])



  return (
    <PageLayout navigateTo="/admin/surveys" title="Detalle de cuestionario">

      <section className="w-full">
        <Card>
          <CardBody className="px-10">
            <PieChart data={TransformDataToPieChart(surveyUser)} />
          </CardBody>
        </Card>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 py-5 text-emerald-600 items-center">
        <Input
          className="w-full"
          placeholder="Buscar por nombre..."
          startContent={<SearchIcon />}
          onChange={({ target }) => setQuery(target.value)}
          value={query}
        />
        <Autocomplete
          label="Buscar por área"
          startContent={<BuildingComunity />}
          onSelectionChange={(key) => setArea(key as string || '')}
          selectedKey={area}
        >
          {
            areas?.map(({ id, name }) => (
              <AutocompleteItem key={id} value={id}>{name}</AutocompleteItem>
            ))
          }
        </Autocomplete>
        <Button className="bg-slate-800 text-white px-14 py-7 md:col-span-2 lg:col-span-1"
          onClick={handleClearSearch}
          endContent={
            <span className="w-[2rem] h-[1.4rem] bg-white text-black rounded-full flex justify-center items-center">
              <ClearAllIcon width={20} height={15} />
            </span>
          }>Limpiar</Button>
      </div>


      <Table aria-label="Example table with custom cells">
        <TableHeader>
          <TableColumn> # </TableColumn>
          <TableColumn> Nombre </TableColumn>
          <TableColumn> Área</TableColumn>
          <TableColumn> Calificación </TableColumn>
          <TableColumn> Estatus </TableColumn>
          <TableColumn> </TableColumn>
        </TableHeader>
        <TableBody
          isLoading={loading}
          loadingContent={<LoadingScreen title="Buscando ..." />}
        >
          {
            surveyUser?.map(({ user, total, status }, index) => (
              <TableRow key={user.id} className="[&>td]:py-4">
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <User
                    avatarProps={{ radius: "lg", src: `https://ui-avatars.com/api?name=${user.name + user.last_name}&background=EAFAF5&color=059669` }}
                    name={`${user.name} ${user.last_name}`}
                    className="text-sm"
                  >
                  </User>

                </TableCell>
                <TableCell>{user.area.name}</TableCell>
                <TableCell>{total || 'NA'}</TableCell>
                <TableCell>
                  <Chip className="capitalize" color={status ? "success" : "warning"} size="sm" variant="flat">
                    {status ? 'Finalizado' : 'En proceso'}
                  </Chip>
                </TableCell>
                <TableCell onClick={onOpen}>Detalles</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

      <Modal
        title="Agregar Sección"
        isOpen={isOpen}
        onChange={onOpenChange}
        size="full"
        renderContent={(onClose) => (
          <Fragment>
            <Table aria-label="Example table with custom cells">
              <TableHeader>
                <TableColumn> # </TableColumn>
                <TableColumn> Nombre </TableColumn>
                <TableColumn> Área</TableColumn>
                <TableColumn> Categoria </TableColumn>
                <TableColumn> Domino </TableColumn>
                <TableColumn> Dimension </TableColumn>
              </TableHeader>
              <TableBody
                isLoading={loading}
                loadingContent={<LoadingScreen title="Buscando ..." />}
              >
                {
                  surveyUser[0]?.answers.map(({ name, qualification, category, dimension, domain }, index) => (
                    <TableRow key={name} className="[&>td]:py-4">
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell>{qualification}</TableCell>
                      <TableCell>{category.name || 'NA'}</TableCell>
                      <TableCell>{dimension.name || 'NA'}</TableCell>
                      <TableCell>{domain.name || 'NA'}</TableCell>

                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </Fragment>
        )}
      />


    </PageLayout >
  )
}
