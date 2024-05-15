import "reflect-metadata";
import { ApiDocAction } from "./decorators/api-doc-action";
import { Methods } from "./types/methods";
import { ApiDocRequestType } from "./decorators/api-doc-request-type";
import { ApiDocProperty } from "./decorators/api-doc-property";
import { ApiSchema } from "./decorators/api-schema";
import { PropertyTypes } from "./decorators/property-types";
import { ApiEnum } from "./decorators/api-enum";
import { Metadata } from "./decorators/metadata";
import { ApiDocResponseType } from "./decorators/api-doc-response-type";
import { HttpStatusCodes } from "./decorators/http-status-code";

@ApiSchema
class User {
    @ApiDocProperty(PropertyTypes.string, "andrei")
    userId: string = '';

}

@ApiSchema
class Wallet {

    @ApiDocProperty(PropertyTypes.integer, 100)
    balance: number = 0;

    @ApiDocProperty(PropertyTypes.string, "USD")
    currency: string = 'USD';

    @ApiDocProperty(User)
    user?: User;
} 

@ApiSchema
class RewardBoxDto {

    @ApiDocProperty(PropertyTypes.integer, 10)
    attemptId?: number;

    @ApiDocProperty(PropertyTypes.string, "1023423")
    createdAt: string = ''

    @ApiDocProperty(Wallet)
    wallet?: Wallet;
}

@ApiSchema
class Result {
    @ApiDocProperty(PropertyTypes.string, "hello")
    hello: string = '';
}

export class RewardBoxController {
    @ApiDocResponseType(Result, HttpStatusCodes.OK)
    @ApiDocRequestType(RewardBoxDto)
    @ApiDocAction(Methods.POST, '/reward-box/redeem')
    getRewardBox() {
    }
}

export class BonusCashController {

    @ApiDocResponseType(Result, HttpStatusCodes.OK)
    @ApiDocRequestType(User)
    @ApiDocAction(Methods.POST, '/bonus-cash')
    getBonusCash() {}

}