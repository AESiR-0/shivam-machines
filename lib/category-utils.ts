import type { MachineToolCategory, Product } from "@/lib/sanity/types";

function normalizeCategoryKey(value: string | undefined | null) {
  return (value || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/\b(machine|machines)\b/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getMachineCategoryId(category: MachineToolCategory) {
  if (category.href?.includes("category=")) {
    const rawValue = category.href.split("category=")[1]?.split("&")[0];
    const normalized = normalizeCategoryKey(rawValue);
    if (normalized) {
      return normalized;
    }
  }

  return (
    normalizeCategoryKey(category.slug?.current) ||
    normalizeCategoryKey(category.name)
  );
}

export function getMachineCategoryDisplayName(category: MachineToolCategory) {
  return category.name.charAt(0).toUpperCase() + category.name.slice(1);
}

export function getProductCategoryKey(category: Product["category"] | string | null | undefined) {
  if (!category) {
    return "";
  }

  if (typeof category === "string") {
    return normalizeCategoryKey(category);
  }

  return normalizeCategoryKey(category.slug || category.name);
}

export function getProductCategoryName(category: Product["category"] | string | null | undefined) {
  if (!category) {
    return "Uncategorized";
  }

  if (typeof category === "string") {
    return category;
  }

  return category.name;
}
