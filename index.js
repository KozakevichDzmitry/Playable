class IndexedMap {
    _keys = [];
    _values = [];

    set(key, value) {
        if (this._keys.includes(key)) {
            let indexKey = this.getIndexKey(key);
            this._values[indexKey] = value;
        } else {
            this._keys.push(key)
            this._values.push(value)
        }
        return this
    }

    setTo(index, value) {
        const key = (new Date()).getTime() + Math.floor((Math.random() * 10000));
        if(index>=this._values.length){
            this._keys[index + 1] = key;
            this._values[index + 1] =  value;
        }else{
            this._keys.splice(index + 1, 0, key)
            this._values.splice(index + 1, 0, value)
        }


        return this
    }

    get(key) {
        if (this._keys.includes(key)) {
            let indexKey = this.getIndexKey(key);
            return this._values[indexKey];
        } else return null
    }

    has(key) {
        return this._keys.includes(key);
    }

    hasIndex(index) {
        return this._keys.length > index && index >= 0;
    }

    getByIndex(index) {
        if (this._keys.length > index && index >= 0) return this._values[index];
        else return null;
    }

    remove(key) {
        if (this._keys.includes(key)) {
            let indexKey = this.getIndexKey(key);
            let remoteKey = this._keys.splice(indexKey, 1)
            let remoteValue = this._values.splice(indexKey, 1)
        }
        return this
    }

    removeAt(index, count = 1) {
        let remoteKey = this._keys.splice(index, count)
        let remoteValue = this._values.splice(index, count)
        return this
    }

    size() {
        return 0;
    }

    union() {
        [...arguments].forEach(arg => {
            this.set(arg[0], arg[1])
        })
        return this;
    }

    uniq() {
        let result = [];

        for (let value of this._values) {
            if (!result.includes(value)) {
                result.push(value);
            }
        }
        return result
    }

    forEach(callback, thisArg) {
        let self = this;
        if (arguments.length > 1) {
            self = thisArg;
        }
        if (typeof callback !== "function") {
            throw new Error("Callback is not a function");
        }
        let obj = Object(self._values)
        let length = obj.length;

        for (let i = 0; i < length; i++) {
            if (i in obj) {
                callback.call(self, obj[i], i, obj);
            }
        }

        return this
    }


    [Symbol.iterator]() {
        let nextIndex = 0;
        let self = this;
        return {
            next: function () {
                return nextIndex < self._values.length ?
                    {value: [self._keys[nextIndex], self._values[nextIndex++]], done: false} :
                    {done: true};
            }
        }
    }

    getIndexKey(key) {
        let indexKey = this._keys.indexOf(key);
        if (indexKey === -1) indexKey = this._keys.findIndex(e => e !== e); //If elem not even your self, that is Nan
        return indexKey
    }
}

const indexedMap = new IndexedMap()
let obj = {}
let arr = []
indexedMap.set('a', 1)
indexedMap.set(NaN, 2)
indexedMap.set(undefined, 3)
indexedMap.set(obj, 4)
indexedMap.set(arr, 5)
indexedMap.set(null, 6)
indexedMap.set(111, 7)
indexedMap.set('a', 6)
indexedMap.set(NaN, 3)
indexedMap.set(undefined, 9)
indexedMap.set(obj, 5)
indexedMap.set(arr, 2)
indexedMap.set(null, 7)
indexedMap.set(111, 4)
indexedMap.set({}, 1)
indexedMap.set([], 8)


// console.log(indexedMap.get('a'));
// console.log(indexedMap.get(NaN));
// console.log(indexedMap.get(undefined));
// console.log(indexedMap.get(obj));
// console.log(indexedMap.get(arr));
// console.log(indexedMap.get(null));
// console.log(indexedMap.get(111));
// console.log(indexedMap.get({}));
// console.log(indexedMap.get([]));

// console.log(indexedMap.getByIndex(0));
// console.log(indexedMap.getByIndex(1));
// console.log(indexedMap.getByIndex(2));
// console.log(indexedMap.getByIndex(3));
// console.log(indexedMap.getByIndex(4));
// console.log(indexedMap.getByIndex(5));
// console.log(indexedMap.getByIndex(6));
// console.log(indexedMap.getByIndex(7));
// console.log(indexedMap.getByIndex(8));
// console.log(indexedMap.getByIndex(9));
// console.log(indexedMap.getByIndex(-1));
//
// console.log(indexedMap.has('a'));
// console.log(indexedMap.has(NaN));
// console.log(indexedMap.has(undefined));
// console.log(indexedMap.has(obj));
// console.log(indexedMap.has(arr));
// console.log(indexedMap.has(null));
// console.log(indexedMap.has(111));
// console.log(indexedMap.has({}));
// console.log(indexedMap.has([]));
//
// console.log(indexedMap.hasIndex(0));
// console.log(indexedMap.hasIndex(1));
// console.log(indexedMap.hasIndex(2));
// console.log(indexedMap.hasIndex(3));
// console.log(indexedMap.hasIndex(4));
// console.log(indexedMap.hasIndex(5));
// console.log(indexedMap.hasIndex(6));
// console.log(indexedMap.hasIndex(7));
// console.log(indexedMap.hasIndex(8));
// console.log(indexedMap.hasIndex(9));
// console.log(indexedMap.hasIndex(-1));

// console.log(indexedMap.remove('a'));
// console.log(indexedMap.remove(NaN));
// console.log(indexedMap.remove(undefined));
// console.log(indexedMap.remove(obj));
// console.log(indexedMap.remove(arr));
// console.log(indexedMap.remove(null));
// console.log(indexedMap.remove(111));
// console.log(indexedMap.remove({}));
// console.log(indexedMap.remove([]));

// console.log(indexedMap.removeAt(0, 9));
// console.log(indexedMap.setTo(0, 9));
// indexedMap.setTo(20, 20)

// indexedMap.forEach(item=> console.log(item))


// console.log(indexedMap.union(...[[11,11], [22, 22], [33,33]]))

// console.log(indexedMap);

