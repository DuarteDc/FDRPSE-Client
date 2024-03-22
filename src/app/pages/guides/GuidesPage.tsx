import { useEffect, useRef, useState } from 'react';
import { Button, Input, Tab, Tabs } from '@nextui-org/react';

import { PageLayout } from '../../../infraestructure/components/ui';
import { GuideList } from '../../../infraestructure/components/guides';

import { CircleOff, FilterIcon, PlusIcon, PowerIcon, SearchIcon } from '../../../infraestructure/components/icons';

import { useNavigation } from '../../hooks/useNavigation';
import { useParams } from '../../hooks/useParams';
import { useDebounce } from '../../hooks/useDebounce';

import { guideService } from '../../../domain/services/guide.service';

export const GuidesPage = () => {

    const [query, setQuery] = useState<string>('');
    const { navigate } = useNavigation();
    const { setQueryParams, parseToString, getValueOfQueryParams } = useParams();
    const { startGetGuides, guides, loading } = guideService();

    const firstRender = useRef<boolean>(true);
    const debounce = useDebounce(query, 500);

    useEffect(() => {
        startGetGuides(parseToString());
    }, [parseToString()]);

    useEffect(() => {
        !firstRender.current && setQueryParams({ name: debounce });
        firstRender.current = false;
    }, [debounce])

    return (
        <PageLayout title="Cuestionarios">
            <span className="text-gray-500 font-bold text-xs -mt-5 mb-4 pl-4 block">Aquí podras encontrar la lista de los cuestionarios creados</span>
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
                    onValueChange={setQuery}
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
                            <div className="flex items-center space-x-2 font-bold">
                                <PowerIcon strokeWidth={2} />
                                <span>Acitivos</span>
                            </div>
                        } />
                        <Tab key="disable" title={
                            <div className="flex items-center space-x-2 font-bold">
                                <CircleOff strokeWidth={2} />
                                <span>Inactivos</span>
                            </div>
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
                />
            </div>
        </PageLayout>
    )
}
