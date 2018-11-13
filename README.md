# KeyTable

In-memory key-value store that optimizes for auto-complete against keys.

## Usage

```javascript
const KeyTable = require('key-table')

const table = new KeyTable()

// Add data
table.set('reality', 1)
table.set('realtor', 2)
table.set('realtors', 3)
table.set('ranger', 4)
table.set('foo', 'bar')

// Get data
table.get('ranger') === 4

// Retrieve data structure
table.data === {
  r: {
    ealtor: {
        '': 2,
        s: { '': 3 }
    },
    anger: { '': 4 }
  },
  foo: { '': 'bar' }
}

// Get all keys (keys returns an iterable)
Array.from(table.keys) === [
  'reality',
  'realtor',
  'realtors',
  'ranger',
  'foo'
]

// Get keys by prefix (getKeys returns an iterable)
Array.from(table.getKeys('real')) === [
    'reality',
    'realtor',
    'realtors'
]

// Restore from previous data
const table2 = new KeyTable(table.data)

table.data === table2.data
```
