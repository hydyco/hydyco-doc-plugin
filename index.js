var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var core_1 = require("@hydyco/core");
var swaggerUi = __importStar(require("swagger-ui-express"));
var router = express_1.Router();
var file = new core_1.HydycoFile();
/**
 * Util
 * @param {string} letter - any word
 * @return {string} - Capitalized Word
 */
var capitalizeFirstLetter = function (_a) {
    var first = _a[0], rest = _a.slice(1);
    return first.toUpperCase() + rest;
};
/**
 * Swagger date type parser
 * @param {string} type
 * @return {string}
 */
var parseSwaggerTypes = function (type) {
    switch (type) {
        case "date":
            return Date;
        default:
            return type;
    }
};
/**
 * Generate Swagger Doc Json
 * @param {IDocsSchema} - config data for swagger documentation
 * @return {IRouter} - express router
 */
var useSwaggerDocs = function (config) {
    if (config === void 0) { config = {
        info: {},
        host: "localhost:3005",
        basePath: "/",
        tags: [],
        paths: {},
        definitions: {},
    }; }
    var docsParseSchema = function (modelFiles) {
        var docObject = {
            swagger: "2.0",
            info: __assign({ description: "This API docs is auto generated", version: "0.0.1", title: "Hydyco Docs" }, config.info),
            tags: config.tags ? config.tags : [],
            schemes: ["http", "https"],
            paths: __assign({}, config.paths),
            definitions: __assign({}, config.definitions),
        };
        modelFiles.forEach(function (model) {
            if (model.show) {
                var schemas = Object.values(model.schema);
                docObject.tags.push({ name: capitalizeFirstLetter(model.name) });
                docObject.paths["/" + model.name] = {
                    get: {
                        tags: [capitalizeFirstLetter(model.name)],
                        summary: "Get list of all " + model.name,
                        description: "Returns list of all data for the model " + model.name,
                        consumes: ["application/json"],
                        produces: ["application/json"],
                        responses: {
                            "200": {
                                description: "successful operation",
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/definitions/" + capitalizeFirstLetter(model.name),
                                    },
                                },
                            },
                        },
                    },
                    post: {
                        tags: [capitalizeFirstLetter(model.name)],
                        summary: "Create entry for " + model.name,
                        description: "Create new entry for " + model.name,
                        consumes: ["application/json"],
                        produces: ["application/json"],
                        parameters: [
                            {
                                in: "body",
                                name: "body",
                                description: "",
                                required: true,
                                schema: {
                                    $ref: "#/definitions/" + capitalizeFirstLetter(model.name),
                                },
                            },
                        ],
                        responses: {
                            "200": {
                                description: "successful operation",
                                schema: {
                                    $ref: "#/definitions/" + capitalizeFirstLetter(model.name),
                                },
                            },
                        },
                    },
                    delete: {
                        tags: [capitalizeFirstLetter(model.name)],
                        summary: "Delete all data for " + model.name,
                        description: "Delete all data for " + model.name,
                        consumes: ["application/json"],
                        produces: ["application/json"],
                        responses: {
                            "200": {
                                description: "successful operation",
                            },
                        },
                    },
                };
                docObject.paths["/" + model.name + "/{id}"] = {
                    get: {
                        tags: [capitalizeFirstLetter(model.name)],
                        summary: "Get list of all " + model.name,
                        description: "Returns list of all data for the model " + model.name,
                        consumes: ["application/json"],
                        produces: ["application/json"],
                        parameters: [
                            {
                                name: "id",
                                in: "path",
                                description: "ID of " + model.name + " to get",
                                required: true,
                                type: "string",
                            },
                        ],
                        responses: {
                            "200": {
                                description: "successful operation",
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/definitions/" + capitalizeFirstLetter(model.name),
                                    },
                                },
                            },
                        },
                    },
                    put: {
                        tags: [capitalizeFirstLetter(model.name)],
                        summary: "Create entry for " + model.name,
                        description: "Create new entry for " + model.name,
                        consumes: ["application/json"],
                        produces: ["application/json"],
                        parameters: [
                            {
                                name: "id",
                                in: "path",
                                description: "ID of " + model.name + " to update",
                                required: true,
                                type: "string",
                            },
                            {
                                in: "body",
                                name: "body",
                                description: "",
                                required: true,
                                schema: {
                                    $ref: "#/definitions/" + capitalizeFirstLetter(model.name),
                                },
                            },
                        ],
                        responses: {
                            "200": {
                                description: "successful operation",
                                schema: {
                                    $ref: "#/definitions/" + capitalizeFirstLetter(model.name),
                                },
                            },
                        },
                    },
                    delete: {
                        tags: [capitalizeFirstLetter(model.name)],
                        summary: "Delete all data for " + model.name,
                        description: "Delete all data for " + model.name,
                        consumes: ["application/json"],
                        produces: ["application/json"],
                        parameters: [
                            {
                                name: "id",
                                in: "path",
                                description: "ID of " + model.name + " to delete data ",
                                required: true,
                                type: "string",
                            },
                        ],
                        responses: {
                            "200": {
                                description: "successful operation",
                            },
                        },
                    },
                };
                if (!model.operations.list)
                    delete docObject.paths["/" + model.name].get;
                if (!model.operations.create)
                    delete docObject.paths["/" + model.name].post;
                if (!model.operations.delete)
                    delete docObject.paths["/" + model.name].delete;
                if (!model.operations.read)
                    delete docObject.paths["/" + model.name + "/{id}"].read;
                if (!model.operations.update)
                    delete docObject.paths["/" + model.name + "/{id}"].update;
                if (!model.operations.deleteAll)
                    delete docObject.paths["/" + model.name + "/{id}"].deleteAll;
                docObject.definitions[capitalizeFirstLetter(model.name)] = {
                    type: "object",
                    properties: schemas.reduce(function (prev, curr) {
                        var _a;
                        return __assign(__assign({}, prev), (_a = {}, _a[curr.name] = curr.type === "ref"
                            ? curr.relationship === "hasmany"
                                ? {
                                    type: "array",
                                    items: {
                                        $ref: "#/definitions/" + capitalizeFirstLetter(curr.ref),
                                    },
                                }
                                : {
                                    $ref: "#/definitions/" + capitalizeFirstLetter(curr.ref),
                                }
                            : {
                                type: parseSwaggerTypes(curr.type),
                            }, _a));
                    }, {}),
                };
            }
        });
        return docObject;
    };
    // register swagger ui
    router.use("/api-docs", swaggerUi.serve);
    // config swagger
    router.get("/api-docs", swaggerUi.setup(null, {
        swaggerOptions: {
            url: "/admin/api-json",
        },
    }));
    router.get("/api-json", function (request, response) {
        var modelFiles = file.readAllMappingFiles();
        return response.json(docsParseSchema(modelFiles));
    });
    return router;
};
exports.default = useSwaggerDocs;
//# sourceMappingURL=index.js.map