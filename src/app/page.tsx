import { SearchBar } from "@/components/layout/searchbar";
import { MercenaryGrid } from "@/components/mercenary/mercenary-grid";

export default function Home() {
  return (
    <div className="space-y-8">
      <SearchBar />
      <MercenaryGrid />
    </div>
  );
}
