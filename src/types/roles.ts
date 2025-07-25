export const roles = {
  admin: "admin",
  manager: "manager",
  cashier: "cashier",
  stock_keeper: "stock_keeper",
};

export const permissions = {
  manage_users: "manage_users",
  manage_products: "manage_products",
  manage_categories: "manage_categories",
  view_sales: "view_sales",
  adjust_inventory: "adjust_inventory",
  record_sale: "record_sale",
};

export const rolePermissions = {
  [roles.admin]: [
    permissions.manage_users,
    permissions.manage_products,
    permissions.manage_categories,
    permissions.view_sales,
    permissions.adjust_inventory,
  ],
  [roles.manager]: [
    permissions.manage_products,
    permissions.manage_categories,
    permissions.view_sales,
    permissions.adjust_inventory,
  ],
  [roles.cashier]: [
    permissions.record_sale,
    permissions.view_sales,
    permissions.adjust_inventory,
  ],
  [roles.stock_keeper]: [permissions.adjust_inventory],
};
