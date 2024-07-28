const parseDate = (dateStr: string): Date => {
  return new Date(dateStr);
};

export const sortByDate = (a: any, b: any) => {
  return (
    parseDate(a.frontmatter.date).getTime() -
    parseDate(b.frontmatter.date).getTime()
  );
};
