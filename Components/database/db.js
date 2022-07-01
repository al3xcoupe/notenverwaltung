import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { ref, onValue, push, remove, get } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyDL3Ytm6r_4SsmwY2hQXKCFVbhDk1lrZ5I",
    authDomain: "notenverwaltung-b88f2.firebaseapp.com",
    databaseURL: "https://notenverwaltung-b88f2-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "notenverwaltung-b88f2",
    storageBucket: "notenverwaltung-b88f2.appspot.com",
    messagingSenderId: "416437837989",
    appId: "1:416437837989:web:d5b49547d9ad9dcab96d4c"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

// Expenses Observer -------
// Der Lesezugriff erfolgt auf dem Observer der auf den Listener von Firebase reagiert
let observerList = []

export const pathes = {
    noten: 'noten',
    semester: 'semester',
    fach: 'fach'
}

export const registerObserver = (path, name, observer) => {
    observerList.push({path, name, observer})
}
export const unregisterObserver = (path, name) => {
    observerList = observerList.filter(o => o.name === name)
}
const informObservers = (path, data) => {
    observerList.filter(data => data.path === path).forEach(o => o.observer(data))
}
// -------


onValue(ref(db, "/noten"), (querySnapShot) => {
    //let data = querySnapShot.val() || [];
    // Firebase liefert eine Liste von Objekten aber kein Array.
    // Der Einfachheitshalber wird die Liste hier zu einem Array umgewandelt.
    let tmpArray = []
    querySnapShot.forEach(child => { tmpArray.push( { key:child.key, val: child.val() }) })
    console.log(tmpArray)
    informObservers(pathes.noten, tmpArray);
})

onValue(ref(db, "/semester"), (querySnapShot) => {
    //let data = querySnapShot.val() || [];
    // Firebase liefert eine Liste von Objekten aber kein Array.
    // Der Einfachheitshalber wird die Liste hier zu einem Array umgewandelt.
    let tmpArray = []
    querySnapShot.forEach(child => { tmpArray.push( { key:child.key, val: child.val() }) })
    console.log(tmpArray)
    informObservers(pathes.semester, tmpArray)
})

onValue(ref(db, "/fach"), (querySnapShot) => {
    //let data = querySnapShot.val() || [];
    // Firebase liefert eine Liste von Objekten aber kein Array.
    // Der Einfachheitshalber wird die Liste hier zu einem Array umgewandelt.
    let tmpArray = []
    querySnapShot.forEach(child => { tmpArray.push( { key:child.key, val: child.val() }) })
    console.log(tmpArray)
    informObservers(pathes.fach, tmpArray)
})



export const addSemester = (semester) => {
    push(ref(db, '/semester'), semester)
        .then(r => console.log(r))
}


export const addMark = (test) => {
    push(ref(db, '/noten'), test)
        .then(r => console.log(r))
}

export const addFach = (subject) => {
    push(ref(db, '/subject'), subject)
        .then(r => console.log(r))
}



export const delExpense = (test) => {
    remove(ref(db, '/noten/'+ test.key))
        .then(r => console.log("delExpense", r))
}

export const deleteSemester = (semester) => {
    remove(ref(db, '/semester/'+ semester.key))
        .then(r => console.log("delSemester", r))
}

export const getSemester = (callback) => {
    get(ref(db, '/semester'))
        .then(r => {
            //console.log("r" , r)
            let tmpArray = []
            r.forEach(child => { tmpArray.push( { key:child.key, val: child.val() }) })
            callback(tmpArray)

        })
}

export const getSubject = (callback) => {
    get(ref(db, '/subject'))
        .then(r => {
            console.log("subject" , r)

            let tmpArray = []
            r.forEach(child => { tmpArray.push( { key:child.key, val: child.val() }) })
            callback(tmpArray)

        })
}

export const getNoten = (callback) => {
    get(ref(db, '/noten'))
        .then(r => {
            console.log("noten" , r)

            let tmpArray = []
            r.forEach(child => { tmpArray.push( { key:child.key, val: child.val() }) })
            callback(tmpArray)

        })
}

