import { useEffect } from 'react';

import { BoxIcon, PlusIcon } from '../../../infraestructure/components/icons';
import { CardList, PageLayout } from '../../../infraestructure/components/ui';
import { domianService } from '../../../domain/services/domian.service';
import { useNavigation } from '../../hooks/useNavigation';

export const DomainsPage = () => {

    const { navigate } = useNavigation();
    const { domains, loading, startGetDomains } = domianService();

    useEffect(() => {
        startGetDomains();
    }, []);

    return (
        <PageLayout title="Dominios">
            <span className="mb-5 block col-span-3">
                <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                    <BoxIcon width={35} height={35} strokeWidth={1.5} />
                    <p className="font-bold">Lista de dominios</p>
                </span>
                <p className="text-gray-500 font-bold text-xs pl-10">Los dominios son utiles para cuestionarios que cuentan con una calificación</p>
            </span>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 xl:gap-5 my-4 lg:mt-20">
                <CardList data={domains} loading={loading} >
                    <CardList.CreateItem title="Crear dominio" image={<PlusIcon />} onPress={() => navigate('create')} />
                </CardList>
            </div>

        </PageLayout>
    )
}
