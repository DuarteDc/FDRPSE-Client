import { http } from '../http/http';

import { Category, CategoryQualifications } from '../../domain/models';
import { CommonResponseDto } from '../http/dto/CommonResponseDto';
import { CategoriesWithQualificationDto, CateoriesResponseDto, CreateCategoryDto } from '../http/dto/categories';
import { errorAlert, succesAlert } from '../alert/alerts';

export const categoriesRepository = {

    getCategories: async (): Promise<Array<Category> | string> => {
        try {
            const { categories } = await http.get<CateoriesResponseDto>('/auth/categories');
            return categories.map(({ id, name, created_at, updated_at }) => new Category(id, name, created_at, updated_at));
        } catch (error) {
            return error as string;
        }
    },

    createCategory: async (createCategoryDto: CreateCategoryDto): Promise<CommonResponseDto> => {
        try {
            const { message } = await http.post<CommonResponseDto>('/auth/categories/create', createCategoryDto);
            succesAlert(message)
            return { message, success: true }
        } catch (error) {
            errorAlert(error as string);
            return { message: error as string, success: false }
        }
    },

    getCategoriesWithQualification: async (): Promise<Array<CategoryQualifications> | string> => {
        try {
            const { categories } = await http.get<CategoriesWithQualificationDto>('/auth/categories/with/qualification');
            return categories.map(({ id, name, created_at, qualification, updated_at }) => new CategoryQualifications(id, name, { ...qualification, veryHigh: qualification.very_hight }, created_at, updated_at));
        } catch (error) {
            return error as string;
        }
    }

}