"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inventory_1 = require("../db/models/inventory");
const download_1 = require("../functions/download");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    inventory_1.Item.find({}, (err, items) => {
        if (err) {
            res.json({ message: "Error retrieving items" });
        }
        else {
            res.send(items);
        }
    });
});
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newItem = req.body;
    const item = inventory_1.Item.build(newItem);
    inventory_1.Item.create(item, (err, newItem) => {
        if (err) {
            res.json({ message: `Error adding new item: ${err}` });
        }
        else {
            res.json({ message: "Created successfully" });
        }
    });
}));
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const item = req.body;
    inventory_1.Item.findByIdAndUpdate(id, item, (err, newItem) => {
        if (err) {
            res.json({ message: `Error updating item: ${err}` });
        }
        else {
            res.json({ message: "Item updated successfully" });
        }
    });
});
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    inventory_1.Item.findByIdAndDelete(id, (err) => {
        if (err) {
            res.json({ message: `Error deleting item: ${err}` });
        }
        else {
            res.json({ message: "Item deleted successfully" });
        }
    });
});
router.get("/download", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = [
        { label: "Name", value: "name" },
        { label: "Description", value: "description" },
        { label: "Amount", value: "amount" },
    ];
    inventory_1.Item.find({}, (err, items) => {
        if (err) {
            res.json({ message: "Error downloading data" });
        }
        else {
            return (0, download_1.downloadResource)(res, "items.csv", fields, items);
        }
    });
}));
exports.default = router;
//# sourceMappingURL=ItemRoutes.js.map