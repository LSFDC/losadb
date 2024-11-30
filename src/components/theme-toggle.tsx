'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)
    React.useEffect(() => {
        setMounted(true)
    }, [])
    if (!mounted) return null

    return (
        <div className="flex items-center gap-2">
            <Sun className={cn("h-4 w-4", theme === 'dark' && 'opacity-50')} />
            <Switch
                checked={theme === 'dark'}

                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
            <Moon className={cn("h-4 w-4", theme === 'light' && 'opacity-50')} />
        </div>
    )
}