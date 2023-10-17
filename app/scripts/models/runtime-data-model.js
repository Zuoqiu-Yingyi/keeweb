import { Model } from 'framework/model';
import { SettingsStore } from 'comp/settings/settings-store';
import { LOCAL_STORAGE_KEYS } from 'const/siyuan';

class RuntimeDataModel extends Model {
    constructor() {
        super();
        this.on('change', () => this.save());
    }

    load() {
        return SettingsStore.load(LOCAL_STORAGE_KEYS.runtime_data).then((data) => {
            if (data) {
                this.set(data, { silent: true });
            }
        });
    }

    save() {
        SettingsStore.save(LOCAL_STORAGE_KEYS.runtime_data, this);
    }
}

RuntimeDataModel.defineModelProperties({}, { extensions: true });

const instance = new RuntimeDataModel();
window.RuntimeDataModel = instance;

export { instance as RuntimeDataModel };
