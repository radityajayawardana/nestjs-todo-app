import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class todoDTO {
  @IsString()
  @IsNotEmpty()
  public nama: string;

  @IsNumber()
  @IsNotEmpty()
  public nomor: number;

  @IsString()
  @IsNotEmpty()
  public kelas: string;
}
