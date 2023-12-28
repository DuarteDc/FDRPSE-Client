import { http } from '../http/http';
import { storage } from '../local-storage/localStorage';

import { LoginRequestDto, LoginResponseDto } from '../http/dto/auth';
import { User } from '../../domain/models/User';

export const authRepository = {
    signin: async (data: LoginRequestDto): Promise<User | undefined> => {
        try {
            const { user, session } = await http.post<LoginResponseDto>('/signin', data);
            storage.set('session', session);
            return new User(user!.id, user!.name, user!.last_name, user!.created_at, user!.updated_at);
        } catch (error) {
            alert(error as string);
        }
    }
}