export interface UserDto {
  id: number;
  username: string;
  fullname?: string;
  dob: string;
  photo: string;
  roles: string[];
  access_token: string;
  refresh_token: string;
}
