import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class ParamIdDTO {
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    id: number;
}