import { Button, useDisclosure } from '@nextui-org/react';
import { PageLayout } from '../../../infraestructure/components/ui';
import { PlusIcon, SectionIcon } from '../../../infraestructure/components/icons';
import { sectionService } from '../../../domain/services/section.service';
import { Fragment, useEffect } from 'react';
import { Modal } from '../../../infraestructure/components/ui/Modal';
import { SectionCard, SectionForm } from '../../../infraestructure/components/sections';
import { SectionList } from '../../../infraestructure/components/sections/SectionList';

export const SectionPage = () => {

    const { startGetSections, sections, loading } = sectionService();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        startGetSections();
    }, []);

    return (
        <PageLayout title="Secciones" navigateTo="/admin">
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

            <SectionList sections={sections} loading={loading} />

            <Modal
                title="Agregar Sección"
                isOpen={isOpen}
                onChange={onOpenChange}
                size="3xl"
                renderContent={(onClose) => (
                    <SectionForm onClose={onClose} loading={loading} />
                )}
            />
        </PageLayout>
    )
}

