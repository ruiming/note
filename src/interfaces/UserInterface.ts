import { IsEmail, IsString } from 'class-validator'
import { PartialUser } from '../entities'

export class RegisterInterface implements PartialUser {
  @IsString() name: string
  @IsEmail() email: string
  @IsString() password: string
}

export class LoginInterface implements PartialUser {
  @IsString() email: string
  @IsString() password: string
}
