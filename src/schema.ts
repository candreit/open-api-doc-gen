import "reflect-metadata";
import { readFileSync, writeFileSync } from "fs";
import { BonusCashController, RewardBoxController } from ".";
import { ApiPathOut } from "./decorators/api-path-out";
import { ApiSchemaOut } from "./decorators/api-schema-out";
import { parse, stringify } from "yaml";

const yaml = readFileSync('api.yaml', 'utf8');

const json = parse(yaml)


@ApiSchemaOut(json)
export class Schema {

    public static readonly definition?: {};

    @ApiPathOut(RewardBoxController)
    public readonly rewardBoxController?: {};

    @ApiPathOut(BonusCashController)
    public readonly bonusCashController?: {};

}

const schema = new Schema();

const generatedYAML = stringify(Schema.definition);
writeFileSync('generated-schema.yaml', generatedYAML);