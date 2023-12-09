import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalizeFirstLetter = (str: string | undefined): string => {
  // Handling undefined or empty string
  if (!str) {
    return "";
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatPlural = (
  count: number,
  singularText: string,
  pluralText: string
) => {
  return count === 1 ? `${count} ${singularText}` : `${count} ${pluralText}`;
};

export const absoluteUrl = (path: string) => {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
};
