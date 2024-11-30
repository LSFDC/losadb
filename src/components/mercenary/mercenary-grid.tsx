import { mercenary } from '@/data/mercenary'
import { MercenaryCard } from './mercenary-card'


export function MercenaryGrid({
    search,
    category,
    attack
}: {
    search?: string
    category?: string
    attack?: string
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


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMercenaries.length > 0 ? (
                filteredMercenaries.sort((a, b) => a.id - b.id).map((hero) => (
                    <MercenaryCard key={hero.id} hero={hero} />
                ))
            ) : (
                <p>Heroes not found .</p>
            )}
        </div>
    );
}
