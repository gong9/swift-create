"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ink_1 = require("ink");
const ink_select_input_1 = __importDefault(require("ink-select-input"));
const map_1 = require("./map");
var ProjectEnum;
(function (ProjectEnum) {
    ProjectEnum[ProjectEnum["Business"] = 0] = "Business";
    ProjectEnum[ProjectEnum["Lib"] = 1] = "Lib";
})(ProjectEnum || (ProjectEnum = {}));
var FrameEnum;
(function (FrameEnum) {
    FrameEnum[FrameEnum["React"] = 0] = "React";
    FrameEnum[FrameEnum["Vue"] = 1] = "Vue";
})(FrameEnum || (FrameEnum = {}));
const projectItems = [
    {
        label: 'business',
        value: ProjectEnum.Business,
    },
    {
        label: 'lib',
        value: ProjectEnum.Lib,
    },
];
const codeManagementItems = [
    {
        label: 'basics',
        value: false,
    },
    {
        label: 'monorepo',
        value: true,
    },
];
const frameItem = [
    {
        label: 'React',
        value: FrameEnum.React,
    },
    {
        label: 'Vue',
        value: FrameEnum.Vue,
    },
];
const itemMap = {
    0: projectItems,
    1: codeManagementItems,
    2: frameItem,
};
const titleMap = {
    0: '请选择所要创建的项目类型',
    1: '请选择仓库管理方式',
    2: '请选择框架',
};
const App = () => {
    const record = (0, react_1.useRef)({
        projectType: ProjectEnum.Business,
        isMonorepo: true,
        frame: FrameEnum.React,
    });
    const [step, setStep] = (0, react_1.useState)(0);
    const handleSelect = (item) => {
        switch (step) {
            case 0:
                record.current.projectType = item.value;
                break;
            case 1:
                record.current.isMonorepo = item.value;
                break;
            case 2:
                record.current.frame = item.value;
                break;
            default:
                break;
        }
        setStep(step + 1);
    };
    if (step === 3) {
        return (react_1.default.createElement(ink_1.Text, { color: "green" },
            "\u60A8\u7684\u9009\u62E9\u662F \u6846\u67B6\uFF1A",
            map_1.FrameMap[record.current.frame],
            "\uFF0C\u9879\u76EE\u7C7B\u578B\u662F\uFF1A",
            map_1.ProjectMap[record.current.projectType],
            "\uFF0C \u4ED3\u5E93\u7BA1\u7406\u6A21\u5F0F\u662F",
            record.current.isMonorepo ? 'monorepo' : 'basics'));
    }
    else {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ink_1.Text, { color: "green" }, titleMap[step]),
            react_1.default.createElement(ink_select_input_1.default, { items: itemMap[step], onSelect: handleSelect })));
    }
};
exports.default = App;
