import { useEffect } from 'react';

import { PlusIcon } from '../../../infraestructure/components/icons';
import CardList, { PageLayout } from '../../../infraestructure/components/ui';
import { domianService } from '../../../domain/services/domian.service';
import { useNavigation } from '../../hooks/useNavigation';

export const DomainsPage = () => {

    const { navigate } = useNavigation();
    const { domains, loading, startGetDomains } = domianService();

    useEffect(() => {
        startGetDomains();
    }, []);

    return (
        <PageLayout title="Dominios" navigateTo="/auth/">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 xl:gap-5 my-4 lg:mt-20">
                <CardList data={domains} loading={loading} >
                    <CardList.CreateItem title="Crear dominio" image={<PlusIcon />} onPress={() => navigate('create')} />
                </CardList>
            </div>

        </PageLayout>
    )
}
