"use client";

import { useState } from "react";
import type { ChangeEvent, ClipboardEvent } from "react";

const phonePrefix = "+56";
const maxDigits = 9;

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

function formatDigits(digits: string) {
  return [digits.slice(0, 1), digits.slice(1, 5), digits.slice(5)]
    .filter(Boolean)
    .join(" ");
}

function caretForDigits(value: string, count: number) {
  let position = 0;
  while (count > 0 && position < value.length) {
    if (value[position] !== " ") count -= 1;
    position += 1;
  }
  return position;
}

export default function ChileanPhoneInput({
  id,
  name,
  onValueChange,
  error,
}: {
  id: string;
  name: string;
  onValueChange: () => void;
  error?: string;
}) {
  const [digits, setDigits] = useState("");
  const formatted = formatDigits(digits);
  const helpId = `${id}-help`;

  function update(
    input: HTMLInputElement,
    nextDigits: string,
    digitsBeforeCaret: number,
  ) {
    if (nextDigits.length > maxDigits) nextDigits = digits;

    // Restore the caret against the formatted value before React commits it.
    const nextValue = formatDigits(nextDigits);
    input.value = nextValue;
    const caret = caretForDigits(nextValue, digitsBeforeCaret);
    input.setSelectionRange(caret, caret);

    if (nextDigits !== digits) {
      setDigits(nextDigits);
      onValueChange();
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const value = input.value;
    let nextDigits = digitsOnly(value);
    let beforeCaret = digitsOnly(
      value.slice(0, input.selectionStart ?? value.length),
    ).length;
    const { inputType } = event.nativeEvent as InputEvent;

    // Deleting a formatting space should remove the digit next to it.
    if (nextDigits === digits && value.length === formatted.length - 1) {
      if (inputType === "deleteContentBackward") beforeCaret -= 1;
      if (
        inputType === "deleteContentBackward" ||
        inputType === "deleteContentForward"
      ) {
        nextDigits =
          digits.slice(0, beforeCaret) + digits.slice(beforeCaret + 1);
      }
    }

    update(input, nextDigits, beforeCaret);
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const input = event.currentTarget;
    const pasted = digitsOnly(
      event.clipboardData.getData("text").trim().replace(/^\+56/, ""),
    );
    if (!pasted) return;

    const start = digitsOnly(
      formatted.slice(0, input.selectionStart ?? formatted.length),
    ).length;
    const end = digitsOnly(
      formatted.slice(0, input.selectionEnd ?? formatted.length),
    ).length;
    const nextDigits = digits.slice(0, start) + pasted + digits.slice(end);
    if (nextDigits.length <= maxDigits) {
      update(input, nextDigits, start + pasted.length);
    }
  }

  return (
    <>
      <div className="mt-2 flex items-center rounded-ui border border-input-border bg-surface text-base focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-accent">
        <span
          aria-hidden="true"
          className="shrink-0 border-r border-line px-3 font-semibold"
        >
          {phonePrefix}
        </span>
        <input
          id={id}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          data-report-field="contactPhone"
          aria-invalid={!!error || undefined}
          aria-describedby={`${helpId}${error ? ` ${id}-error` : ""}`}
          placeholder="9 1234 5678"
          value={formatted}
          onChange={handleChange}
          onPaste={handlePaste}
          className="min-h-11 min-w-0 flex-1 rounded-ui bg-transparent px-3 py-3 outline-none"
        />
      </div>
      <p id={helpId} className="mt-2 text-sm text-muted">
        Prefijo +56. Ingresa los 9 dígitos.
      </p>
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-sm text-red-700"
        >
          {error}
        </p>
      ) : null}
      <input
        type="hidden"
        name={name}
        value={digits ? `${phonePrefix} ${formatted}` : ""}
      />
    </>
  );
}
