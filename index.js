class KeyTable {
    constructor(data) {
        this.data = data || {}
    }
    g() {
        return super.findme
    }
    set(key, value) {
        if (typeof key === 'object') {
            for (let k in key) {
                this.set(k, key[k])
            }
            return key
        }
        const set = (o, sub) => {
            if (sub.length === 0) {
                return o[sub] = value
            }
            const c = sub[0]
            if (o.hasOwnProperty(c)) {
                return set(o[c], sub.substr(1))
            }

            // Find key matching first character
            let keys = Object.keys(o)
            for (let i = 0; i < keys.length; i++) {
                const sub2 = keys[i]
                const match = KeyTable.matchStart(sub, sub2)
                if (match) {
                    if (match < sub2.length) {
                        const next = {
                            [sub2.substr(match)]: o[sub2],
                        }
                        o[sub2.substr(0, match)] = next
                        delete o[sub2]
                        return set(next, sub.substr(match))
                    } else {
                        return set(o[sub2], sub.substr(match))
                    }
                }
            }
            o[sub] = {
                '': value
            }
            return value
        }
        return set(this.data, `${key}`)
    }
    get(key) {
        const get = (o, sub) => {
            console.log(sub)
            if (sub.length === 0) {
                console.log(o)
                return o['']
            }
            const c = sub[0]
            if (o.hasOwnProperty(c)) {
                return get(o[c], sub.substr(1))
            }
            // Find key matching first character
            let keys = Object.keys(o)
            for (let i = 0; i < keys.length; i++) {
                const sub2 = keys[i]
                let match = KeyTable.matchStart(sub, sub2)
                if (match) {
                    return get(o[sub2], sub.substr(match))
                }
            }
            return undefined
        }
        return get(this.data, `${key}`)
    }
    get length() {
        let count = 0
        for (let key of this.getKeys()) {
            count++
        }
        return count
    }
    get keys() {
        return this.getKeys()
    }
    * getKeys(prefix) {
        function * walk(o, sub, key) {
            const keys = Object.keys(o)
            for (let i = 0; i < keys.length; i++) {
                const sub2 = keys[i]
                if (sub2 === '' && sub === '') {
                    yield key
                } else if (sub === '') {
                    yield * walk(o[sub2], '', key + sub2)
                } else {
                    const match = KeyTable.matchStart(sub, sub2)
                    if (match) {
                        yield * walk(o[sub2], sub.substr(match), key + sub2)
                    }
                }
            }

        }
        yield * walk(this.data, prefix || '', '')
    }
}

KeyTable.matchStart = (s1, s2) => {
    const l = Math.max(s1.length, s2.length)
    for (let i = 0; i < l; i++) {
        if (s1[i] !== s2[i]) return i
    }
    return l
}

module.exports = KeyTable
