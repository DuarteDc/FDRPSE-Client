import { http } from '../http/http';

import { CateoriesResponseDto } from '../http/dto/categories';
import { Category } from '../../domain/models';

export const categoriesRepositories = {

    getCategories: async (): Promise<Array<Category> | string> => {
        try {
            const { categories } = await http.get<CateoriesResponseDto>('/categories');
            return categories.map(({ id, name, created_at, updated_at }) => new Category(id, name, created_at, updated_at));
        } catch (error) {
            return error as string;
        }
    }
    
}