"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHasParams = void 0;
const cac_1 = __importDefault(require("cac"));
const cli = (0, cac_1.default)();
const isHasParams = () => {
    const parsed = cli.parse();
    if (parsed.args.length === 0 && Object.keys(parsed.options).length === 1 && ('--' in parsed.options && parsed.options['--'].length === 0))
        return false;
    return true;
};
exports.isHasParams = isHasParams;
