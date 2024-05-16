import { Metadata } from "../types/metadata";

export function ApiPathOut(type: object): PropertyDecorator {
    return function(target: {[key: string]: any}, propertyKey: string | symbol) {
        const requestSchema = Reflect.getMetadata(Metadata.requestSchema, type);
        const properties = Reflect.getMetadata(Metadata.schemaProperty, target.constructor) || [];
        Reflect.defineMetadata(Metadata.schemaProperty, [...properties, propertyKey], target.constructor);

        if (typeof propertyKey === 'string' && target.constructor) {
            Object.getPrototypeOf(target.constructor)[propertyKey] = requestSchema;
        }
    }
}