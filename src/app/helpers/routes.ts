import { HomeIcon, QuestionIcon, CategoryIcon, BoxIcon, DimensionsIcon, SectionIcon, FileDescription } from '../../infraestructure/components/icons';
import { IconFunction } from '../../infraestructure/components/icons/IconProps';

export interface Routes {
    name: string;
    path: string;
    icon: IconFunction;
    subroutes?: Array<Routes>;
}

export const routes: Array<Routes> = [
    {
        name: 'Inicio',
        path: '/auth',
        icon: HomeIcon,
    },
    {
        name: 'Cuestionarios',
        path: '/auth/surveys',
        icon: FileDescription
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
        subroutes: [
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
    },
]



