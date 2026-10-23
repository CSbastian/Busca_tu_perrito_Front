import assert from "node:assert/strict";
import { test } from "node:test";
import { reportFoundDog, validateReport } from "../src/services/report.service.ts";

function validReport() {
  const data = new FormData();
  data.set("image", new File(["fixture"], "dog.png", { type: "image/png" }));
  data.set("location", "Providencia, plaza de referencia");
  data.set("description", "Perrito café con collar azul");
  return data;
}

test("accepts a report without optional contact and completes the simulation", async () => {
  const data = validReport();
  assert.equal(validateReport(data), null);
  await assert.doesNotReject(reportFoundDog(data));
});

test("rejects missing, empty, oversized or unsupported photos", () => {
  for (const file of [null, new File([], "empty.png", { type: "image/png" }), new File([new Uint8Array(5242881)], "large.png", { type: "image/png" }), new File(["text"], "note.txt", { type: "text/plain" })]) {
    const data = validReport();
    if (file) data.set("image", file); else data.delete("image");
    assert.ok(validateReport(data));
  }
});

test("rejects whitespace-only and oversized required fields", () => {
  for (const [name, value] of [["location", "   "], ["description", "\n"], ["location", "x".repeat(201)], ["description", "x".repeat(1001)]]) {
    const data = validReport();
    data.set(name, value);
    assert.ok(validateReport(data));
  }
});

test("accepts optional contact and rejects oversized values", () => {
  const data = validReport();
  data.set("contactName", "Persona de prueba");
  data.set("contactPhone", "+56 9 0000 0000");
  assert.equal(validateReport(data), null);
  data.set("contactPhone", "1".repeat(41));
  assert.ok(validateReport(data));
});
