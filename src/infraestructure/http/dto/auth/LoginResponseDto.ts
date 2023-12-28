import { UserDto } from '../user/UserDto';

export interface LoginResponseDto {
    user        : UserDto;
    session     : string;
}