

import { User } from '../../domain/models/User';
import { UserDto } from '../http/dto/user/UserDto';
import { http } from '../http/http';




export const userRepository = {
    getUser: async () => {
        const user = await http.get<UserDto>('http://localhost:8000/api/me');
        return new User(user!.id, user!.name, user!.last_name, user!.created_at, user!.updated_at);
    }
}