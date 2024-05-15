import { Metadata } from "./metadata";

export function ApiEnum(data: object): PropertyDecorator {
    return function(target: object, propertyKey: string | symbol) {
        const propertySchema = Reflect.getMetadata(Metadata.schemaProperty, target.constructor, propertyKey);
        Reflect.defineMetadata(Metadata.schemaProperty, {
            ...propertySchema,
            // enum: data
        }, target.constructor, propertyKey);
    }
}