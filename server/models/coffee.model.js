const Sequelize = require('sequelize');
const db = require('./database');

const Coffee = db.define('coffee', {
	// your code here
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	ingredients: {
		type: Sequelize.ARRAY(Sequelize.STRING),
		defaultValue: [],
	},
});

Coffee.prototype.getIngredients = function() {
	return this.ingredients.join(', ');
};

Coffee.findByIngredient = function(ingredient) {
	// const Op = Sequelize.Op;
	// const coffees = await this.findAll({
	// 	where: {
	// 		ingredients: {
	// 			[Op.contains]: [ingredient],
	// 		},
	// 	},
	// });
	// return coffees;
	const coffee = Coffee.findAll();
	return coffee.filter(cof => cof.ingredients.includes(ingredient));
};

Coffee.beforeValidate(instance => {
	if (!instance.ingredients.includes('love')) {
		instance.ingredients.push('love');
	}
});

module.exports = Coffee;
