//
// Name:    services.js
// Purpose: Controller and routing for Service model
// Creator: Tom Söderlund
//

'use strict';

const mongooseCrudify = require('mongoose-crudify');
const helpers = require('../../config/helpers');
const Service = require('mongoose').model('Service');

// Private functions

// Public API

module.exports = function (app, config, authController) {

	app.use(
		'/api/services',
		mongooseCrudify({
			Model: Service,
			identifyingKey: 'reference',
			beforeActions: [
				{ middlewares: [helpers.generateReferenceFromNameOrEmail], only: ['create'] },
				{ middlewares: [helpers.stripIds.bind(this, 'service')], only: ['read'] },
			],
		})
	);

};