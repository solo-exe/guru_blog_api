import {
    IsNotEmpty,
    IsEmail,
    IsString,
} from 'class-validator';

export class LoginDTO {
    @IsNotEmpty()
    @IsEmail()
    email?: string;

    @IsNotEmpty()
    @IsString()
    password?: string;
}

export class RegisterDTO {
    @IsNotEmpty()
    @IsEmail()
    email?: string;

    @IsNotEmpty()
    @IsString()
    password?: string;

    @IsNotEmpty()
    @IsString()
    first_name?: string;

    @IsNotEmpty()
    @IsString()
    last_name?: string;
}

export class DeleteAccountDTO {
    @IsNotEmpty()
    @IsString()
    password?: string;
}

