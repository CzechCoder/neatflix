export const truncateString = (str: string, number: number) => {
  if (str?.length > number) {
    return str.slice(0, number) + "...";
  } else {
    return str;
  }
};
