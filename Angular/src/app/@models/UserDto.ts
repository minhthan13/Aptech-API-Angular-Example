export interface UserDto {
  id: number;
  username: string;
  fullName?: string;
  dob: string;
  photo: string;
  roles: string[];
  access_token: string;
  refresh_token: string;
}
