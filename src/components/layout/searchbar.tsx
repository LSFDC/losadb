'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

import { DropdownCategory } from './dropdown-category'


export function SearchBar() {
    return (
        <div className="relative">
            <div className="flex gap-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search heroes..."
                    className="pl-9"
                />
                <DropdownCategory />
            </div>

        </div>
    )
}