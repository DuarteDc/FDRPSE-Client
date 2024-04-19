import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Autocomplete, AutocompleteItem, Button, Input, Tab, Tabs, useDisclosure } from '@nextui-org/react';

import { PageLayout } from '../../../infraestructure/components/ui';
import { Modal } from '../../../infraestructure/components/ui/Modal';
import { SectionList } from '../../../infraestructure/components/sections/SectionList';
import { SectionCard, SectionForm } from '../../../infraestructure/components/sections';
import { FilterIcon, PlusIcon, SearchIcon, SectionIcon, StarsIcon, StarsOff, XIcon } from '../../../infraestructure/components/icons';


import { useParams } from '../../hooks/useParams';
import { sectionService } from '../../../domain/services/section.service';
import { useNavigation } from '../../hooks/useNavigation';
import { useDebounce } from '../../hooks/useDebounce';
import { guideService } from '../../../domain/services/guide.service';

export const SectionPage = () => {

    const { navigate } = useNavigation();

    const { startGetGuides, guides } = guideService();
    const { setQueryParams, parseToString, getValueOfQueryParams } = useParams();

    const firstRender = useRef<boolean>(true);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { startGetSections, sections, loading } = sectionService({});
    const [query, setQuery] = useState<string>(getValueOfQueryParams('name') || '');

    const handleSearch = useCallback((value: string) => {
        setQuery(value)
    }, []);

    const debounce = useDebounce(query, 500);

    useEffect(() => {
        startGetGuides('');
    }, []);

    useEffect(() => {
        startGetSections(parseToString());
    }, [parseToString()]);

    useEffect(() => {
        !firstRender.current && setQueryParams({ name: debounce });
        firstRender.current = false;
    }, [debounce])

    return (
        <PageLayout title="Secciones">
            <span className="flex justify-end my-10">
                <Button className="bg-slate-800 text-white py-[23px] px-8 font-bold"
                    onClick={onOpen}
                    startContent={
                        <span className="w-[1.5rem] h-[1.5rem] bg-white text-black rounded-full flex justify-center items-center">
                            <PlusIcon />
                        </span>
                    }>
                    Agregar sección
                </Button>
            </span>
            <div className="w-full pb-10 mb-5 mt-2 items-center border-b-2">
                <Input
                    className="w-full [&>div>div>div>svg]:text-emerald-600"
                    placeholder="Buscar por nombre..."
                    value={query}
                    onValueChange={handleSearch}
                    startContent={
                        <SearchIcon strokeWidth={2.5} />
                    }
                />
                <div className="md:flex items-center lg:justify-end w-full mt-4 lg:mt-0">
                    {
                        guides && (
                            <Autocomplete
                                label="Filtrar por cuestionario"
                                className="w-full lg:max-w-md lg:mr-2"
                                size="sm"
                                selectedKey={getValueOfQueryParams('guide') || undefined}
                                scrollShadowProps={{
                                    isEnabled: false,
                                }}
                                onSelectionChange={(key) => setQueryParams({ guide: key ? `${key}` : '' })}
                            >
                                {
                                    guides.map(({ id, name }) => (
                                        <AutocompleteItem key={id} value={id} showDivider>
                                            {name}
                                        </AutocompleteItem>
                                    ))
                                }
                            </Autocomplete>
                        )
                    }
                    <div className="overflow-x-auto">
                        <Tabs
                            aria-label="Options filter"
                            className="my-4"
                            selectedKey={getValueOfQueryParams('type') || 'gradable'}
                            color="primary"
                            variant="bordered"
                            onSelectionChange={(key) => { !firstRender.current && setQueryParams({ type: `${key}` }) }}
                            classNames={{
                                cursor: "w-full bg-emerald-500",
                            }}
                        >
                            <Tab key="gradable" title={
                                <div className="flex items-center space-x-2 font-bold">
                                    <StarsIcon strokeWidth={2} />
                                    <span>Secciones con calificación</span>
                                </div>
                            } />
                            <Tab key="nongradable" title={
                                <div className="flex items-center space-x-2 font-bold">
                                    <StarsOff strokeWidth={2} />
                                    <span>Secciones sin calificación</span>
                                </div>
                            } />
                        </Tabs>
                    </div>
                    <span className="ml-auto md:ml-4 font-bold text-sm flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                        <FilterIcon width={35} height={35} strokeWidth={1.5} />
                        Filtros
                    </span>
                </div>
            </div>
            <SectionList
                sections={sections}
                loading={loading}
                renderChilds={({ section }) => (
                    <SectionCard section={section}
                        draggable={false}
                        showControlls
                        showGuide
                        handleSelectSection={() => navigate(`${section.id}`)}
                    />)}
            />
            <Modal
                isOpen={isOpen}
                onChange={onOpenChange}
                hideCloseButton
                size="4xl"
                renderContent={(onClose) => (
                    <Fragment>
                        <header className="flex items-center justify-between -mt-6 py-1 border-b-2 ">
                            <div className="flex items-center font-bold [&>svg]:text-emerald-600 text-xl [&>svg]:mr-1 pt-4 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1">
                                <SectionIcon width={35} height={35} strokeWidth={1.5} />
                                <h1>Agregar Seccion</h1>
                            </div>
                            <Button isIconOnly className="border-2 bg-transparent" onClick={onClose}>
                                <XIcon />
                            </Button>
                        </header>
                        <SectionForm onClose={onClose} loading={loading} />
                    </Fragment>
                )}
            />
        </PageLayout>
    )
}

