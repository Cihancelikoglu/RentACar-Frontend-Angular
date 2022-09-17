import { CarDetailDto } from "./carDetailDto";
import { ResponseModel } from "./responseModel";

export interface CarsResponseModel extends ResponseModel{
    data:CarDetailDto[]
}