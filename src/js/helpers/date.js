import { format } from "date-fns";

/**
 *
 * @param {String} str - data type string
 * @param {String} type - 'yyy.mm.dd'
 */
export function formatDate(str, type) {
  const date = new Date(str);
  return format(date, type);
}
