const NUMBERS_0_29: Record<number, string> = {
  0: "cero",
  1: "uno",
  2: "dos",
  3: "tres",
  4: "cuatro",
  5: "cinco",
  6: "seis",
  7: "siete",
  8: "ocho",
  9: "nueve",
  10: "diez",
  11: "once",
  12: "doce",
  13: "trece",
  14: "catorce",
  15: "quince",
  16: "dieciséis",
  17: "diecisiete",
  18: "dieciocho",
  19: "diecinueve",
  20: "veinte",
  21: "veintiuno",
  22: "veintidós",
  23: "veintitrés",
  24: "veinticuatro",
  25: "veinticinco",
  26: "veintiséis",
  27: "veintisiete",
  28: "veintiocho",
  29: "veintinueve",
};

const TENS: Record<number, string> = {
  3: "treinta",
  4: "cuarenta",
  5: "cincuenta",
  6: "sesenta",
  7: "setenta",
  8: "ochenta",
  9: "noventa",
};

const numberToSpanish = (n: number): string => {
  if (n in NUMBERS_0_29) return NUMBERS_0_29[n];
  if (n >= 30 && n <= 99) {
    const tens = Math.floor(n / 10);
    const ones = n % 10;
    return ones === 0
      ? TENS[tens]
      : `${TENS[tens]} y ${NUMBERS_0_29[ones]}`;
  }
  return String(n);
};

const capitalize = (s: string): string =>
  s.length === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1);

export interface DurationParts {
  months: number;
  days: number;
}

// Calendar-based diff. If end's day-of-month is earlier than start's, borrow
// one month and add the borrowed month's days. Years roll up into months.
export const diffMonthsDays = (start: Date, end: Date): DurationParts => {
  if (end < start) {
    const flipped = diffMonthsDays(end, start);
    return { months: flipped.months, days: flipped.days };
  }

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    // Days in the month preceding `end`.
    const prev = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prev.getDate();
  }

  return { months: Math.max(0, months), days: Math.max(0, days) };
};

// e.g. "Doce (12) meses", "Dos (2) meses y nueve (9) días", "Quince (15) días"
export const formatProjectDuration = (start: Date, end: Date): string => {
  const { months, days } = diffMonthsDays(start, end);

  if (months === 0 && days === 0) return "Mismo día";

  const parts: string[] = [];

  if (months > 0) {
    const word = numberToSpanish(months);
    parts.push(`${capitalize(word)} (${months}) ${months === 1 ? "mes" : "meses"}`);
  }

  if (days > 0) {
    const word = numberToSpanish(days);
    const formatted = `${months > 0 ? word : capitalize(word)} (${days}) ${days === 1 ? "día" : "días"}`;
    parts.push(formatted);
  }

  return parts.join(" y ");
};
