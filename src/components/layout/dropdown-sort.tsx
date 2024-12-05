"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,

    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter, useSearchParams } from "next/navigation"


const sortList = [
    {
        value: "id.asc",
        label: "ID ASC",
    },
    {
        value: "id.dsc",
        label: "ID DSC",
    },
    {
        value: "name.asc",
        label: "Name ASC",
    },
    {
        value: "name.dsc",
        label: "Name DSC",
    },
    {
        value: "attack.asc",
        label: "Attack ASC",
    },
    {
        value: "attack.dsc",
        label: "Attack DSC",
    },


]


export function DropdownSort() {

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const searchParams = new URLSearchParams();

    const router = useRouter()
    //get current search params
    const query = useSearchParams()
    const category = query.get("category")


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a sort"
                    className="w-[200px] justify-between bg-blue-700 text-white hover:bg-blue-600"
                >
                    {value
                        ? sortList.find((sort) => sort.value === value)?.label
                        : "Sort By"}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandEmpty>No sort found.</CommandEmpty>
                        <CommandGroup>
                            {sortList.map((list) => (
                                <CommandItem
                                    key={list.value}
                                    value={list.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        searchParams.set('sort', currentValue === value ? "" : currentValue);
                                        router.replace(`/?${category ? `category=${category}&` : ""}${searchParams.toString()}`);
                                        setOpen(false)
                                    }}
                                >
                                    {list.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === list.value ? "opacity-100" : "opacity-0"
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
