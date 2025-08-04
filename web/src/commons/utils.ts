export const ValidatorMessage = {
  fieldRequired: (s?: string) => `${s ?? "Field"} is required`,
};

export const convertDateTimeInput = (dateStr?: string) => {
  if (!dateStr) {
    return "";
  }

  const date = new Date(dateStr);
  const yyyy = date.getFullYear();
  const MM = date.getMonth() + 1;
  const dd = date.getDate();
  const HH = date.getHours();
  const mm = date.getMinutes();
  return `${yyyy}-${MM < 10 ? "0" + MM : MM}-${dd < 10 ? "0" + dd : dd}T${HH}:${mm}`;
};

export const convertDateTimeLocale = (dateStr?: string) => {
  if (!dateStr) {
    return "";
  }

  const date = new Date(dateStr);
  return date.toLocaleString();
};
