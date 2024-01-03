import { useContext, useState } from 'react';
import { CategoryContext } from '../../infraestructure/context/category';
import { categoriesRepositories } from '../../infraestructure/repositories/categories.respository';
import { CreateCategoryDto } from '../../infraestructure/http/dto/categories';

export const categoriesService = () => {

    const { dispatch, categories } = useContext(CategoryContext);
    const [loading, setLoading] = useState(false);

    const startGetCategories = async (): Promise<void> => {
        setLoading(true);
        const categories = await categoriesRepositories.getCategories();
        typeof categories !== 'string' && dispatch({ type: 'CATEGORY - Start load categories', payload: categories });
        setLoading(false);
    }

    const startCreateCategory = async (createCategoryDto: CreateCategoryDto): Promise<void> => {
        setLoading(true);
        await categoriesRepositories.createCategory(createCategoryDto);
        setLoading(false);
    }

    return {
        loading,
        categories,
        startGetCategories,
        startCreateCategory,
    }
}
