const useLocalStorage = true;

class LocalStorageProvider {
    constructor() {
    }

    add(key, value) {
        let existingObjects = [];
        provider.get(key, (data) => {
            if(data) {
                existingObjects = data;
            }
        });
        existingObjects.push(value);
        existingObjects = JSON.stringify(existingObjects);
        localStorage.setItem(key, existingObjects);
    }

    get(key, callback) {
        callback(JSON.parse(localStorage.getItem(key)));
    }

    remove(key) {
        localStorage.removeItem(key);
    }
}

class IndexedDBProvider {

    constructor() {
        this._request = indexedDB.open("DB", 1);

        this._request.onerror = () => {
            console.error("Error", this._request.error);
        };

        this._request.onsuccess = () => {
            console.log("Success!");
            this._db = this._request.result;
        };

        this._request.onupgradeneeded = () => {
            console.log("Upgrading...");
            this._db = this._request.result;
            this._db.createObjectStore("appeals", {keyPath: "id", autoIncrement: true});
            this._db.createObjectStore("news", {keyPath: "id", autoIncrement: true});
        };
    }

    add(key, value) {
        if (this._db) {
            console.log("ADD executed");
            let transaction = this._db.transaction(key, "readwrite");
            let objStore = transaction.objectStore(key);

            objStore.add(value);
        }
    }

    get(key, callback) {
        if (this._db) {
            console.log("GET executed");
            let transaction = this._db.transaction(key, "readwrite");
            let objStore = transaction.objectStore(key);
            let request = objStore.getAll();

            request.onsuccess = function () {
                callback(request.result);
            };
        }
    }

    remove(key) {
        if (this._db) {
            console.log("REMOVE executed");
            let transaction = this._db.transaction(key, "readwrite");
            let objStore = transaction.objectStore(key);
            objStore.clear();
        }
    }
}

class Provider {
    constructor() {
        this._provider = useLocalStorage ? new LocalStorageProvider() : new IndexedDBProvider();
    }

    get provider() {
        return this._provider;
    }
}

function isOnline() {
    return window.navigator.onLine;
}

const provider = new Provider().provider;
