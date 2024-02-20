import { HomeIcon, QuestionIcon, CategoryIcon, BoxIcon, DimensionsIcon, SectionIcon } from '../../infraestructure/components/icons';
import { IconFunction } from '../../infraestructure/components/icons/IconProps';

interface Routes {
    name: string;
    path: string;
    icon: IconFunction;
}

export const routes: Array<Routes> = [
    {
        name: 'Inicio',
        path: '/auth',
        icon: HomeIcon,
    },
    {
        name: 'Secciones',
        path: '/auth/sections',
        icon: SectionIcon,
    },
    {
        name: 'Preguntas',
        path: '/auth/questions',
        icon: QuestionIcon,
    },
    {
        name: 'Categorías',
        path: '/auth/categories',
        icon: CategoryIcon,
    },
    {
        name: 'Dominios',
        path: '/auth/domains',
        icon: BoxIcon,
    },
    {
        name: 'Dimensiones',
        path: '/auth/dimensions',
        icon: DimensionsIcon,
    }
]



