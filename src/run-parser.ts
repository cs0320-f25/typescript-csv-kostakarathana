// src/run-parser.ts
import { parseCSV } from "./basic-parser";
import { z } from "zod";

const DATA_FILE = "./data/people.csv";

// Accept the header row and map it to null; validate real rows.
const RowSchema = z.union([
  z.tuple([z.literal("name"), z.literal("age")]).transform(() => null),
  z.tuple([z.string(), z.coerce.number()]).transform(([name, age]) => ({ name, age })),
]);

type Row = z.infer<typeof RowSchema>;
type Person = Exclude<Row, null>;

async function main() {
  // Fallback behavior (no schema) unchanged
  const raw = await parseCSV(DATA_FILE);
  console.log(raw);

  // Schema path: validates each row and throws on invalid data
  try {
    const rows = await parseCSV<Row>(DATA_FILE, RowSchema);
    const people: Person[] = rows.filter((r): r is Person => r !== null);
    console.log(people);
  } catch (e) {
    // Caller handles validation failures (e.g., "Bob,thirty")
    console.error(String(e));
  }
}

main();