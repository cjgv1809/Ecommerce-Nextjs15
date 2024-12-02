import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Shopr Ecommerce")
    .items([
      S.documentTypeListItem("category").title("Categories"),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !["category"].includes(item.getId()!)
      ),
      S.divider(),
    ]);
