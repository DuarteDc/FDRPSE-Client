import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingScreen, PageLayout } from '../../../infraestructure/components/ui';
import { surveyService } from '../../../domain/services/survey.service';
import { Autocomplete, AutocompleteItem, Button, Card, CardBody, CardFooter, Chip, CircularProgress, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User, useDisclosure } from '@nextui-org/react';
import { BuildingComunity, ClearAllIcon, EyeIcon, FileDescription, SearchIcon, StarsIcon, StarsOff } from '../../../infraestructure/components/icons';

import { useDebounce } from '../../hooks/useDebounce';
import { PieChart } from '../../../infraestructure/components/charts';
import { TransformDataToPieChart } from '../../helpers/TransformDataToPieChart';
import { Modal } from '../../../infraestructure/components/ui/Modal';
import { UserDetails } from '../../../infraestructure/components/survey/UserDetails';
import { useNavigation } from '../../hooks/useNavigation';

export const ShowSurveyPage = () => {

  const { id } = useParams();

  const { startShowSurvey, survey } = surveyService();

  const { navigate } = useNavigation();

  useEffect(() => {
    // getAreasToSearch();
    startShowSurvey(id!);
  }, []);



  console.log(survey);
  return (
    <PageLayout title="Detalle de cuestionario">
      {/* <>
        {
          loading ? <LoadingScreen title="Cargando ..." /> :
            <>
              <section className="w-full px-10 grid grid-cols-1 lg:grid-cols-2 items-center place-items-center">

                <PieChart data={TransformDataToPieChart(surveyUser)} />
                <Card className="w-full lg:w-6/12 h-80 border-none">
                  <CardBody className="justify-center items-center pb-0">
                    <CircularProgress
                      classNames={{
                        svg: "w-48 h-48 drop-shadow-md",
                        indicator: "stroke-emerald-600",
                        track: "stroke-emerald-600/20",
                        value: "text-3xl font-semibold text-slate-800",
                      }}
                      value={(totalUsersInSurvey / users) * 100 || 0}
                      strokeWidth={4}
                      showValueLabel={true}
                    />
                  </CardBody>
                  <CardFooter className="justify-center items-center pt-0">
                    <Chip
                      classNames={{
                        base: "border-1 border-emerald-600/30",
                        content: "text-emerald-600/90 text-small font-semibold",
                      }}
                      variant="bordered"
                    >
                      {`${totalUsersInSurvey} / ${users} usuarios`}
                    </Chip>
                  </CardFooter>
                </Card>
              </section>
              <div className="grid gap-y-3 lg:gap-y-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 py-5 text-emerald-600 items-center">
                <Input
                  className="w-full"
                  placeholder="Buscar por nombre..."
                  startContent={<SearchIcon />}
                  onChange={({ target }) => setQuery(target.value)}
                  value={query}
                />
                <Autocomplete
                  label="Buscar por área"
                  className="z-0"
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


              <Table aria-label="Example table with custom cells" className="max-h-[700px]" isHeaderSticky>
                <TableHeader>
                  <TableColumn> # </TableColumn>
                  <TableColumn> Nombre </TableColumn>
                  <TableColumn> Área</TableColumn>
                  <TableColumn> Calificación </TableColumn>
                  <TableColumn> Estatus </TableColumn>
                  <TableColumn> </TableColumn>
                </TableHeader>
                <TableBody>
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
                        <TableCell>
                          {
                            status &&
                            <Button onClick={() => { onOpen(); setUserId(user.id) }}
                              className="bg-slate-800 text-white text-xs h-7 font-bold"
                              endContent={
                                <span className="bg-white text-slate-800 rounded-full p-[1.2px]">
                                  <EyeIcon width={15} height={15} />
                                </span>}>
                              Ver
                            </Button>
                          }
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
                size="full"
                renderContent={() => (
                  <Fragment>
                    <UserDetails
                      surveyId={id!}
                      userId={userId!}
                    />
                  </Fragment>
                )}
              />
            </>
        }
      </> */}
      <span className="mb-5 block col-span-3">
        <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
          <FileDescription width={35} height={35} strokeWidth={1.5} />
          <p className="font-bold">Lista de cuestionarios</p>
        </span>
        <p className="text-gray-500 font-bold text-xs pl-10">Aquí se muestran la serie de cuestionarios que se aplican</p>
      </span>
      <Fragment>

        {
          survey && (

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
              <TableBody>
                {
                  survey?.guides?.map(({ id, name, status, createdAt, gradable }, index) => (
                    <TableRow key={`date-key-${id}`}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="text-xs">{name}</TableCell>
                      <TableCell>{createdAt.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Chip className="capitalize" color={status ? "success" : "warning"} size="sm" variant="flat">
                          {status ? 'Finalizado' : 'En proceso'}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <Chip className="capitalize"
                          startContent={
                            gradable ?
                              <span className="bg-green-300 rounded-full p-[2px] flex items-center justify-center">
                                <StarsIcon width={15} height={15} />
                              </span> :
                              <span className="bg-yellow-300 rounded-full p-[2px] flex items-center justify-center">
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
                          <Button onClick={() => navigate(`detail/${id}`)}
                            className="bg-slate-800 text-white text-xs h-9 font-bold"
                            endContent={
                              <span className="bg-white text-slate-800 rounded-full p-[1.2px]">
                                <EyeIcon width={15} height={15} />
                              </span>}>
                            Ver
                          </Button>
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
