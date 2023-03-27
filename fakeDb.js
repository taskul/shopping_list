const fs = require('fs')

let allItems;
let rawdata = fs.readFileSync('fakeDb.json');

function writeFakeDb(item) {
    allItems = JSON.parse(rawdata)
    if (allItems) {
        allItems.items.push(item)
    } else {
        allItems = {
            items: [item]
        }
    }
    fs.appendFile('./fakeDb.json', JSON.stringify(allItems), 'utf8', (err) => {
        if (err) {
            console.log('Unable to write to file')
        } else {
            console.log('updated fakeDb.json file')
        }
    })
}


global.items = []


module.exports = items 