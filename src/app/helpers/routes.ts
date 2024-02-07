import { HomeIcon, QuestionIcon, FileDescription, CategoryIcon, BoxIcon, DimensionsIcon, SectionIcon } from '../../infraestructure/components/icons';
import { IconFunction } from '../../infraestructure/components/icons/IconProps';

interface Routes {
    name: string;
    path: string;
    icon: IconFunction;
}

export const routes: Array<Routes> = [
    {
        name: 'Inicio',
        path: '/admin',
        icon: HomeIcon,
    },
    {
        name: 'Encuestas',
        path: '/admin/suveries',
        icon: FileDescription,
    },
    {
        name: 'Secciones',
        path: '/admin/sections',
        icon: SectionIcon,
    },
    {
        name: 'Preguntas',
        path: '/admin/questions',
        icon: QuestionIcon,
    },
    {
        name: 'Categorías',
        path: '/admin/categories',
        icon: CategoryIcon,
    },
    {
        name: 'Dominios',
        path: '/admin/domains',
        icon: BoxIcon,
    },
    {
        name: 'Dimensiones',
        path: '/admin/dimensions',
        icon: DimensionsIcon,
    },
    {
        name: 'Dimensiones',
        path: '/admin/user-questions',
        icon: DimensionsIcon,
    }
]



