import { PropertySchema } from "./api-doc-property";
import { Metadata } from "../types/metadata";

export type SchemaComponent = {
    type?: 'object',
    properties?: {
        [key: string]: PropertySchema
    }
}

export function ApiSchema(target: {[key: string]: any}) {
    const properties = Reflect.getMetadata(Metadata.propertySchemaStorage, target);
    let schema: SchemaComponent = {}

    if (!properties?.length) {
        Reflect.defineMetadata(Metadata.schema, schema, target);
        return;
    } 
    
    for (const property of properties) {
        const propertySchema = Reflect.getMetadata(Metadata.schemaProperty, target, property);
        schema = {
            ...schema,
            properties: {
                ...schema.properties,
                [property]: {
                    ...propertySchema
                }
            }
        }
    }

    Reflect.defineMetadata(Metadata.schema, schema, target);
}
