import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
  name: "sales",
  title: "Sales",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Sale Title",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Sale Description",
    }),
    defineField({
      name: "discountAmount",
      type: "number",
      title: "Discount Amount",
      description: "Amount off in percentage or fixed value",
    }),
    defineField({
      name: "couponCode",
      type: "string",
      title: "Coupon Code",
    }),
    defineField({
      name: "validFrom",
      type: "datetime",
      title: "Valid From",
    }),
    defineField({
      name: "validUntil",
      type: "datetime",
      title: "Valid Until",
    }),
    defineField({
      name: "isActive",
      type: "boolean",
      title: "Is Active",
      description: "Toggle to activate or deactivate the sale",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      discountAmount: "discountAmount",
      couponCode: "couponCode",
      isActive: "isActive",
    },
    prepare({ title, discountAmount, couponCode, isActive }) {
      return {
        title: title,
        subtitle: `${discountAmount}% off with code ${couponCode} - ${
          isActive ? "Active" : "Inactive"
        }`,
      };
    },
  },
});
