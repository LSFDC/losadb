'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { DropdownCategory } from './dropdown-category'
import { useRouter } from 'next/navigation';
import { DropdownAttackType } from './dropdown-attack';


export function SearchBar() {
    const searchParams = new URLSearchParams();
    const router = useRouter()


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        searchParams.set('search', event.target.value);
        router.replace(`/?${searchParams.toString()}`);
    };

    return (
        <div className="relative">
            <div className="flex gap-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search heroes..."
                    onChange={handleSearchChange}
                    className="pl-9"
                />
                <DropdownCategory />
                <DropdownAttackType />
            </div>

        </div>
    )
}