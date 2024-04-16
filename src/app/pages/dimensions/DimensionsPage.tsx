import { Fragment, useEffect } from 'react';

import { DimensionsIcon, PlusIcon, XIcon } from '../../../infraestructure/components/icons';
import { CardList, PageLayout } from '../../../infraestructure/components/ui';

import { dimensionService } from '../../../domain/services/dimension.service';
import { useNavigation } from '../../hooks/useNavigation';
import { Modal } from '../../../infraestructure/components/ui/Modal';
import { Button, useDisclosure } from '@nextui-org/react';
import { FormDimension } from '../../../infraestructure/components/dimensions';
import { Dimension } from '../../../domain/models';


export const DimensionsPage = () => {

    const { navigate } = useNavigation();
    const { dimensions, loading, startGetDimensions, startGetCurrentDimension } = dimensionService();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        startGetDimensions();
    }, []);

    const loadDimension = (currentDimension: Dimension) => {
        onOpen();
        startGetCurrentDimension(currentDimension.id);
    }

    return (
        <PageLayout title="Dimensiones">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 xl:gap-5 my-4 lg:mt-20">
                <CardList data={dimensions} loading={loading} onPress={loadDimension}>
                    <CardList.CreateItem
                        title="Crear dimension"
                        image={<PlusIcon />}
                        onPress={() => navigate('create')}
                    />
                </CardList>
            </div>

            <Modal
                isOpen={isOpen}
                onChange={onOpenChange}
                hideCloseButton
                size="4xl"
                renderContent={(onClose) => (
                    <Fragment>
                        <header className="flex items-center justify-between -mt-6 py-1 border-b-2 ">
                            <div className="flex items-center font-bold [&>svg]:text-emerald-600 text-xl [&>svg]:mr-1 pt-4 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1">
                                <DimensionsIcon width={35} height={35} strokeWidth={1.5} />
                                <h3>Detalle de Dimension</h3>
                            </div>
                            <Button isIconOnly className="border-2 bg-transparent" onClick={() => { onClose(); }}>
                                <XIcon />
                            </Button>
                        </header>
                        <FormDimension
                            hasEditon={true}
                            title="Edita el nombre de la dimensión"
                            callback={onClose}
                        />
                    </Fragment>
                )}

            />

        </PageLayout>
    )
}
