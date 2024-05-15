import { generateRequestSchema } from "./generate-request-schema";
import { HttpStatusCodes } from "./http-status-code";

export function ApiDocResponseType(type: object, code: HttpStatusCodes): MethodDecorator {

    return function(target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
        generateRequestSchema(target, propertyKey, type, 'responses', code);
    }

}

