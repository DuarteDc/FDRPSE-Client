import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Tab, Tabs, Tooltip, useDisclosure } from '@nextui-org/react';

import { AlertConfirm, PageLayout } from '../../../infraestructure/components/ui';
import { GuideList } from '../../../infraestructure/components/guides';

import { CheckIcon, CircleOff, DotsVertical, EditIcon, EyeIcon, FileDescription, FilterIcon, PlusIcon, PowerIcon, SearchIcon, TrashIcon } from '../../../infraestructure/components/icons';

import { useNavigation } from '../../hooks/useNavigation';
import { useParams } from '../../hooks/useParams';
import { useDebounce } from '../../hooks/useDebounce';

import { guideService } from '../../../domain/services/guide.service';
import { Guide } from '../../../domain/models';

export const GuidesPage = () => {

    const { navigate } = useNavigation();
    const { setQueryParams, parseToString, getValueOfQueryParams } = useParams();
    const { startGetGuides, guides, loading, startDisableGudie, startEnableGudie } = guideService();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [query, setQuery] = useState<string>(getValueOfQueryParams('name') || '');

    const guideRef = useRef<Guide>();
    const firstRender = useRef<boolean>(true);
    const debounce = useDebounce(query, 500);

    useEffect(() => {
        startGetGuides(parseToString());
    }, [parseToString()]);

    const handleSearch = useCallback((value: string) => {
        setQuery(value)
    }, []);

    useEffect(() => {
        !firstRender.current && setQueryParams({ name: debounce });
        firstRender.current = false;
    }, [debounce])

    return (
        <PageLayout title="Cuestionarios">
            <span className="mb-5 block col-span-3">
                <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                    <FileDescription width={35} height={35} strokeWidth={1.5} />
                    <p className="font-bold">Lista de guías</p>
                </span>
                <p className="text-gray-500 font-bold text-xs pl-10">Aquí se listan los cuestionarios que se aplican a los usuarios.</p>
            </span>
            <div className="flex justify-end">
                <Button className="bg-slate-800 text-white py-[23px] px-8 font-bold float-right mb-10"
                    onClick={() => navigate('create')}
                    startContent={
                        <span className="w-[1.5rem] h-[1.5rem] bg-white text-black rounded-full flex justify-center items-center">
                            <PlusIcon />
                        </span>}>
                    Crear nuevo cuestionario
                </Button>
            </div>
            <div className="w-full pb-10 mb-5 mt-2 grid grid-cols-1 lg:grid-cols-2 items-center border-b-2">
                <Input
                    className="w-full"
                    placeholder="Buscar por nombre..."
                    onValueChange={handleSearch}
                    value={query}
                    startContent={
                        <span>
                            <SearchIcon />
                        </span>
                    }
                />
                <div className="flex items-center lg:justify-end w-full mt-4 lg:mt-0">
                    <Tabs
                        aria-label="Options filter"
                        color="primary"
                        variant="bordered"
                        selectedKey={getValueOfQueryParams('type') || 'active'}
                        onSelectionChange={(key) => { !firstRender.current && setQueryParams({ type: `${key}` }) }}
                        classNames={{
                            cursor: "w-full bg-emerald-500",
                        }}
                    >
                        <Tab key="active" title={
                            <Tooltip delay={1000} color="foreground" className="max-w-60 text-xs" content="Los cuestionarios activos pueden ser usados para ser aplicados">
                                <div className="flex items-center space-x-2 font-bold">
                                    <PowerIcon strokeWidth={2} />
                                    <span>Acitivos</span>
                                </div>
                            </Tooltip>
                        } />
                        <Tab key="disable" title={
                            <Tooltip delay={1000} color="foreground" className="max-w-60 text-xs" content="Los cuestionarios inactivos no podran ser usados, ni las secciones ni su demás contenido">
                                <div className="flex items-center space-x-2 font-bold">
                                    <CircleOff strokeWidth={2} />
                                    <span>Inactivos</span>
                                </div>
                            </Tooltip>
                        } />
                    </Tabs>
                    <span className="ml-4 font-bold text-sm flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                        <FilterIcon width={35} height={35} strokeWidth={1.5} />
                        Filtros
                    </span>
                </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                <GuideList
                    guides={guides}
                    loading={loading}
                    showType={false}
                    renderContentInsideItem={(guide) => (
                        <span className="absolute right-1 top-1">
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button className="bg-transparent max-w-1 px-0 border-2" isIconOnly>
                                        <DotsVertical />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                                    <DropdownItem
                                        onClick={() => navigate(`show/${guide.id}`)}
                                        key="show"
                                        description="Puedes visualizar todo el cuestionario"
                                        startContent={<EyeIcon />}
                                    >
                                        Ver
                                    </DropdownItem>
                                    <DropdownItem
                                        key="show"
                                        color={guide.status ? 'danger' : 'success'}
                                        className={guide.status ? "text-danger" : 'text-emerald-600'}
                                        onClick={() => { guideRef.current = guide, onOpen() }}
                                        description="Puedes desactivar el cuestionario"
                                        startContent={<TrashIcon />}
                                    >
                                        {guide.status ? 'Desactivar' : 'Activar'}
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </span>
                    )}
                />
            </div>
            <AlertConfirm
                isOpen={isOpen}
                isOpenChange={onOpenChange}
                confirmButtonColor={guideRef.current?.status ? 'danger' : 'emerald-600'}
                subtitle={
                    <span className={`flex flex-col items-center  ${guideRef.current?.status ? '[&>svg]:text-danger [&>svg]:border-danger/60' :
                        '[&>svg]:text-emerald-600 [&>svg]:emerald-600/60'}
                     mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2 text-xs text-center py-4 [&>svg]:mb-2`}>
                        {
                            guideRef.current?.status ?
                                (<TrashIcon width={46} height={46} strokeWidth={1.7} />) : (
                                    <CheckIcon width={46} height={46} strokeWidth={1.7} />
                                )
                        }
                        {
                            guideRef.current?.status ? (
                                <p className="font-bold">
                                    Al desactivar la guia, las secciones y todo su contenido será desactivado de manera automatica
                                </p>
                            ) : (
                                <p className="font-bold">
                                    Al activar la guia, las secciones y todo su contenido será activado de manera automatica
                                </p>
                            )
                        }
                    </span>
                }
                title={`${guideRef.current?.status ? '¿Estas seguro que deseas desactivar el cuestionario?' : '¿Estas seguro que deseas activar el cuestionario?'}`}
                callback={() => { guideRef.current?.status ? startDisableGudie(guideRef.current?.id!) : startEnableGudie(guideRef.current?.id!) }}

            />
        </PageLayout>
    )
}
