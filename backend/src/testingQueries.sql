-- Requisito 2
SELECT id AS saleId, date, sales_products.product_id AS productId, sales_products.quantity FROM sales
INNER JOIN sales_products ON sales_products.sale_id = sales.id
ORDER BY saleId, productId;

SELECT date, sales_products.product_id AS productId, sales_products.quantity FROM sales
INNER JOIN sales_products ON sales_products.sale_id = sales.id
WHERE id = 1;


