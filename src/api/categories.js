export default async function getCategories() {
  const url =
    "https://ecommerce-backend-test-asq4pnttb-lea23vc.vercel.app/categories";
  const response = await fetch(url);

  return await response.json();
}
