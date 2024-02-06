let db, store;
const request = window.indexedDB.open( 'myDatabase', 1);

request.onupgradeneeded = () => {
    console.error("Upgrade needed");
    db = request.result;
    store = db.createObjectStore("myObjectStore", {keyPath: "id"});
}

request.onsuccess = () => {
    console.log("Database made");
    db = request.result;
    let tx = db.transaction("myObjectStore", "readwrite");
    store = tx.objectStore("myObjectStore");
    store.put({"id": 42, "answer": "Everything"});
    store.put({"id": 13, "answer": "Nothing"});
    db.close();
};
request.onerror = () => {
    console.error("Error occurred while saving data");
};
