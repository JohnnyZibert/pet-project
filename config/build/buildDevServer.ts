import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildPaths } from './types/config';

export function buildDevServer(options: { mode: 'production' | 'development';
    port: number
    ; paths: BuildPaths;
    isDev: boolean }):
    DevServerConfiguration {
    return {
        port: options.port,
        open: true,
        historyApiFallback: true,
        hot: true,
    };
}
