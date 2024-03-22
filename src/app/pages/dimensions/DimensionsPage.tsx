import { useEffect } from 'react';

import { PlusIcon } from '../../../infraestructure/components/icons';
import { CardList, PageLayout } from '../../../infraestructure/components/ui';

import { dimensionService } from '../../../domain/services/dimension.service';
import { useNavigation } from '../../hooks/useNavigation';


export const DimensionsPage = () => {

    const { navigate } = useNavigation();

    const { dimensions, loading, startGetDimensions } = dimensionService();

    useEffect(() => {
        startGetDimensions();
    }, []);

    return (
        <PageLayout title="Dimensiones">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 xl:gap-5 my-4 lg:mt-20">
                <CardList data={dimensions} loading={loading} >
                    <CardList.CreateItem title="Crear dimension" image={<PlusIcon />} onPress={() => navigate('create')} />
                </CardList>
            </div>

        </PageLayout>
    )
}
