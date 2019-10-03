const router = require('express').Router();
const { Coffee } = require('../models');

// Your code here!
// Remember that these routes are already mounted on
// /api/coffee!

router.get('/', async (req, res, next) => {
	try {
		const allCoffee = await Coffee.findAll();
		if (allCoffee) res.json(allCoffee);
		else res.sendStatus(404);
	} catch (error) {
		next(error);
	}
});

router.get('/ingredients/:ingredientName', async (req, res, next) => {
	try {
		const coffee = await Coffee.findByIngredient(req.params.ingredientName);
		if (coffee) res.send(coffee);
		else res.sendStatus(404);
	} catch (error) {
		next(error);
	}
});

router.get('/:coffeeId', async (req, res, next) => {
	try {
		const coffeeById = await Coffee.findById(req.params.coffeeId);
		if (coffeeById) res.send(coffeeById);
		else res.sendStatus(404);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { name, ingredients } = req.body; // destructuring req.body for security
		const newCoffee = await Coffee.create({
			name,
			ingredients,
		});
		if (newCoffee) res.status(201).send(newCoffee);
		else res.sendStatus(404);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
