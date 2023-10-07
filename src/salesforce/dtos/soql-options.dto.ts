import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class SoqlOptionsDto {
  @IsString()
  @IsNotEmpty()
  from: string;

  @IsArray()
  @IsNotEmpty()
  fields: Array<string>;

  where?: string;
}
