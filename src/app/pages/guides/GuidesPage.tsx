import { Button, ButtonGroup, Input, Tooltip } from '@nextui-org/react';
import { PageLayout } from '../../../infraestructure/components/ui';
import { GuideList } from '../../../infraestructure/components/guides';
import { CircleOff, FilterIcon, PlusIcon, PowerIcon, SearchIcon } from '../../../infraestructure/components/icons';
import { useNavigation } from '../../hooks/useNavigation';
import { useParams } from '../../hooks/useParams';
import { useEffect } from 'react';
import { guideService } from '../../../domain/services/guide.service';

export const GuidesPage = () => {

    const { navigate } = useNavigation();
    const { getValueOfQueryParams, setQueryParams, parseToString } = useParams();
    const { startGetGuides, guides, loading } = guideService();

    useEffect(() => {
        startGetGuides(parseToString());
    }, [parseToString()]);

    return (
        <PageLayout title="Cuestionarios" navigateTo="/auth">
            <span className="text-gray-500 font-bold text-xs -mt-5 mb-20 pl-4">Aquí podras encontrar la lista de los cuestionarios creados</span>
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
                    startContent={
                        <span>
                            <SearchIcon />
                        </span>
                    }
                />
                <div className="flex items-center lg:justify-end w-full mt-4 lg:mt-0">
                    <span className="mr-4 font-bold text-sm flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                        <FilterIcon width={35} height={35} strokeWidth={1.5} />
                        Filtros
                    </span>
                    <ButtonGroup>
                        <Tooltip content="Esta opción te permite buscar cuestionarios activos" delay={1000}>
                            <Button
                                onClick={() => setQueryParams({ type: 'active' })}
                                value="active"
                                className={`${getValueOfQueryParams('type') !== 'disable' ? 'bg-emerald-600  text-white' : 'bg-transparent'} font-bold border-2 transition-all duration-400`}
                                startContent={<PowerIcon strokeWidth={2} />}>
                                Activos
                            </Button>
                        </Tooltip>
                        <Button
                            onClick={() => setQueryParams({ type: 'disable' })}
                            value="disable"
                            className={`${getValueOfQueryParams('type') === 'disable' ? 'bg-emerald-600  text-white' : 'bg-transparent'} font-bold border-2`}
                            startContent={<CircleOff strokeWidth={2} />}>
                            Desactivados
                        </Button>
                    </ButtonGroup>
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
