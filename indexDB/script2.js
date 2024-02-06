console.log("script2.js")
// Based on https://gist.github.com/JamesMessinger/a0d6389a5d0e3a24814b

let db, tx, store, index;

// Open (or create) the database
const open = window.indexedDB.open("myLocalDatabase", 1);

// Create the schema
open.onupgradeneeded = function() {
    db = open.result;
    store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
    //index = store.createIndex("NameIndex", ["name.last", "name.first"]);
};

open.onsuccess = function() {
    // Start a new transaction
    db = open.result;
    tx = db.transaction("MyObjectStore", "readwrite");
    store = tx.objectStore("MyObjectStore");
    //index = store.index("NameIndex");

    // Add some data
    store.put({id: 12345, name: {first: "John", last: "Doe"}, age: 42, created: new Date().getTime() });
    store.put({id: 67890, name: {first: "Bob", last: "Smith"}, age: 35, created: new Date().getTime() });
    store.put({id: 24680, name: {first: "Jane", last: "Smith"}, age: 36, created: new Date().getTime() });
    
    // Query the data
    let getJohn = store.get(12345);
    let getBob = store.get(67890);
    //let getBob = index.get(["Smith", "Bob"]);

    getJohn.onsuccess = function() {
        console.log(getJohn.result.name.first);  // => "John"
    };

    getBob.onsuccess = function() {
        console.log(getBob.result.name.first);   // => "Bob"
    };

    // Close the db when the transaction is done
    tx.oncomplete = function() {
        db.close();
    };
}

