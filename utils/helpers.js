export const toSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const scrollToElement = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};
