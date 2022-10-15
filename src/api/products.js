export default async function getProducts() {
  const url =
    "https://ecommerce-backend-test-asq4pnttb-lea23vc.vercel.app/products";
  const response = await fetch(url);

  return await response.json();
}
