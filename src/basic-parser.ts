import * as fs from "fs";
import * as readline from "readline";
import { ZodType } from "zod";

export async function parseCSV(path: string): Promise<string[][]>;
export async function parseCSV<T>(path: string, schema: ZodType<T>): Promise<T[]>;

export async function parseCSV<T>(
  path: string,
  schema?: ZodType<T>
): Promise<string[][] | T[]> {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  // No schema → original behavior
  if (!schema) {
    const result: string[][] = [];
    for await (const line of rl) {
      const values = line.split(",").map((v) => v.trim());
      result.push(values);
    }
    return result;
  }

  // Schema provided → validate + transform rows into T
  const typed: T[] = [];
  let row = 0;
  for await (const line of rl) {
    row++;
    const values = line.split(",").map((v) => v.trim());
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      throw new Error(`CSV validation failed on row ${row}: ${parsed.error.message}`);
    }
    typed.push(parsed.data);
  }
  return typed;
}