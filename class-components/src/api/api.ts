import type { Item } from "../types/Item"

export const fetchItems = async (search: string = ""): Promise<Item[]> => {
  const url = search
    ? `https://swapi.py4e.com/api/people/?search=${search}`
    : `https://swapi.py4e.com/api/people/`

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  const data = await res.json()

  return data.results.map((item: any) => ({
    name: item.name,
    description: `Height: ${item.height}, Gender: ${item.gender}`
  }))
}