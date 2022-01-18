"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const ItemRoutes_1 = __importDefault(require("./routes/ItemRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", ItemRoutes_1.default);
app.get("*", (req, res) => {
    res.json({ message: "Requested route not found" });
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map