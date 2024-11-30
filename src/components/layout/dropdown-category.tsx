"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter } from "next/navigation"


const categories = [
    {
        value: "normal",
        label: "Normal",
    },
    {
        value: "premium",
        label: "Premium",
    },
    {
        value: "rare",
        label: "Rare",
    },
    {
        value: "unique",
        label: "Unique",
    },
    {
        value: "reform",
        label: "Reform",
    },
    {
        value: "idol",
        label: "Idol",
    },
]


export function DropdownCategory() {

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const searchParams = new URLSearchParams();
    const router = useRouter()

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between bg-blue-700 text-white hover:bg-blue-600"
                >
                    {value
                        ? categories.find((framework) => framework.value === value)?.label
                        : "Category"}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                            {categories.map((category) => (
                                <CommandItem
                                    key={category.value}
                                    value={category.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        searchParams.set('category', currentValue === value ? "" : currentValue);
                                        router.push(`/?${searchParams.toString()}`);
                                        setOpen(false)
                                    }}
                                >
                                    {category.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === category.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
