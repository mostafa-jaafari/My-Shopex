import { getProductsByIds } from "@/data/getProductById"

export async function POST(req: Request) {
  const { ids } = await req.json()

  if (!ids || !ids.length) {
    return Response.json([])
  }

  const products = await getProductsByIds(ids)

  return Response.json(products)
}