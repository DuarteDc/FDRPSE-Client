import { http } from '../http/http';
import { Qualification } from '../../domain/models';
import { QualificationsResponseDto } from '../http/dto/qualifications';

export const qualificationRepository = {
    getQualifications: async (): Promise<Array<Qualification> | string> => {
        try {
            const { qualifications } = await http.get<QualificationsResponseDto>('/auth/qualifications');
            return qualifications.map(({ id, name, always_op, almost_alwyas_op, sometimes_op, almost_never_op, never_op, created_at, updated_at }) => new Qualification(id, name, always_op, almost_alwyas_op, sometimes_op, almost_never_op, never_op, created_at, updated_at));
        } catch (error) {
            return error as string;
        }
    },
}