import { Metadata } from "./metadata";
import { PropertyTypes } from "./property-types";

export type PropertySchema = {
    type: PropertyTypes;
    format: string;
    example?: any;
}

export function ApiDocProperty(type: []): PropertyDecorator;
export function ApiDocProperty(type: object): PropertyDecorator;
export function ApiDocProperty(type: PropertyTypes, example?: any): PropertyDecorator;
export function ApiDocProperty(type: PropertyTypes | object | [], example?: any): PropertyDecorator {
    return function(target: object, propertyKey: string | symbol) {
        const definedProperties = Reflect.getMetadata(Metadata.propertySchemaStorage, target.constructor) || [];
        Reflect.defineMetadata(Metadata.propertySchemaStorage, [...definedProperties, propertyKey], target.constructor);
    
        if (typeof type === 'function') {
            const properties = Reflect.getMetadata(Metadata.schema, type);

            if (!properties) {
                throw new Error('ApiDocProperty type must be a primitive type or a class with ApiSchema decorator');
            }

            const data = {
                type: "object",
                ...properties,
            }

            Reflect.defineMetadata(Metadata.schemaProperty, data, target.constructor, propertyKey);

            return;
        }

        const data = { 
            type: `${type}`,
            format: 'int64',
        };

        Reflect.defineMetadata(Metadata.schemaProperty, data, target.constructor, propertyKey);
    }
}
