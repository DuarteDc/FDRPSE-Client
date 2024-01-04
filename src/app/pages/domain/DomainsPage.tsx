import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PlusIcon } from '../../../infraestructure/components/icons';
import CardList, { PageLayout } from '../../../infraestructure/components/ui';
import { domianService } from '../../../domain/services/domian.service';

export const DomainsPage = () => {

    const navigate = useNavigate();
    const { domains, loading, startGetDomains } = domianService();

    useEffect(() => {
        startGetDomains();
    }, []);

    return (
        <PageLayout title="Dominios" navigateTo="/admin/">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 xl:gap-5 my-4 lg:mt-20">
                <CardList data={domains} loading={loading} >
                    <CardList.CreateItem title="Crear dominio" image={<PlusIcon />} onPress={() => navigate('create')} />
                </CardList>
            </div>

        </PageLayout>
    )
}
