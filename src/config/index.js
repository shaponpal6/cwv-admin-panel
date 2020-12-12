import config2 from './config.json'
import baseConfig from './baseConfig.json'
// import { isExists } from 'date-fns'

console.log('baseConfig', baseConfig)
console.log('config', config2)
const config = Object.freeze(Object.assign({}, baseConfig, config2));

export default config;

export function isExist(key){
    return !!(config.hasOwnProperty(key) && config[key]);
}
export function getConfig(key, def=false){
    if(isExist(key)) return config[key];
    return !!def;
}