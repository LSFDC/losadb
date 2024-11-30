"use client"
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Mercenary } from '@/types/mercenary'

interface MercenaryCardProps {
    hero: Mercenary
}

export function MercenaryCard({ hero }: MercenaryCardProps) {
    const [imageSrc, setImageSrc] = useState(hero.thumb_male);

    return (
        <Card className="m-2 mx-auto my-4 mt-2 w-full overflow-hidden rounded-lg p-2 shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 md:mx-2">
            <div className="flex">
                <Image
                    src={imageSrc}
                    alt={hero.name}
                    className="m-2 h-[100px] w-[100px] flex-none rounded-md md:h-[128px] md:w-[128px]"
                    width={128}
                    height={128}
                    onMouseEnter={() => setImageSrc(hero.thumb_female)}
                    onMouseLeave={() => setImageSrc(hero.thumb_male)}


                    priority
                />
                <div className="flex w-full flex-col justify-between">
                    <div className="flex flex-col">
                        <h3 className="ml-2 w-full break-words text-[18px] font-bold  md:mt-[12px] ">
                            {hero.name}
                            <Badge className="text-xs ml-2" variant="secondary">{hero.id.toString().padStart(3, '0')}</Badge>
                        </h3>
                        <div className="mt-0 ml-2 flex">
                            <Badge className={cn("bg-gray-700 mr-2 flex h-6 w-20 items-center justify-center rounded-md px-1 text-xs font-semibold text-white md:mt-2", {
                                'bg-blue-700 hover:bg-blue-800': hero.type === 'Premium',
                                'bg-orange-700 hover:bg-orange-800': hero.type === 'Rare',
                                'bg-purple-700 hover:bg-purple-800': hero.type === 'Unique',
                                'bg-green-700 hover:bg-green-800': hero.type === 'Reform',
                                'bg-pink-700 hover:bg-pink-800': hero.type === 'Idol',

                            })}>
                                {hero.type}
                            </Badge>
                            <Badge className={cn("bg-gray-700 mr-2 flex h-6 w-20 items-center justify-center rounded-md px-1 text-xs font-semibold text-white md:mt-2")}>
                                {hero.AttackType}
                            </Badge>


                        </div>
                    </div>
                    <div className="flex items-center justify-between md:mt-3">
                        <Link
                            aria-label="View Hero"
                            type="button"
                            className="group relative m-2 w-full overflow-hidden rounded-md bg-emerald-600 p-2 text-center text-sm font-bold  transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-emerald-600 hover:to-emerald-500"
                            href="#"
                        >
                            Detail
                        </Link>
                    </div>
                </div>
            </div>
        </Card>



    )
}