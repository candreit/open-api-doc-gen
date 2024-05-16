import { HttpStatusCodes } from "../types/http-status-codes";
import { Metadata } from "../types/metadata";

type RequestOrResponse = 'requestBody' | 'responses';

export const generateRequestSchema = (target: object, propertyKey: string | symbol, type: object, requestOrResponse: RequestOrResponse, statusCode?: HttpStatusCodes) => {
    const hasPath = Reflect.hasMetadata(Metadata.path, target.constructor, propertyKey);
    const hasMethod = Reflect.hasMetadata(Metadata.method, target.constructor, propertyKey);
    const hasEndpoint = Reflect.hasMetadata(Metadata.endpoint, target.constructor, propertyKey);

    if (!hasPath || !hasMethod) {
        throw new Error('ApiDocRequestType decorator must be used before ApiDocAction decorator');
    }

    const path = Reflect.getMetadata(Metadata.path, target.constructor, propertyKey);
    const method = Reflect.getMetadata(Metadata.method, target.constructor, propertyKey);
    const endpoint = Reflect.getMetadata(Metadata.endpoint, target.constructor, propertyKey);
    const schema = Reflect.getMetadata(Metadata.schema, type);
    const existingSchema = Reflect.getMetadata(Metadata.requestSchema, target.constructor) || {};
    const lowerCaseMethod = method.toLowerCase();
    const body = {
        content: {
            'application/json': {

                // TODO: Deep clone here
                schema: {
                    ...JSON.parse(JSON.stringify(schema)),
                    // ...schema,
                }
            }
        }
    }

    let completeSchema = {
        ...existingSchema,
        [endpoint]: {
            ...existingSchema[endpoint],
            [lowerCaseMethod]: {
                ...existingSchema[endpoint]?.[lowerCaseMethod],
                [requestOrResponse]: {
                    ...body
                },
            }
        }
    }

    if (requestOrResponse === 'responses' && statusCode) {
        completeSchema = {
            ...existingSchema,
            [endpoint]: {
                ...existingSchema[endpoint],
                [lowerCaseMethod]: {
                    ...existingSchema[endpoint]?.[lowerCaseMethod],
                    [requestOrResponse]: {
                        ...existingSchema[endpoint]?.[lowerCaseMethod]?.[requestOrResponse],
                        [statusCode]: {
                            description: 'Successful response',
                            ...body
                        }
                    },
                }
            }
        }
    }


    Reflect.defineMetadata(Metadata.requestSchema, completeSchema, target.constructor)
}
