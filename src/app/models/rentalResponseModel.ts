import { RentalDetailDto } from "./rentalDetailDto";
import { ResponseModel } from "./responseModel";

export interface RentalsResponseModel extends ResponseModel{
    data:RentalDetailDto[]
}