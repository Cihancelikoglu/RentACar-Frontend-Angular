import { Color } from "./color";
import { ResponseModel } from "./responseModel";

export interface ColorsResponseModel extends ResponseModel{
    data:Color[]
}