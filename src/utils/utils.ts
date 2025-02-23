export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// función 1. No se usa 😁
export function formatDate1(date: string): string {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year.slice(2)}`;
}

// función 2. Esta si se usa 😁
export const formatDate2 = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:00`;
};
