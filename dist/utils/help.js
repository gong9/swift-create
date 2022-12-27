"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cac_1 = __importDefault(require("cac"));
const cli = (0, cac_1.default)();
cli.option('--type [type]', 'Choose a project type', {
    default: 'node',
});
cli.option('--name <name>', 'Provide your name');
cli.command('lint [...files]', 'Lint files').action((files, options) => {
    console.log(files, options);
});
// Display help message when `-h` or `--help` appears
cli.help();
// Display version number when `-v` or `--version` appears
// It's also used in help message
cli.version('0.0.0');
cli.parse();
