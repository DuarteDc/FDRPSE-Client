import { Button } from '@nextui-org/react';
import { PageLayout } from '../../../infraestructure/components/ui';
import { GuideCard } from '../../../infraestructure/components/guides';
import { PlusIcon } from '../../../infraestructure/components/icons';
import { useNavigation } from '../../hooks/useNavigation';

export const GuidesPage = () => {

    const { navigate } = useNavigation();


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
            <div className="grid grid-cols-3 gap-5">
                <GuideCard />
                <GuideCard />
                <GuideCard />
                <GuideCard />
            </div>
        </PageLayout>
    )
}
