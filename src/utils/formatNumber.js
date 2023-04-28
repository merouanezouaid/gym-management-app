import { replace } from "lodash";
import numeral from "numeral";

// ----------------------------------------------------------------------

export function fCurrency(number) {
  return numeral(number).format(Number.isInteger(number) ? "$0,0" : "$0,0.00");
}

export function fPercent(number) {
  return numeral(number / 100).format("0.0%");
}

export function fNumber(number) {
  return numeral(number).format();
}

export function fShortenNumber(number) {
  return replace(numeral(number).format("0.00a"), ".00", "");
}

export function fData(number) {
  return numeral(number).format("0.0 b");
}

export function fPhone(phoneNumberString) {
  const cleaned = `${phoneNumberString}`.replace(/\D/g, "");
  const matchMa = cleaned.match(/^(\d{3})(\d{3})(\d{6})$/);
  const matchUS = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (matchMa) {
    return `+${matchMa[1]} ${matchMa[2]}-${matchMa[3]}`;
  }
  if (matchUS) {
    const intlCode = matchUS[1] ? "+1" : "";
    return [intlCode, "(", matchUS[2], ") ", matchUS[3], "-", matchUS[4]].join(
      ""
    );
  }
  return phoneNumberString;
}
