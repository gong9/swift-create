"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ink_1 = require("ink");
const ink_select_input_1 = __importDefault(require("ink-select-input"));
const App = () => {
    const handleSelect = (item) => {
        console.log(item);
    };
    const items = [
        {
            label: '业务项目',
            value: 'first'
        },
        {
            label: '库项目',
            value: 'second'
        }
    ];
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ink_1.Text, { color: "green" }, "\u8BF7\u9009\u62E9\u6240\u8981\u521B\u5EFA\u7684\u9879\u76EE"),
        react_1.default.createElement(ink_select_input_1.default, { items: items, onSelect: handleSelect })));
};
exports.default = App;
