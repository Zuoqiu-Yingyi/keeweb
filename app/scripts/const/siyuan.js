import { StringFormat } from 'util/formatting/string-format';

/* 移除字符串前缀 */
export function trimPrefix(str, prefix) {
    return str.startsWith(prefix) ? str.slice(prefix.length) : str;
}

/* 移除字符串后缀 */
export function trimSuffix(str, suffix) {
    return str.endsWith(suffix) ? str.slice(0, -suffix.length) : str;
}

/* 是否为思源插件 */
export function isSiyuan() {
    return globalThis.location.pathname.includes('/plugins/keepass/keeweb/app/');
}

/* 重定向插件资源 URL */
export function redirectPluginURL(url) {
    if (FLAG_SIYUAN && url.startsWith(DEFAULT_PLUGIN_BASE_URL)) {
        return `${PLUGIN_BASE_URL}${trimPrefix(url, DEFAULT_PLUGIN_BASE_URL)}`;
    }
    else {
        return url;
    }
}

/* 是否为思源环境 */
export const FLAG_SIYUAN = isSiyuan();
export const FLAG_SIYUAN_IFRAME = FLAG_SIYUAN
    && globalThis.top !== globalThis
    && !!globalThis.parent.siyuan;

/* 插件加载 URL */
export const DEFAULT_PLUGIN_BASE_URL = 'https://plugins.keeweb.info';
export const PLUGIN_BASE_URL = FLAG_SIYUAN
    ? globalThis.location.pathname.replace(/(?<=\/plugins\/keepass\/keeweb)\/.*$/, '/plugins')
    : DEFAULT_PLUGIN_BASE_URL;

/* localStorage 键名 */
export const DEFAULT_LOCAL_STORAGE_KEYS = {
    app_settings: 'app-settings',
    file_info: 'file-info',
    plugin_gallery: 'plugin-gallery',
    plugins: 'plugins',
    runtime_data: 'runtime-data',
    update_info: 'update-info',
};
export const LOCAL_STORAGE_KEYS = (() => {
    const keys = {};

    if (FLAG_SIYUAN) {
        for (const [key, value] of Object.entries(DEFAULT_LOCAL_STORAGE_KEYS)) {
            keys[key] = `plugin-keepass-${value}`;
        }
    }
    else {
        for (const [key, value] of Object.entries(DEFAULT_LOCAL_STORAGE_KEYS)) {
            keys[key] = StringFormat.camelCase(value);
        }
    }

    return keys;
})();

/* indexedDB 数据库名 */
export const DEFAULT_INDEXED_DB_MANES = {
    files_cache: 'files-cache',
    plugin_files: 'plugin-files',
};
export const INDEXED_DB_MANES = (() => {
    const keys = {};

    for (const [key, value] of Object.entries(DEFAULT_INDEXED_DB_MANES)) {
        keys[key] = StringFormat.pascalCase(value);
    }

    return keys;
})();
