import { useContext, useState } from 'react';
import { CategoryContext } from '../../infraestructure/context/category';
import { categoriesRepositories } from '../../infraestructure/repositories/categories.respository';

export const categoriesService = () => {

    const { dispatch, categories } = useContext(CategoryContext);
    const [loading, setLoading] = useState(false);

    const startGetCategories = async (): Promise<void> => {
        setLoading(prev => !prev);
        const categories = await categoriesRepositories.getCategories();
        typeof categories !== 'string' && dispatch({ type: 'CATEGORY - Start load categories', payload: categories });
        setLoading(prev => !prev);
    }

    return {
        startGetCategories,
        loading,
        categories,
    }
}
