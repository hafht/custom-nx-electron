import { GeneratorCallback, Tree } from '@nrwl/devkit';
import { Schema } from './schema';
export interface NormalizedSchema extends Schema {
    appProjectRoot: string;
    parsedTags: string[];
}
export declare function addLintingToApplication(tree: Tree, options: NormalizedSchema): Promise<GeneratorCallback>;
export declare function generator(tree: Tree, schema: Schema): Promise<GeneratorCallback>;
export default generator;
