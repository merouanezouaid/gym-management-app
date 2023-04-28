module.exports = (phoneNumberString) => {
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