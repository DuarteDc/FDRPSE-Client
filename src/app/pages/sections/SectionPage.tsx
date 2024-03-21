import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Button, Input, Tab, Tabs, useDisclosure } from '@nextui-org/react';

import { PageLayout } from '../../../infraestructure/components/ui';
import { Modal } from '../../../infraestructure/components/ui/Modal';
import { SectionList } from '../../../infraestructure/components/sections/SectionList';
import { SectionCard, SectionForm } from '../../../infraestructure/components/sections';
import { FilterIcon, PlusIcon, SearchIcon, SectionIcon, StarsIcon, StarsOff, XIcon } from '../../../infraestructure/components/icons';


import { useParams } from '../../hooks/useParams';
import { sectionService } from '../../../domain/services/section.service';
import { useNavigation } from '../../hooks/useNavigation';
import { useDebounce } from '../../hooks/useDebounce';
import { useLocation } from 'react-router-dom';

export const SectionPage = () => {

    const { search } = useLocation();
    const { navigate } = useNavigation();

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
        startGetSections(parseToString() || search);
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
            <div className="w-full pb-10 mb-5 mt-2 grid grid-cols-1 lg:grid-cols-2 items-center border-b-2">
                <Input
                    className="w-full"
                    placeholder="Buscar por nombre..."
                    value={query || ''}
                    onValueChange={handleSearch}
                    startContent={
                        <SearchIcon />
                    }
                />
                <div className="flex items-center lg:justify-end w-full mt-4 lg:mt-0 overflow-x-auto">
                    <Tabs
                        aria-label="Options filter"
                        className="my-4"
                        defaultSelectedKey={getValueOfQueryParams('type') || 'gradable'}
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
                    <span className="ml-4 font-bold text-sm flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
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

