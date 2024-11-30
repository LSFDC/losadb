'use client'

import { Database, } from 'lucide-react'
import { ThemeToggle } from '../theme-toggle'


export function Header() {
    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Database className="h-6 w-6 text-primary" />
                    <h1 className="text-xl font-bold">Lost Saga Database</h1>
                </div>
                <ThemeToggle />
            </div>
        </header>
    )
}