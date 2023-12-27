import { userRepository } from '../../infraestructure/repositories/user.repository';

export const userService = {
    getUserInfo: () => userRepository.getUser(),
    
}