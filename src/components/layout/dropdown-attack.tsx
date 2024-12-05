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


const attackType = [
    {
        value: "melee",
        label: "Melee",
    },
    {
        value: "range",
        label: "Range",
    },
    {
        value: "magic",
        label: "Magic",
    },
    {
        value: "special",
        label: "Special",
    },
    {
        value: "bomb",
        label: "Bomb",
    },

]


export function DropdownAttackType() {

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
                    aria-label="Select a attack type"
                    className="w-[200px] justify-between bg-blue-700 text-white hover:bg-blue-600"
                >
                    {value
                        ? attackType.find((framework) => framework.value === value)?.label
                        : "Attack Type"}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search Type..." />
                    <CommandList>
                        <CommandEmpty>No attack type found.</CommandEmpty>
                        <CommandGroup>
                            {attackType.map((type) => (
                                <CommandItem
                                    key={type.value}
                                    value={type.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        searchParams.set('attack', currentValue === value ? "" : currentValue);
                                        router.replace(`/?${searchParams.toString()}`);
                                        setOpen(false)
                                    }}
                                >
                                    {type.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === type.value ? "opacity-100" : "opacity-0"
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
