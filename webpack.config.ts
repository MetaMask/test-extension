import CopyPlugin from 'copy-webpack-plugin';
import path from 'node:path';
import { ProvidePlugin, type Configuration } from 'webpack';

const config = {
  entry: {
    background: './src/background.ts',
    main: './src/main.ts',
    'service-worker': './src/service-worker.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/u,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, 'tsconfig.build.json'),
          },
        },
        exclude: /node_modules/u,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public', to: path.resolve(__dirname, 'dist') }],
    }),
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
  ],
  output: {
    clean: true,
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      buffer: require.resolve('buffer/'),
    },
  },
} as const satisfies Configuration;

export default config;
