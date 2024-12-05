import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ApertureIcon, DatabaseIcon, GiftIcon, MedalIcon } from "lucide-react";
import Link from "next/link";

export default function ToolsPage() {
    return <div className="flex flex-col gap-3">
        <h1 className="text-lg font-bold">Tools</h1>
        <Separator className="" />
        <div className="grid grid-cols-3 gap-10 mb-5">
            <div className="flex w-full items-center gap-4 mt-3">
                <div className="flex items-center justify-center w-20 h-20 rounded-full">
                    <ApertureIcon className="w-20 h-20" />
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-bold">LSC Convert</h2>
                    <p className="text-gray-600">Simple tools to convert your GearDesign LSC file into DDS or convert your PNG files into DDS and LSC.</p>
                    <Button asChild className="w-full">
                        <Link href="#">Try Now</Link>
                    </Button>
                </div>
            </div>

            <div className="flex w-full items-center gap-4 mt-3">
                <div className="flex items-center justify-center w-20 h-20 rounded-full">
                    <ApertureIcon className="w-20 h-20" />
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-bold">PNG To DDS</h2>
                    <p className="text-gray-600">Simple tools to convert your PNG file into DDS.</p>
                    <Button asChild className="w-full">
                        <Link href="#">Try Now</Link>
                    </Button>
                </div>
            </div>



            <div className="flex w-full items-center gap-4 mt-3">
                <div className="flex items-center justify-center w-20 h-20 rounded-full">
                    <GiftIcon className="w-20 h-20" />
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-bold">Quest Generator</h2>
                    <p className="text-gray-600">a web service to create custom quest Lost saga.</p>
                    <Button asChild className="w-full">
                        <Link href="#">Try Now</Link>
                    </Button>
                </div>
            </div>

            <div className="flex w-full items-center gap-4 mt-3">
                <div className="flex items-center justify-center w-20 h-20 rounded-full">
                    <MedalIcon className="w-20 h-20" />
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-bold">Medal Generator</h2>
                    <p className="text-gray-600">a web service to create custom medal Lost saga.</p>
                    <Button asChild className="w-full">
                        <Link href="#">Try Now</Link>
                    </Button>
                </div>
            </div>
        </div>
        <h1 className="text-lg font-bold">Browser</h1>
        <Separator className="" />
        <div className="grid grid-cols-3 gap-10">
            <div className="flex w-full items-center gap-4 mt-3">
                <div className="flex items-center justify-center w-20 h-20 rounded-full">
                    <DatabaseIcon className="w-20 h-20" />
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-bold">Icon Browser</h2>
                    <p className="text-gray-600">a CDN service to serve Lost Saga PNG Texture.</p>
                    <Button asChild className="w-full">
                        <Link href="#">Try Now</Link>
                    </Button>
                </div>
            </div>
            <div className="flex w-full items-center gap-4 mt-3">
                <div className="flex items-center justify-center w-20 h-20 rounded-full">
                    <DatabaseIcon className="w-20 h-20" />
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-bold">Item Browser</h2>
                    <p className="text-gray-600">a web service to see latest update item.</p>
                    <Button asChild className="w-full">
                        <Link href="#">Try Now</Link>
                    </Button>
                </div>
            </div>

            <div className="flex w-full items-center gap-4 mt-3">
                <div className="flex items-center justify-center w-20 h-20 rounded-full">
                    <DatabaseIcon className="w-20 h-20" />
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-bold">Title Browser</h2>
                    <p className="text-gray-600">a web service to see latest update title.</p>
                    <Button asChild className="w-full">
                        <Link href="#">Try Now</Link>
                    </Button>
                </div>
            </div>

            <div className="flex w-full items-center gap-4 mt-3">
                <div className="flex items-center justify-center w-20 h-20 rounded-full">
                    <DatabaseIcon className="w-20 h-20" />
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-bold">Medal Browser</h2>
                    <p className="text-gray-600">a web service to see latest update medal.</p>
                    <Button asChild className="w-full">
                        <Link href="#">Try Now</Link>
                    </Button>
                </div>
            </div>
        </div>
    </div>
}