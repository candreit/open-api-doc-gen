import { generateRequestSchema } from "./generate-request-schema";

export function ApiDocRequestType(type: object): MethodDecorator {

    return function(target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
        generateRequestSchema(target, propertyKey, type, 'requestBody');
    }

}

