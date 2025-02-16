
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function formatDate(date: string): string {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year.slice(2)}`;
}