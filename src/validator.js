// validator.js

import answer from 'the-answer';
import djv from 'djv';
import * as schema from './schema/schema.js'

const env = new djv({version: 'draft-06'})

export default function Validator() {
	// console.log(env)
	console.log('the answer is ' + answer);

	// console.log(schema)

	var sphere = {
		"origin": [0,0,0],
		"radius": 5,
		"primitive":"sphere"
	};

	var block = {
		"origin": [0,0,0],
		"dimensions": [5,10,5],
		"primitive":"block"
	};

	var nonBlock = {
		"origin": [0,0,0],
		"dimensions": [5,10,5],
		"primitive":"block",
		"fruit": "apple"
	};

	var nonSphere = {
		"origin": 1,
		"radius": "tree"
	}

	env.addSchema('test', schema.geometry);

	// console.log("SCHEMA")
	// console.log(schema.geometry)

 //    var test = env.validate('test#/block', nonBlock);

 //    if(typeof test === 'undefined') {
	// 	console.log("VALID");
	// } else {
	// 	console.log("NOT VALID");
	// }
	
}


export function generateChecker(data) {

	// env.addSchema('test', schema.geometry);
	console.log(env)

	var test = env.validate('test#/sphere', data)
	console.log(test)
	// console.log("NEW SCHEMA")

	if(typeof test === 'undefined') {
		console.log("test VALID");
	} else {
		console.log("test NOT VALID");
	}

}

/*
	Helper function for assembling a specification struct,
	encapsulating a schema fragment and a textual description of the expected value
*/

function specification(schema, description) {
	return {
		schema: schema,
		description: description
	}
}

export var helpers = {
	Null: specification({ "type": "null" }, "null" ),
	String: specification({ "type": "string" }, "a string" ),
	Number: specification({ "type": "number" }, "a number" ),
	PositiveInteger: specification({
		"type": "integer",
		"exclusiveMinimum": 0
	}, "a positive integer" ),

	/* 
		Convenience method for constructing a specification based on an entity
		sub-schema inside the parasolid worker geometry entity schema

		@param {String} name Name of the entity, e.g, 'point'
		@return {Object} Specification
	*/

	Entity: function(name) {
		var prefix = 'entities';
		if (entitySchema.geometry[name]) {
			prefix = 'geometry';
		}
		return specification({ $ref: schemaPrefix + '#/' + prefix + '/' + name}, name + " entity" );
	},

	/*
		Convenience method for constructing a specification based on a type
		subschema inside the parasolid worker geometry types schema

		@param {String} name Name of the type, e.g, 'position'
		@return {Object} Specification
	*/

	Type: function(name) {
		return specification({ $ref: schemaPrefix + '#/types/' + name }, name );
	},

	/*
		Construct a specification that will be satisfied if any of the argument
		specifications are satisfied

		@return {Object} spec specification
	*/

	AnyOf: function() {
		var args = Array.prototype.slice.call(arguments);
		return specification({
			"anyOf": args.map(function(s) {
				return s.schema;
			})
		}, args.map(function(s) {
			return s.description;
		}).join(" or "));
	},

	/*
		Construct5 a specification that will be satisfied if the argument
		specifications is satisfied, or if the value is null/undefined

		Note that our validation logic coerces values to be checked from
		to null

		@param {Object} sub contains schema
		@return {Object} specification
	*/

	Maybe: function(sub) {
		return helpers.AnyOf(sub, helpers.Null)
	},

	/*
		Construct a specification that will be satisfied for an array of the
		sub-schemas

		@param {Object} sub contains schema
		@return {Object} specification
	*/

	ArrayOf: function(sub) {
		return specification({
			"type": "array",
			"items": sub.schema
		},
		"array of " + sub.description+"(s)");
	}
};
