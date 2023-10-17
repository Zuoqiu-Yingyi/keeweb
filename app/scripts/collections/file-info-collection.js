import { Collection } from 'framework/collection';
import { SettingsStore } from 'comp/settings/settings-store';
import { FileInfoModel } from 'models/file-info-model';
import { LOCAL_STORAGE_KEYS } from 'const/siyuan';

class FileInfoCollection extends Collection {
    static model = FileInfoModel;

    load() {
        return SettingsStore.load(LOCAL_STORAGE_KEYS.file_info).then((data) => {
            if (data) {
                for (const item of data) {
                    this.push(new FileInfoModel(item));
                }
            }
        });
    }

    save() {
        SettingsStore.save(LOCAL_STORAGE_KEYS.file_info, this);
    }

    getMatch(storage, name, path) {
        return this.find((fi) => {
            return (
                (fi.storage || '') === (storage || '') &&
                (fi.name || '') === (name || '') &&
                (fi.path || '') === (path || '')
            );
        });
    }

    getByName(name) {
        return this.find((file) => file.name.toLowerCase() === name.toLowerCase());
    }
}

const instance = new FileInfoCollection();

export { instance as FileInfoCollection };
