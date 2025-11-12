export function getProdOrDevSuffix() {
    return process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
}