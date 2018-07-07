export var types = {
	"null": {"type": "null"},
	"brep_format": {
		"enum": ["x_b", "x_t", "iges", "step", "sat", "sab", "stl", "3dm"]
	},
	"index": {
		"type": "integer",
		"minimum": 0
	},
	"indexNonzero": {
		"type": "integer",
		"exclusiveMinimum": 0
	},
	"direction": {
		"type": "array",
		"items": { "type": "number" },
		"minItems": 3,
		"maxItems": 3
	},
	"unitNumber": {
		"type": "number",
		"minimum": 0,
		"maximum": 1
	},
	"redbackid": {
		"type": "string"
	},
	"angle": {
		"type": "number",
		"redbackDimension": "angle"
	},
	"coordinate": {
		"type": "number",
		"redbackDimension": "length"
	},
	"distance": {
		"type": "number",
		"minimum": 0,
		"redbackDimension": "length"
	},
	"area": {
		"type": "number",
		"minimum": 0,
		"redbackDimension": "area"
	},
	"volume": {
		"type": "number",
		"minimum": 0,
		"redbackDimension": "volume"
	},
	"distanceNonzero": {
		"type": "number",
		"exclusiveMinimum": 0,
		"redbackDimension": "length"
	},
	"position": {
		"type": "array",
		"items": {
			"type": "number",
			"dimension": "length"
		},
		"minItems": 3,
		"maxItems": 3
	},
	"dimensions": {
        "type": "array",
        "items": {
        	"type": "number",
            "exclusiveMinimum": 0,
            "dimension": "length"
        },
        "minItems": 3,
        "maxItems": 3
    },
    "units": {
    	"type": "object",
    	"additionalProperties": false,
    	"patternProperties": {
    		".*": {"type": "string"}
    	}
    },
    "matrix": {
    	"type": "array",
    	"items": {"type": "number"},
    	"minItems": 3,
    	"maxItems": 3
    },
    "uv": {
    	"type": "array",
    	"items": {"type": "number"},
    	"minItems": 2,
    	"maxItems": 2
    }
};

export var moreEntities = {
	"line": {
		"type": "object",
		"properties": {
			"id": 				{"$ref": types.redbackid},
			"primitive": 		{"enum": ["line"]},
			"attributes": 		{"type": "object"},
			"units": 			{"$ref": types.units},
			"start": 			{"$ref": types.position},
			"end": 				{"$ref": types.position}
		},
		"required": ["primitive", "start", "end"]
	},
	"polyline": {
		"type": "object",
		"properties": {
			"id": 				{"$ref": types.redbackid},
			"primitive": 		{"enum": ["polyline"]},
			"attributes": 		{"type": "object"},
			"units": 			{"$ref": types.units},
			"points": {
				"type": "array",
				"items": {"$ref": types.position},
				"minItems": 2
			}
		},
		"required": ["primitive", "points"]
	},
    "curve": {
		"type": "object",
		"properties": {
			"id": 				{"$ref": types.redbackid},
			"primitive": 		{"enum": ["curve"]},
			"attributes": 		{"type": "object"},
			"units": 			{"$ref": types.units},
			"degree": 			{"$ref": types.indexNonzero},
			"controlPoints": 	{"type": "array", "items": {"$ref": types.position}},
			"knots": 			{"type": "array", "items": {"type": "number"}},
			"weights": 			{"type": "array", "items": {"type": "number"}}
		},
		"required": ["primitive", "degree", "controlPoints", "knots"]
	},
	"arc": {
		"type": "object",
		"properties": {
			"id": 				{"$ref": types.redbackid},
			"primitive": 		{"enum": ["arc"]},
			"attributes": 		{"type": "object"},
			"units": 			{"$ref": types.units},
			"start": 			{"$ref": types.position},
			"middle": 			{"$ref": types.position},
			"end": 				{"$ref": types.position}
		},
		"required": ["primitive", "start", "middle", "end"]
	},
	"surface": {
		"type": "object",
		"properties": {
			"id": 				{"$ref": types.redbackid},
			"primitive": 		{"enum": ["surface"]},
			"attributes": 		{"type": "object"},
			"units": 			{"$ref": types.indexNonzero},
			"uDegree": 			{"$ref": types.indexNonzero},
			"vDegree": 			{"$ref": types.indexNonzero},
			"uKnots": 			{"type": "array", "items": {"type": "number"}},
			"vKnots": 			{"type": "array", "items": {"type": "number"}},
			"controlPoints": {
				"type": "array",
				"items": {
					"type": "array",
					"items": {
						"$ref": types.position
					}
				}
			},
			"weights": 			{"type": "array", "items": {"type": "number"}}
		},
		"required": ["primitive", "uDegree", "vDegree", "uKnots", "vKnots", "controlPoints"]
	}
}

export var entities = {
	"empty": 					{"type": "object", "additionalProperties": false},
	"number": 					{"type": "number"},
	"affineTransform": {
		"type": "object",
		"properties": {
			"id": 				{"$ref": types.redbackid},
			"primitive": 		{"enum": ["affineTransform"]},
			"attributes": 		{"type": "object"},
			"units": 			{"$ref": types.units},
			"mat": 				{"$ref": types.matrix}
		},
		"required": ["primitive", "mat"],
		"additionalProperties": false
	},
	"massProps": {
		"type": "object",
		"properties": {
			"id": 				{"$ref": types.redbackid},
			"primitive": 		{"enum": ["massProps"]},
			"attributes": 		{"type": "object"},
			"units": 			{"$ref": types.units},
			"mass": 			{"$ref": types.distance},
			"centerOfMass": 	{"$ref": types.position},
			"inertialTensor": 	{
				"type": "aray",
				"items": 		{"$ref": types.direction},
				"minItems": 3,
				"maxItems": 3
			},
			"volume": 			{"$ref": types.volume},
			"surfaceArea": 		{"$ref": types.area},
			"length": 			{"$ref": types.distance},
			"circumference": 	{"$ref": types.distance}
		},
		"required": ["primitive", "mass", "centerOfMass", "inertialTensor"],
		"additionalProperties": false
	}
};

export var geometry = {
	"brep": {
		"type": "object",
		"properties": {
			"id": 				{"$ref": types.redbackid},
			"primitive": 		{"enum": ["brep"]},
			"content": 			{"type": "string"},
			"format": 			{"$ref": types.brep_format},
			"isCompressed": 	{"type": "boolean"},
			"isBase64": 		{"type": "boolean"},
			"attributes": 		{"type": "object"}
		},
		"required": ["primitive", "content", "format"]
	},
	"vector": {
		"type": "object",
		"properties": {
			"id": 				{"$ref": types.redbackid},
			"primitive": 		{"enum": ["vector"]},
			"attributes":  		{"type": "object"},
			"units": 			{"$ref": types.units},
			"coords": 			{"$ref": types.position}
		},
		"required": ["primitive", "coords"]
	},
	"point": {
		"type": "object",
		"properties": {
			"id": 				{"$ref": types.redbackid},
			"primitive": 		{"enum": ["point"]},
			"attributes": 		{"type": "object"},
			"units": 			{"$ref": types.units},
			"point": 			{"$ref": types.position}
		},
		"required": ["primitive", "point"]
	},
	"plane": {
		"type": "object",
		"properties": {
			"id": 				{"$ref": types.redbackid},
			"primitive": 		{"enum": ["plane"]},
			"attributes": 		{"type": "object"},
			"units": 			{"$ref": types.units},
			"origin": 			{"$ref": types.position},
			"normal": 			{"$ref": types.direction}
		},
		"required": ["primitive", "origin", "normal"]
	},
	"line": {
		"type": "object",
		"properties": {
			"id": 				{"$ref": types.redbackid},
			"primitive": 		{"enum": ["line"]},
			"attributes": 		{"type": "object"},
			"units": 			{"$ref": types.units},
			"start": 			{"$ref": types.position},
			"end": 				{"$ref": types.position}
		},
		"required": ["primitive", "start", "end"]
	},
	"polyline": {
		"type": "object",
		"properties": {
			"id": 				{"$ref": types.redbackid},
			"primitive": 		{"enum": ["polyline"]},
			"attributes": 		{"type": "object"},
			"units": 			{"$ref": types.units},
			"points": {
				"type": "array",
				"items": {"$ref": types.position},
				"minItems": 2
			}
		},
		"required": ["primitive", "points"]
	},
	"circle": {
		"type": "object",
		"properties": {
			"id": 				{"$ref": types.redbackid},
			"primitive": 		{"enum": ["circle"]},
			"attributes": 		{"type": "object"},
			"units": 			{"$ref": types.units},
			"origin": 			{"$ref": types.position},
			"radius": 			{"$ref": types.distanceNonzero},
			"axis": 			{"$ref": types.direction}
		},
		"required": ["primitive", "origin", "radius"]
	},
	"ellipse": {
		"type": "object",
		"properties": {
			"id": 				{"$ref": types.redbackid},
			"primitive": 		{"enum": ["ellipse"]},
			"attributes": 		{"type": "object"},
			"units": 			{"$ref": types.units},
			"origin": 			{"$ref": types.position},
			"majorRadius": 		{"$ref": types.distanceNonzero},
			"minorRadius": 		{"$ref": types.distanceNonzero},
			"axis": 			{"$ref": types.direction},
			"reference": 		{"$ref": types.direction}
		},
		"required": ["primitive", "origin", "majorRadius", "minorRadius"]
	},
	"curve": {
		"type": "object",
		"properties": {
			"id": 				{"$ref": types.redbackid},
			"primitive": 		{"enum": ["curve"]},
			"attributes": 		{"type": "object"},
			"units": 			{"$ref": types.units},
			"degree": 			{"$ref": types.indexNonzero},
			"controlPoints": 	{"type": "array", "items": {"$ref": types.position}},
			"knots": 			{"type": "array", "items": {"type": "number"}},
			"weights": 			{"type": "array", "items": {"type": "number"}}
		},
		"required": ["primitive", "degree", "controlPoints", "knots"]
	},
	"arc": {
		"type": "object",
		"properties": {
			"id": 				{"$ref": types.redbackid},
			"primitive": 		{"enum": ["arc"]},
			"attributes": 		{"type": "object"},
			"units": 			{"$ref": types.units},
			"start": 			{"$ref": types.position},
			"middle": 			{"$ref": types.position},
			"end": 				{"$ref": types.position}
		},
		"required": ["primitive", "start", "middle", "end"]
	},
	"rectangle": {
		"type": "object",
		"properties": {
			"id": 				{"$ref": types.redbackid},
			"primitive": 		{"enum": ["rectangle"]},
			"attributes": 		{"type": "object"},
			"units": 			{"$ref": types.units},
			"origin": 			{"$ref": types.position},
			"dimensions": {
				"type": "array",
				"items": 		{"$ref": types.distanceNonzero},
				"minItems": 2,
				"maxItems": 2,
				"additionalItems": false
			},
			"axis": 			{"$ref": types.direction},
			"reference": 		{"$ref": types.direction}
		},
		"required": ["primitive", "origin", "dimensions"]
	},
	"polycurve": {
		"type": "object",
		"properties": {
			"id": {"$ref": types.redbackid},
			"primitive": {"enum": ["polycurve"]},
			"attributes": {"type": "object"},
			"curves": {
				"type": "array",
				"minItems": 1,
				"items": {
					"oneOf": [
						{"$ref": moreEntities.line},
						{"$ref": moreEntities.polyline},
						{"$ref": moreEntities.curve},
						{"$ref": moreEntities.arc}
					]
				}
			}
		},
		"required": ["primitive", "curves"]
	},
	"surface": {
		"type": "object",
		"properties": {
			"id": 				{"$ref": types.redbackid},
			"primitive": 		{"enum": ["surface"]},
			"attributes": 		{"type": "object"},
			"units": 			{"$ref": types.indexNonzero},
			"uDegree": 			{"$ref": types.indexNonzero},
			"vDegree": 			{"$ref": types.indexNonzero},
			"uKnots": 			{"type": "array", "items": {"type": "number"}},
			"vKnots": 			{"type": "array", "items": {"type": "number"}},
			"controlPoints": {
				"type": "array",
				"items": {
					"type": "array",
					"items": {
						"$ref": types.position
					}
				}
			},
			"weights": 			{"type": "array", "items": {"type": "number"}}
		},
		"required": ["primitive", "uDegree", "vDegree", "uKnots", "vKnots", "controlPoints"]
	},
	"polysurface": {
		"type": "object",
		"properties": {
			"id": 				{"$ref": types.redbackid},
			"primitive": 		{"enum": ["polysurface"]},
			"attributes": 		{"type": "object"},
			"surfaces": {
				"type": "array",
				"items": {"oneOf": [
					{"$ref": moreEntities.surface}
				]},
				"minItems": 1
			}
		},
		"required": ["primitive", "surfaces"]
	},
	"block": {
		"type": "object",
		"properties": {
			"id": 				{"$ref": types.redbackid},
			"primitive": 		{"enum": ["block"]},
			"attributes": 		{"type": "object"},
			"units": 			{"$ref": types.units},
			"origin": 			{"$ref": types.position},
			"dimensions": 		{"$ref": types.dimensions},
			"axis": 			{"$ref": types.direction},
			"reference": 		{"$ref": types.direction}
		},
		"required": ["primitive", "origin", "dimensions"]
	},
	"sphere": {
		"type": "object",
		"properties": {
			"id": 				{"$ref": types.redbackid},
			"primitive": 		{"enum": ["sphere"]},
			"attributes": 		{"type": "object"},
			"units": 			{"$ref": types.units},
			"origin": 			{"$ref": types.position},
			"radius": 			{"$ref": types.distanceNonzero}
		},
		"required": ["primitive", "origin", "radius"],
		"additionalProperties": false
	},
	"mesh": {
		"type": "object",
		"properties": {
			"id": 				{"$ref": types.redbackid},
			"primitive": 		{"enum": ["mesh"]},
			"attributes": 		{"type": "object"},
			"units": 			{"$ref": types.units},
			"vertices": {
				"type": "array",
				"items": 		{"$ref": types.position}
			},
			"faces": {
				"type": "array",
				"items": {
					"type": "array",
					"items": 	{"$ref": types.index},
					"minItems": 3
				}
			},
			// per vertex
			"color": {
				"type": "array",
				"items": 		{"$ref": types.direction}
			},
			"normal": {
				"type": "array",
				"items": 		{"$ref": types.direction}
			},
			"uv": {
				"type": "array",
				"items": 		{"$ref": types.uv}
			},
			"isSolid": {"type": "boolean"}
		},
		"required": ["primitive", "vertices", "faces"]
	},
	"text": {
		"type": "object",
		"properties": {
			"id": 				{"$ref": types.redbackid},
			"primitive": 		{"enum": ["text"]},
			"attributes": 		{"type": "object"},
			"units": 			{"$ref": types.units},
			"align": 			{"$ref": types.position},
			"origin": 			{"$ref": types.position},
			"direction": 		{"$ref": types.direction},
			"size": 			{"type": "number"},
			"color": 			{"type": "color"},
			"text": 			{"type": "string"}
		},
		"required": ["primitive", "size", "text"]
	}
};

export var scene = {
    "instance": {
        "type": "object",
        "properties": {
            "attributes":   	{"type":  "object"},
            "primitive":    	{"enum": ["instance"]},
            "id":           	{"$ref": types.redbackid},
            "units":        	{"$ref": types.units},
            "matrix":       	{"$ref": types.matrix},
            "label":        	{"type": "string"},
            "material":     	{"$ref": types.redbackid},
            "entity":       	{"$ref": types.redbackid}
        },
        "required": ["primitive", "id", "entity"],
        "additionalProperties": false
    },
    "geometryList": {
        "type": "object",
        "properties": {
            "attributes":   	{"type":  "object"},
            "primitive":    	{"enum": ["geometryList"]},
            "id":           	{"$ref": types.redbackid},
            "units":        	{"$ref": types.units},
            "entities":     	{"type": "array"}
        },
        "required": ["primitive", "id", "entities"],
        "additionalProperties": false
    },
    "group": {
        "type": "object",
        "properties": {
            "attributes":   	{"type":  "object"},
            "primitive":    	{"enum": ["group"]},
            "id":           	{"$ref": types.redbackid},
            "units":        	{"$ref": types.units},
            "matrix":       	{"$ref": types.matrix},
            "label":        	{"type": "string"},
            "material":     	{"$ref": types.redbackid},
            "children":{
                "type": "array",
                "items": {"$ref": types.redbackid}
            }
        },
        "required": [ "primitive", "id", "children" ],
        "additionalProperties": true
    },
    "layer": {
        "type": "object",
        "properties": {
            "attributes":   	{"type": "object"},
            "primitive":    	{"enum": ["layer"]},
            "id":           	{"$ref": types.redbackid},
            "label":        	{"type": "string"},
            "color":        	{"$ref": types.color},
            "visible":      	{"type": "boolean"},
            "elements": {
                "type":     "array",
                "items":    {"$ref": types.redbackid}
            }
        },
        "required": ["primitive", "id", "elements"],
        "additionalProperties": false
    },
    "camera": {
        "type": "object",
        "properties": {
            "attributes":   	{"type": "object"},
            "primitive":    	{"enum": ["camera"]},
            "id":           	{"$ref": types.redbackid},
            "type":         	{"enum": ["orthographic", "perspective"]},
            "units":        	{"$ref": types.units},
            "nearClip":     	{"$ref": types.distance},
            "farClip":      	{"$ref": types.distance},
            "focalLength":  	{"$ref": types.distance}
        },
        "required": ["id", "primitive", "type"],
        "additionalProperties": false
    },
    "light": {
        "type": "object",
        "properties": {
            "attributes":   	{"type": "object"},
            "primitive":    	{"enum": ["light"]},
            "id":           	{"$ref": types.redbackid},
            "type":         	{"enum": ["point", "directional", "spot"]},
            "units":        	{"$ref": types.units},
            "color":        	{"$ref": types.color},
            "intensity":    	{"type": "number"},
            "coneAngle":    	{"$ref": types.angle}
        },
        "required": ["id", "primitive", "type"],
        "additionalProperties": false
    },
    "material": {
        "type": "object",
        "properties": {
            "attributes":   	{"type": "object"},
            "units":        	{"$ref": types.units},
            "primitive":    	{"enum": ["material"]},
            "id":           	{"$ref": types.redbackid},
            "color":            {"$ref": "fluxEntity#/types/color"},
            "colorMap":         {"$ref": "#/types/fluxid"},
            "reflectivity":     {"$ref": "fluxEntity#/types/unitNumber"},
            "glossiness":       {"$ref": "fluxEntity#/types/unitNumber"},
            "transparency":     {"$ref": "fluxEntity#/types/unitNumber"},
            "transparencyIOR":{
                "type":     "number",
                "minimum":  0
            },
            "emissionColor":    {"$ref": "fluxEntity#/types/color"},
            "transparencyColor":{"$ref": "fluxEntity#/types/color"},
            "reflectivityColor":{"$ref": "fluxEntity#/types/color"},
            "required": ["id", "primitive"]
        },
        "additionalProperties": false
    },
    "texture": {
        "type": "object",
        "properties": {
            "attributes":   	{"type":  "object"},
            "primitive":    	{"enum": ["texture"]},
            "id":           	{"$ref": types.redbackid},
            "image":        	{"type": "string"},
            "required":     	["id", "primitive", "image"]
        },
        "additionalProperties": false
    }
}