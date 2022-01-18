import { Parser } from "json2csv";
import { Response } from "express";

export const downloadResource = (
  res: Response,
  fileName: string,
  fields: any,
  data: any
) => {
  const json2csv = new Parser({ fields });
  const csv = json2csv.parse(data);
  res.header("Content-Type", "text/csv");
  res.attachment(fileName);
  return res.send(csv);
};
