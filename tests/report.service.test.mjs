import assert from "node:assert/strict";
import { test } from "node:test";
import { validateReport } from "../src/validation/report.validation.ts";

function validReport() {
  const data = new FormData();
  data.set("image", new File(["fixture"], "dog.png", { type: "image/png" }));
  data.set("location", "Providencia, plaza de referencia");
  data.set("description", "Perrito café con collar azul");
  return data;
}

test("accepts a report without optional contact", () => {
  const data = validReport();
  assert.equal(validateReport(data), null);
});

test("rejects missing, empty, oversized or unsupported photos", () => {
  for (const file of [
    null,
    new File([], "empty.png", { type: "image/png" }),
    new File([new Uint8Array(5242881)], "large.png", { type: "image/png" }),
    new File(["text"], "note.txt", { type: "text/plain" }),
  ]) {
    const data = validReport();
    if (file) data.set("image", file);
    else data.delete("image");
    assert.ok(validateReport(data));
  }
});

test("rejects whitespace-only and oversized required fields", () => {
  for (const [name, value] of [
    ["location", "   "],
    ["description", "\n"],
    ["location", "x".repeat(201)],
    ["description", "x".repeat(1001)],
  ]) {
    const data = validReport();
    data.set(name, value);
    assert.ok(validateReport(data));
  }
});

test("accepts optional contact and rejects oversized names", () => {
  const data = validReport();
  data.set("contactName", "Persona de prueba");
  data.set("contactPhone", "+56 9 0000 0000");
  assert.equal(validateReport(data), null);
  data.set("contactName", "x".repeat(101));
  assert.ok(validateReport(data));
});

test("accepts empty and complete Chilean phones and rejects partial phones", () => {
  const data = validReport();
  for (const phone of ["", "+56 9 1234 5678", "+56 2 1234 5678"]) {
    data.set("contactPhone", phone);
    assert.equal(validateReport(data), null);
  }
  for (const phone of [
    "+56",
    "+56 9 1234 567",
    "+56 9 1234 56789",
    "912345678",
  ]) {
    data.set("contactPhone", phone);
    assert.equal(
      validateReport(data),
      "Completa los 9 dígitos del teléfono o deja el campo vacío.",
    );
  }
});
