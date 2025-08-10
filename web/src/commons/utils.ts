export const ValidatorMessage = {
  fieldRequired: (s?: string) => `${s ?? "Field"} is required`,
};

export const convertDateTimeInput = (dateStr?: string) => {
  if (!dateStr) {
    return "";
  }

  const date = new Date(dateStr);
  const parseValue = (v: number): string => (v < 10 ? "0" + v : "" + v);
  const yyyy = date.getFullYear();
  const MM = parseValue(date.getMonth() + 1);
  const dd = parseValue(date.getDate());
  const HH = parseValue(date.getHours());
  const mm = parseValue(date.getMinutes());
  return `${yyyy}-${MM}-${dd}T${HH}:${mm}`;
};

export const convertDateTimeLocale = (dateStr?: string) => {
  if (!dateStr) {
    return "";
  }

  const date = new Date(dateStr);
  return date.toLocaleString();
};
