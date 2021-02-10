"use strict";
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quadArraytoString = exports.quadStreamtoString = exports.quadArraytoTextStream = exports.quadStreamtoTextStream = exports.quadArraytoDataset = exports.quadStreamtoDataset = exports.quadArraytoStore = exports.quadStreamtoStore = exports.quadArraytoQuadStream = exports.quadStreamtoQuadArray = exports.getResourceAsString = exports.getResourceAsTextStream = exports.getResourceAsStore = exports.getResourceAsDataset = exports.getResourceAsQuadArray = exports.getResourceAsQuadStream = void 0;
var browser_or_node_1 = require("browser-or-node");
var N3 = __importStar(require("n3"));
var rdf_ext_1 = __importDefault(require("rdf-ext"));
var rdf_dereference_1 = __importDefault(require("rdf-dereference"));
var rdf_serialize_1 = __importDefault(require("rdf-serialize"));
var stringifyStream = require('stream-to-string');
var streamifyArray = require('streamify-array');
// Data retrieval functions
exports.getResourceAsQuadStream = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(path, isRemote(path))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getResourceAsQuadArray = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var stream;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(path, isRemote(path))];
            case 1:
                stream = _a.sent();
                return [4 /*yield*/, exports.quadStreamtoQuadArray(stream)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getResourceAsDataset = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var quadStream;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.getResourceAsQuadStream(path)];
            case 1:
                quadStream = _a.sent();
                return [4 /*yield*/, exports.quadStreamtoDataset(quadStream)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getResourceAsStore = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var quadArray;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.getResourceAsQuadArray(path)];
            case 1:
                quadArray = _a.sent();
                return [2 /*return*/, new N3.Store(quadArray)];
        }
    });
}); };
exports.getResourceAsTextStream = function (path, format) { return __awaiter(void 0, void 0, void 0, function () {
    var quadStream;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.getResourceAsQuadStream(path)];
            case 1:
                quadStream = _a.sent();
                return [2 /*return*/, exports.quadStreamtoTextStream(quadStream, format)];
        }
    });
}); };
exports.getResourceAsString = function (path, format) { return __awaiter(void 0, void 0, void 0, function () {
    var quadStream;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.getResourceAsQuadStream(path)];
            case 1:
                quadStream = _a.sent();
                return [2 /*return*/, exports.quadStreamtoString(quadStream, format)];
        }
    });
}); };
// Data conversion functions
exports.quadStreamtoQuadArray = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var quads = [];
                input
                    .on('data', function (quad) { quads.push(quad); })
                    .on('error', function (error) { return reject(new Error("Error parsing notification body.\n" + error.message)); })
                    .on('end', function () { return resolve(quads); });
            })];
    });
}); };
exports.quadArraytoQuadStream = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, streamifyArray(input)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.quadStreamtoStore = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = N3.Store).bind;
                return [4 /*yield*/, exports.quadStreamtoQuadArray(input)];
            case 1: return [2 /*return*/, new (_b.apply(_a, [void 0, _c.sent()]))()];
        }
    });
}); };
exports.quadArraytoStore = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new N3.Store(input)];
    });
}); };
exports.quadStreamtoDataset = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, rdf_ext_1.default.dataset().import(input)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.quadArraytoDataset = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var quadStream;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.quadArraytoQuadStream(input)];
            case 1:
                quadStream = _a.sent();
                return [4 /*yield*/, rdf_ext_1.default.dataset().import(quadStream)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.quadStreamtoTextStream = function (input, format) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        format = format || "text/turtle";
        return [2 /*return*/, rdf_serialize_1.default.serialize(input, { contentType: format })];
    });
}); };
exports.quadArraytoTextStream = function (input, format) { return __awaiter(void 0, void 0, void 0, function () {
    var quadStream;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                format = format || "text/turtle";
                return [4 /*yield*/, exports.quadArraytoQuadStream(input)];
            case 1:
                quadStream = _a.sent();
                return [2 /*return*/, rdf_serialize_1.default.serialize(quadStream, { contentType: format })];
        }
    });
}); };
exports.quadStreamtoString = function (input, format) { return __awaiter(void 0, void 0, void 0, function () {
    var textStream;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                textStream = exports.quadStreamtoTextStream(input, format);
                return [4 /*yield*/, stringifyStream(textStream)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.quadArraytoString = function (input, format) { return __awaiter(void 0, void 0, void 0, function () {
    var textStream;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                textStream = exports.quadArraytoTextStream(input, format);
                return [4 /*yield*/, stringifyStream(textStream)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var isRemote = function (path) {
    var remoteURL = true;
    try {
        new URL(path);
    }
    catch (e) {
        remoteURL = false;
    }
    return remoteURL;
};
var fetch = function (path, local) { return __awaiter(void 0, void 0, void 0, function () {
    var quads;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (browser_or_node_1.isBrowser && local)
                    throw new Error("Cannot retrieve local files from browser environment.");
                return [4 /*yield*/, rdf_dereference_1.default.dereference(path, { localFiles: local })];
            case 1:
                quads = (_a.sent()).quads;
                return [2 /*return*/, quads];
        }
    });
}); };
//# sourceMappingURL=index.js.map