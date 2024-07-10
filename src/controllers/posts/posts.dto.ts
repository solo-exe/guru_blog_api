import {
    IsNotEmpty,
    IsEmail,
    IsString,
    IsOptional,
} from 'class-validator';

export class CreatePostDTO {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    body: string;
}

export class UpdatePostDTO {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    body?: string;
}