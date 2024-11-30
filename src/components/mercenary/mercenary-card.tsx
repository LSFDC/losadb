import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Mercenary } from '@/types/mercenary'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface MercenaryCardProps {
    hero: Mercenary
}

export function MercenaryCard({ hero }: MercenaryCardProps) {
    return (
        <Card className="m-2 mx-auto my-4 mt-2 w-full overflow-hidden rounded-lg p-2 shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 md:mx-2">
            <div className="flex">
                <Image
                    src={hero.image}
                    alt={hero.name}
                    className="m-2 h-[100px] w-[100px] flex-none rounded-md md:h-[128px] md:w-[128px]"
                    width={128}
                    height={128}
                    loading="lazy"
                />
                <div className="flex w-full flex-col justify-between">
                    <div className="flex flex-col">
                        <h3 className="ml-2 w-full break-words text-[18px] font-bold  md:mt-[12px] ">
                            {hero.name}
                            <Badge className="text-xs ml-2" variant="secondary">{hero.id}</Badge>
                        </h3>
                        <div className="mt-0 ml-2 flex">
                            {hero.types.map((type) => (
                                <Badge key={type} className={cn("bg-gray-700 mr-2 flex h-6 w-20 items-center justify-center rounded-md px-1 text-xs font-semibold text-white md:mt-2", {
                                    'bg-blue-700': type === 'Premium',
                                    'bg-orange-700': type === 'Rare',
                                    'bg-purple-700': type === 'Unique',
                                    'bg-green-700': type === 'Reform',
                                    'bg-pink-700': type === 'Idol',

                                })}>
                                    {type}
                                </Badge>
                            ))}

                        </div>
                    </div>
                    <div className="flex items-center justify-between md:mt-3">
                        <Link
                            aria-label="View Hero"
                            type="button"
                            className="group relative m-2 w-full overflow-hidden rounded-md bg-emerald-600 p-2 text-center text-sm font-bold text-black transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-emerald-600 hover:to-emerald-500"
                            href="#"
                        >
                            View
                        </Link>
                    </div>
                </div>
            </div>
        </Card>



    )
}