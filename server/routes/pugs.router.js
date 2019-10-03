const router = require('express').Router();
const { Pug } = require('../models');

// Your code here!
// Remember that these routes are already mounted on
// /api/pugs!

router.get('/', async (req, res, next) => {
	try {
		let pugs = await Pug.findAll();
		if (pugs) res.send(pugs);
		else res.sendStatus(404);
	} catch (error) {
		next(error);
	}
});

router.get('/favoriteCoffee/:favoriteCoffeeName', async (req, res, next) => {
	try {
		let pugs = await Pug.findByCoffee(req.params.favoriteCoffeeName);
		if (pugs) res.send(pugs);
		else res.sendStatus(404);
	} catch (error) {
		next(error);
	}
});

router.get('/:pugId', async (req, res, next) => {
	try {
		let pugs = await Pug.findById(req.params.pugId);
		console.log(pugs);
		if (pugs) res.send(pugs);
		else res.sendStatus(404);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { name, biography, age } = req.body;
		const pug = await Pug.create({
			name,
			biography,
			age,
		});
		res.status(201).send(pug);
	} catch (error) {
		next(error);
	}
});

router.put('/:pugId', async (req, res, next) => {
	try {
		const pug = await Pug.findById(req.params.pugId);
		if (pug) {
			const updated = await pug.update({
				favoriteCoffeeId: req.body.favoriteCoffeeId,
			});
			if (updated) res.send(updated);
			// pug.favoriteCoffeeId = req.body.favoriteCoffeeId;
			// await pug.save();
			// res.send(pug);
		} else res.sendStatus(404);
	} catch (error) {
		next(error);
	}
});

router.delete('/:pugId', async (req, res, next) => {
	try {
		const pug = await Pug.findById(req.params.pugId);
		if (pug) {
			const deleted = await pug.destroy();
			res.status(204).send(deleted);
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
