export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
