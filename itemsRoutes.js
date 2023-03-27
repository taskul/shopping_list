const express = require('express');;
const ExpressError = require("./expressError");
const router = new express.Router();
const items = require('./fakeDb');
const middleware = require('./appMiddleware');

// get all item list items
router.get('/', (req, res) => {
    res.json({ items });
})

router.post('/', middleware.checkNamePrice, (req, res, next) => {
    const newItem = { name: req.body.name, price: req.body.price };
    console.log(items)
    items.push(newItem);
    return res.status(201).json({ "added": { name: req.body.name, price: req.body.price } });

    // try {
    //     items.push({ name: req.body.name, price: req.body.price });
    //     returnres.json({ "added": { name: req.body.name, price: req.body.price } });
    // } catch (e) {
    //     return next(e)
    // }

})

router.get('/:name', (req, res) => {
    const foundItem = items.find(n => n.name === req.params.name);
    if (!foundItem) throw new ExpressError(`Please enter correct item name`, 404)
    if (foundItem) {
        return res.json({ item: foundItem })
    }
})

router.patch('/:name', (req, res, next) => {
    const foundItem = items.find(n => n.name === req.params.name)
    if (foundItem === undefined) {
        throw new ExpressError("Item not found", 404);
    };
    // use req.body.name when checking for incoming json objects.
    if (!req.body.name) {
        throw new ExpressError("Please enter an item", 404);
    };
    foundItem.name = req.body.name;
    foundItem.price = req.body.price;
    // item.name = req.body.name ? req.body.name : item.name;
    // item.price = req.body.price ? req.body.price : item.price;
    res.json({ item: foundItem })
})

router.delete('/:name', (req, res) => {
    const item = items.find(n => n.name === req.params.name);
    if (item === undefined) {
        throw new ExpressError("Item not found", 404);
    };
    if (item) {
        items.splice(item, 1)
        res.json({ message: 'Deleted' })
    }
})


module.exports = router;



