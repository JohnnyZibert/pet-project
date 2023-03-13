import { ResolveOptions } from 'webpack';
import { BuildOptions, BuildPaths } from './types/config';

export function buildResolvers(options: {
    mode: 'production' | 'development';
    port: number;
    apiUrl: string
    paths: BuildPaths;
    isDev: boolean }): ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true,
        modules: [options.paths.src, 'node_modules'],
        mainFiles: ['index'],
        alias: {},
    };
}
