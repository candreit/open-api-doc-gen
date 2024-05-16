import { Methods } from "../types/methods";
import { Metadata } from "./metadata";

export function ApiDocAction(method: Methods, endpoint: string): MethodDecorator {

    // TODO add check for slash / in endpoint
    return function(target, propertyKey, propertyDescriptor) {
        Reflect.defineMetadata(Metadata.method, method, target.constructor, propertyKey);
        Reflect.defineMetadata(Metadata.endpoint, endpoint, target.constructor, propertyKey);
        const path = Reflect.getMetadata(Metadata.path, target.constructor, propertyKey) || {};
        Reflect.defineMetadata(Metadata.path, {
            ...path?.[endpoint],
            [method]: {}
        }, target.constructor, propertyKey);
    }
}

export function ApiGetAction(endpoint: string): MethodDecorator;
export function ApiGetAction<T>(endpoint: string): MethodDecorator { 
    return ApiDocAction(Methods.GET, endpoint);
}