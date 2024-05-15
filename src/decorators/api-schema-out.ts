import { Metadata } from "./metadata"

export function ApiSchemaOut(baseConfig: {[key: string]: any}): ClassDecorator {

    return function(target: {[key: string]: any}) {

        const paths = Reflect.getMetadata(Metadata.schemaProperty, target);
        baseConfig.paths = {};

        for(const path of paths) {
            baseConfig.paths = {
                ...baseConfig.paths,
                ...target[path],
            }

        }

        target.definition = baseConfig;
    }
}
