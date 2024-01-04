import { http } from '../http/http';

import { Category } from '../../domain/models';
import { CateoriesResponseDto, CommonResponseDto, CreateCategoryDto } from '../http/dto/categories';

export const categoriesRepository = {

    getCategories: async (): Promise<Array<Category> | string> => {
        try {
            const { categories } = await http.get<CateoriesResponseDto>('/categories');
            return categories.map(({ id, name, created_at, updated_at }) => new Category(id, name, created_at, updated_at));
        } catch (error) {
            return error as string;
        }
    },

    createCategory: async (createCategoryDto: CreateCategoryDto): Promise<CommonResponseDto> => {
        try {
            const { message } = await http.post<CommonResponseDto>('/categories', createCategoryDto);
            return { message, success: true }
        } catch (error) {
             return { message: error as string, success: false }
        }
    }

}