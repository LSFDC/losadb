import { mercenary } from '@/data/mercenary';
import { MercenaryCard } from './mercenary-card';

export function MercenaryGrid({
    search,
    category,
    attack,
    sort,
}: {
    search?: string;
    category?: string;
    attack?: string;
    sort?: string;
}) {
    // Filter the mercenary data
    const filteredMercenaries = mercenary.filter((hero) => {
        const matchesSearch = search
            ? hero.name.toLowerCase().includes(decodeURIComponent(search).toLowerCase())
            : true;

        const matchesCategory = category
            ? hero.type.toLowerCase() === category?.toLowerCase()
            : true;

        const matchesAttack = attack
            ? hero.AttackType.toLowerCase() === attack?.toLowerCase()
            : true;

        return matchesSearch && matchesCategory && matchesAttack;
    });

    // Sort the filtered data
    const sortedMercenaries = filteredMercenaries.sort((a, b) => {
        if (!sort) return a.id - b.id;; // No sorting if `sort` is not provided

        switch (sort.toLowerCase()) {
            case 'name.asc':
                return a.name.localeCompare(b.name);
            case 'name.dsc':
                return b.name.localeCompare(a.name);
            case 'attack.asc':
                return a.AttackType.localeCompare(b.AttackType);
            case 'attack.dsc':
                return b.AttackType.localeCompare(a.AttackType);
            case 'id.asc':
                return a.id - b.id;
            case 'id.dsc':
                return b.id - a.id;
            default:
                return a.id - b.id;
        }
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedMercenaries.length > 0 ? (
                sortedMercenaries.map((hero) => (
                    <MercenaryCard key={hero.id} hero={hero} />
                ))
            ) : (
                <p>Heroes not found.</p>
            )}
        </div>
    );
}
