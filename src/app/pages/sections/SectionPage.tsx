import { Button, Tab, Tabs, useDisclosure } from '@nextui-org/react';
import { PageLayout } from '../../../infraestructure/components/ui';
import { PlusIcon } from '../../../infraestructure/components/icons';
import { sectionService } from '../../../domain/services/section.service';
import { useEffect } from 'react';
import { Modal } from '../../../infraestructure/components/ui/Modal';
import { SectionCard, SectionForm } from '../../../infraestructure/components/sections';
import { SectionList } from '../../../infraestructure/components/sections/SectionList';

export const SectionPage = () => {

    const { startGetSections, sections, loading } = sectionService({});

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        startGetSections();
    }, []);

    return (
        <PageLayout title="Secciones" navigateTo="/auth">
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
            <Tabs
                aria-label="Options filter"
                color="primary"
                variant="bordered"
                // onSelectionChange={(key) => { !firstRender.current && setQueryParams({ type: `${key}` }) }}
                classNames={{
                    cursor: "w-full bg-emerald-500",
                }}
            >
                <Tab key="active" title={
                    <div className="flex items-center space-x-2 font-bold">
                        
                        <span>Acitivos Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit, nisi!</span>
                    </div>
                } />
                <Tab key="disable" title={
                    <div className="flex items-center space-x-2 font-bold">
                        
                        <span>Inactivos</span>
                    </div>
                } />
            </Tabs>
            <SectionList sections={sections} loading={loading}
                renderChilds={({ section }) => (
                    <SectionCard section={section} draggable={false}
                    />)}
            />
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

