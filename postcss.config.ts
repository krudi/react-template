import { type Config } from 'postcss-load-config';

const config: Config = {
    plugins: {
        'postcss-import': {},
        'postcss-nested': {},
        autoprefixer: {}
    }
};

export default config;
