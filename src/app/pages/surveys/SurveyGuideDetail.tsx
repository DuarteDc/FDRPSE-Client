import { Fragment, useEffect, useState } from 'react';
import { surveyService } from '../../../domain/services/survey.service';
import { LoadingScreen, PageLayout } from '../../../infraestructure/components/ui';
import { useParams } from 'react-router-dom';
import { Autocomplete, AutocompleteItem, Button, Chip, Input, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User, useDisclosure } from '@nextui-org/react';
import { BuildingComunity, ClearAllIcon, EyeIcon, SearchIcon } from '../../../infraestructure/components/icons';
import { areaService } from '../../../domain/services/area.service';
import { guideService } from '../../../domain/services/guide.service';
import { useDebounce } from '../../hooks/useDebounce';
import { Modal } from '../../../infraestructure/components/ui/Modal';
import { UserDetails } from '../../../infraestructure/components/survey/UserDetails';

export const SurveyGuideDetail = () => {

  const { id, guideId } = useParams();
  const [queryArea, setQueryArea] = useState('')
  const [querySubArea, setQuerySubArea] = useState('')
  const [query, setQuery] = useState('');
  const [userId, setUserId] = useState('');

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { startSearchGuideSurveyUserDetail, guideUserSurvey, loading } = surveyService();
  const { areas, subareas, startLoadAreas, startLoadSubAreas } = areaService();
  const { startGetGuide, guide } = guideService();

  const debounce = useDebounce(query, 500);

  useEffect(() => {
    Promise.all([

      startGetGuide(guideId!),
      startLoadAreas(),
    ])
  }, []);

  useEffect(() => {
    startSearchGuideSurveyUserDetail(id!, guideId!, query, queryArea, querySubArea);
  }, [queryArea, querySubArea, debounce])

  const handleSearchChangeArea = async (areaId: string) => {
    setQueryArea(areaId);
    setQuerySubArea('');
    await startLoadSubAreas(areaId);
  }

  return (
    <PageLayout title="Detalle de cuestionario">
      <Fragment>
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
                guideId={guideId!}
              />
            </Fragment>
          )}
        />
        {
          loading && (<LoadingScreen title="Cargando" />)
        }
        {
          guide ? (
            <h2 className="bg-gradient-to-r from-primary via-emerald-600 to-emerald-600 inline-block text-transparent lg:py-5 bg-clip-text text-xl lg:text-5xl font-bold">{guide?.name}</h2>
          ) : (
            <div className="mt-10 w-full h-[10rem]">
              <Skeleton className="w-full h-10 rounded-full my-2" />
              <Skeleton className="w-9/12 h-7 rounded-full my-2" />
            </div>
          )
        }
        <div className="grid gap-y-3 lg:gap-y-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 py-5 text-emerald-600 items-center">
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
            onSelectionChange={(key) => handleSearchChangeArea(key as string || '')}
            selectedKey={queryArea}
          >
            {
              areas?.map(({ id, name }) => (
                <AutocompleteItem key={id} value={id}>{name}</AutocompleteItem>
              ))
            }
          </Autocomplete>
          {
            (queryArea && subareas.length > 0) && (
              <Autocomplete
                label="Buscar por área"
                className="z-0 md:col-span-2 lg:col-span-1"
                startContent={<BuildingComunity />}
                onSelectionChange={(key) => setQuerySubArea(key as string || '')}
                selectedKey={querySubArea}
              >
                {
                  subareas?.map(({ id, name }) => (
                    <AutocompleteItem key={id} value={id}>{name}</AutocompleteItem>
                  ))
                }
              </Autocomplete>
            )
          }

          <Button className={`bg-slate-800 text-white px-14 py-7 md:col-span-2 ${(queryArea && subareas.length > 0) ? 'lg:col-span-1' : 'lg:col-span-2'}`}
            // onClick={handleClearSearch}
            endContent={
              <span className="w-[2rem] h-[1.4rem] bg-white text-black rounded-full flex justify-center items-center">
                <ClearAllIcon width={20} height={15} />
              </span>
            }>Limpiar
          </Button>
        </div>



        <Table
          aria-label="Surveys data list"
        >
          <TableHeader>
            <TableColumn>#</TableColumn>
            <TableColumn>Nombre</TableColumn>
            <TableColumn>Apellidos</TableColumn>
            <TableColumn>Área</TableColumn>
            <TableColumn>Total</TableColumn>
            <TableColumn>Estatus</TableColumn>
            <TableColumn> </TableColumn>
          </TableHeader>
          <TableBody>
            {
              guideUserSurvey?.map(({ id, user, total, status }, index) => (
                <TableRow key={`date-key-${id}`}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <User
                      avatarProps={{ radius: "lg", src: `https://ui-avatars.com/api?name=${user.name + user.last_name}&background=EAFAF5&color=059669` }}
                      name={`${user.name}`}
                      className="text-sm"
                    >
                    </User>
                  </TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.area.name} </TableCell>
                  <TableCell>{guide?.dragable ? total : 'NA'} </TableCell>
                  <TableCell>
                    <Chip className="capitalize" color={status ? "success" : "warning"} size="sm" variant="flat">
                      {status ? 'Finalizado' : 'En proceso'}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    {
                      status &&
                      <Button
                        onClick={() => { onOpen(); setUserId(`${user.id}`) }}
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


      </Fragment>
    </PageLayout >
  )
}
