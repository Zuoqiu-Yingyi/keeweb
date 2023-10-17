import { Model } from 'framework/model';
import { SettingsStore } from 'comp/settings/settings-store';
import { DefaultAppSettings } from 'const/default-app-settings';
import { LOCAL_STORAGE_KEYS } from 'const/siyuan';

class AppSettingsModel extends Model {
    constructor() {
        super();
        this.on('change', () => this.save());
    }

    load() {
        return SettingsStore.load(LOCAL_STORAGE_KEYS.app_settings).then((data) => {
            if (data) {
                this.upgrade(data);
                this.set(data, { silent: true });
            }
        });
    }

    upgrade(data) {
        if (data.rememberKeyFiles === true) {
            data.rememberKeyFiles = 'data';
        }
        if (data.locale === 'en') {
            data.locale = 'en-US';
        }
        if (data.theme === 'macdark') {
            data.theme = 'dark';
        }
        if (data.theme === 'wh') {
            data.theme = 'light';
        }
    }

    save() {
        const values = {};
        for (const [key, value] of Object.entries(this)) {
            if (DefaultAppSettings[key] !== value) {
                values[key] = value;
            }
        }
        SettingsStore.save(LOCAL_STORAGE_KEYS.app_settings, values);
    }
}

AppSettingsModel.defineModelProperties(DefaultAppSettings, { extensions: true });

const instance = new AppSettingsModel();

export { instance as AppSettingsModel };
