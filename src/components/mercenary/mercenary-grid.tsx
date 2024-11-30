import { mercenary } from '@/data/mercenary'
import { MercenaryCard } from './mercenary-card'

export function MercenaryGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mercenary.map((hero) => (
                <MercenaryCard key={hero.id} hero={hero} />
            ))}
        </div>
    )
}