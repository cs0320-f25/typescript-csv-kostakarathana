import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const FOODS_CSV_PATH = path.join(__dirname, "../data/foods.csv");
const COUNTRIES_CSV_PATH = path.join(__dirname, "../data/countries.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]);
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

// --- Foods CSV tests ---

test("parseCSV parses foods.csv header and rows correctly", async () => {
  const results = await parseCSV(FOODS_CSV_PATH);

  expect(results.length).toBe(10);
  expect(results[0]).toEqual(["name", "type", "calories", "color", "origin"]);
  expect(results[1]).toEqual(["Apple", "Fruit", "52", "Red", "USA"]);
  expect(results[2]).toEqual(["Banana", "Fruit", "89", "Yellow", "Ecuador"]);
  expect(results[3]).toEqual(["Broccoli", "Vegetable", "34", "Green", "Italy"]);
  expect(results[4]).toEqual(["Chicken Breast", "Meat", "165", "White", "USA"]);
  expect(results[5]).toEqual(["Salmon", "Fish", "208", "Pink", "Norway"]);
  expect(results[6]).toEqual(["Carrot", "Vegetable", "41", "Orange", "France"]);
  expect(results[7]).toEqual(["Rice", "Grain", "130", "White", "China"]);
  expect(results[8]).toEqual(["Egg", "Protein", "155", "White", "Global"]);
  expect(results[9]).toEqual(["Cheddar Cheese", "Dairy", "402", "Yellow", "England"]);
});

test("parseCSV yields only arrays for foods.csv", async () => {
  const results = await parseCSV(FOODS_CSV_PATH);
  for (const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("parseCSV handles foods.csv row values as strings", async () => {
  const results = await parseCSV(FOODS_CSV_PATH);
  for (const row of results) {
    for (const cell of row) {
      expect(typeof cell).toBe("string");
    }
  }
});

// --- Countries CSV tests ---

test("parseCSV parses countries.csv header and first/last rows correctly", async () => {
  const results = await parseCSV(COUNTRIES_CSV_PATH);

  expect(results.length).toBe(21); // 1 header + 20 rows
  expect(results[0]).toEqual([
    "Country",
    "Continent",
    "Crime Rate (per 100k)",
    "Area (sq km)",
    "Population",
    "Landlocked"
  ]);
  expect(results[1]).toEqual([
    "United States",
    "North America",
    "3980",
    "9833517",
    "331002651",
    "No"
  ]);
  expect(results[10]).toEqual([
    "Kazakhstan",
    "Asia",
    "900",
    "2724900",
    "18776707",
    "Yes"
  ]);
  expect(results[20]).toEqual([
    "Mexico",
    "North America",
    "3200",
    "1964375",
    "128932753",
    "No"
  ]);
});

test("parseCSV yields only arrays for countries.csv", async () => {
  const results = await parseCSV(COUNTRIES_CSV_PATH);
  for (const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("parseCSV handles countries.csv row values as strings", async () => {
  const results = await parseCSV(COUNTRIES_CSV_PATH);
  for (const row of results) {
    for (const cell of row) {
      expect(typeof cell).toBe("string");
    }
  }
});

test("parseCSV parses landlocked countries correctly", async () => {
  const results = await parseCSV(COUNTRIES_CSV_PATH);
  // Find all landlocked countries
  const landlocked = results.filter(row => row[5] === "Yes");
  // Header row is not landlocked
  expect(landlocked.length).toBe(7);
  const expected = [
    "Switzerland",
    "Austria",
    "Nepal",
    "Kazakhstan",
    "Mongolia",
    "Luxembourg",
    "Liechtenstein"
  ];
  const found = landlocked.map(row => row[0]);
  expect(found.sort()).toEqual(expected.sort());
});

test("parseCSV parses population and area as string numbers", async () => {
  const results = await parseCSV(COUNTRIES_CSV_PATH);
  // skip header
  for (let i = 1; i < results.length; i++) {
    const row = results[i];
    expect(typeof row[3]).toBe("string"); // Area (sq km)
    expect(typeof row[4]).toBe("string"); // Population
    expect(!isNaN(Number(row[3]))).toBe(true);
    expect(!isNaN(Number(row[4]))).toBe(true);
  }
});
