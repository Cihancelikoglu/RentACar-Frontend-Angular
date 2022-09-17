import { Customer } from "./customer";
import { ResponseModel } from "./responseModel";

export interface CustomersResponseModel extends ResponseModel{
    data:Customer[]
}