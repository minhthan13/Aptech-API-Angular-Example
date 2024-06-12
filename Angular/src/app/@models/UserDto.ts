import { RoleDto } from './RoleDto';

export interface UserDto {
  id: number;
  username: string;
  fullName?: string;
  dob: string;
  photo: string;
  roles?: RoleDto[];
  access_token: string;
  refresh_token: string;
  password?: string;
}
