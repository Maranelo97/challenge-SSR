import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AcountDTO {

    @IsNotEmpty()
    @IsString()
    currency: string

    @IsNotEmpty()
    @IsNumber()
    capital: number

} 

export class AcountUpdateDTO {

    @IsOptional()
    @IsString()
    currency: string

    @IsOptional()
    @IsString()
    capital: number
}