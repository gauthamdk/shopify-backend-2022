"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
(0, config_1.default)();
const itemSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: { type: String, required: true },
    amount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
itemSchema.statics.build = (attr) => {
    return new Item(attr);
};
const Item = mongoose_1.default.model("items", itemSchema);
exports.Item = Item;
//# sourceMappingURL=inventory.js.map