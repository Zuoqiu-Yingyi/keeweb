import { IoBrowserCache } from 'storage/io-browser-cache';
import { StorageBase } from 'storage/storage-base';
import { INDEXED_DB_MANES } from 'const/siyuan';

class StorageCache extends StorageBase {
    name = 'cache';
    enabled = IoBrowserCache.enabled;
    system = true;

    io = null;

    init() {
        super.init();
        this.io = new IoBrowserCache({
            cacheName: INDEXED_DB_MANES.files_cache,
            logger: this.logger
        });
    }

    save(id, opts, data, callback) {
        this.io.save(id, data, callback);
    }

    load(id, opts, callback) {
        this.io.load(id, callback);
    }

    remove(id, opts, callback) {
        this.io.remove(id, callback);
    }
}

export { StorageCache };
