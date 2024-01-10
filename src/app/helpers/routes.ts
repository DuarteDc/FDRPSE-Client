import { createHashRouter } from 'react-router-dom';
import { FormCategory } from '../../infraestructure/components/categories';
import { FormDimension } from '../../infraestructure/components/dimensions';
import { HomeIcon, QuestionIcon, FileDescription, CategoryIcon, BoxIcon, DimensionsIcon } from '../../infraestructure/components/icons';

import { IconFunction } from '../../infraestructure/components/icons/IconProps';
import { FormQuestion } from '../../infraestructure/components/questions';

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
    }
]



export const CREATE_QUESTION_ROUTES = [
    {
        name: 'create',
        path: '',
        component: DimensionsIcon
    },
    {
        name: 'addQualification',
        path: '#/add-qualification',
        component: BoxIcon
    },
    {
        name: 'addSubQuestion',
        path: '#add-subquestion',
        component: CategoryIcon
    },
]
