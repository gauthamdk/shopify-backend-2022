"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadResource = void 0;
const json2csv_1 = require("json2csv");
const downloadResource = (res, fileName, fields, data) => {
    const json2csv = new json2csv_1.Parser({ fields });
    const csv = json2csv.parse(data);
    res.header("Content-Type", "text/csv");
    res.attachment(fileName);
    return res.send(csv);
};
exports.downloadResource = downloadResource;
//# sourceMappingURL=download.js.map