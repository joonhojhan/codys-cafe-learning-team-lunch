const Sequelize = require('sequelize');
const db = require('./database');
const Coffee = require('./coffee.model');

const Pug = db.define('pugs', {
	// your code here
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	age: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	biography: {
		type: Sequelize.TEXT,
	},
});

Pug.prototype.isPuppy = function() {
	return this.age < 1;
};

Pug.prototype.shortBio = function() {
	const bio = this.biography;
	for (let i = 0; i < bio.length; i++) {
		if (bio[i] === '.' || bio[i] === '?' || bio[i] === '!') {
			return bio.slice(0, i);
		}
	}
};

Pug.findByCoffee = async function(coffee) {
	const pugs = await Pug.findAll({
		include: [
			{
				model: Coffee,
				as: 'favoriteCoffee',
				where: {
					name: coffee,
				},
			},
		],
	});
	return pugs;
};

Pug.beforeValidate(function(instance) {
	instance.name =
		instance.name.charAt(0).toUpperCase() + instance.name.slice(1);
});

module.exports = Pug;
