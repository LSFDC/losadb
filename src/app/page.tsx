import { SearchBar } from "@/components/layout/searchbar";
import { MercenaryGrid } from "@/components/mercenary/mercenary-grid";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | undefined }>
}) {

  const search = (await searchParams)?.search
  const category = (await searchParams)?.category
  const attack = (await searchParams)?.attack
  const sort = (await searchParams)?.sort

  return (
    <div className="space-y-8">
      <SearchBar />
      <MercenaryGrid search={search} category={category} attack={attack} sort={sort} />
    </div>
  );
}
