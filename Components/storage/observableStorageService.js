import AsyncStorage from "@react-native-async-storage/async-storage";


let observerList = []
export const registerObserver = (name, observer) => {
  observerList.push({name, observer})
}
export const unregisterObserver = (name) => {
  observerList = observerList.filter(o => o.name === name)
}
const informObservers = (data) => {
  observerList.forEach(o => o.observer(data))
}

// ------------

export const getItem = (name, callback) => {
  AsyncStorage.getItem(name)
    .then(data => callback(JSON.parse(data)))
    .catch(error => callback(null, error))
}


export const setItem = (name, value) => {
  value= JSON.stringify(value)
  AsyncStorage.setItem(name, value)
    .then(() => informObservers(value))
    .catch(error => console.log("setItem", error))
}


export const clearItem = (name) => {
  AsyncStorage.removeItem(name)
    .then(() => informObservers(""))
    .catch(error => console.log("clearItem", error))
}
