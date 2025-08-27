export function dateTransform(stringDate: string) {
  const [day, month, year] = stringDate
    .split("/")
    .map((num) => parseInt(num, 10));

  const utcDate = new Date(Date.UTC(year, month - 1, day));
  const selectedDate = new Date(
    utcDate.getTime() + utcDate.getTimezoneOffset() * 60000
  );

  return selectedDate;
}