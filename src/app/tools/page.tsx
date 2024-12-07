import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toolList } from "@/data/tool-list";

import Link from "next/link";

export default function ToolsPage() {
    return <div className="flex flex-col gap-3">
        <h1 className="text-lg font-bold">Tools</h1>
        <Separator className="" />
        <div className="grid grid-cols-3 gap-10 mb-5">

            {toolList.filter((list) => list.type === "tool" && list.active === true).map((tool) => (
                <div className="flex w-full items-center gap-4 mt-3" key={tool.name}>
                    <div className="flex items-center justify-center w-20 h-20 rounded-full">
                        {tool.icon && <tool.icon className="w-20 h-20" />}
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-lg font-bold">{tool.name}</h2>
                        <p className="text-gray-600">{tool.description}</p>
                        <Button asChild className="w-full">
                            <Link href={tool.href}>Try Now</Link>
                        </Button>
                    </div>
                </div>
            ))}

        </div>
        <h1 className="text-lg font-bold">Browser</h1>
        <Separator className="" />
        <div className="grid grid-cols-3 gap-10">

            {toolList.filter((list) => list.type === "browser" && list.active === true).map((tool) => (
                <div className="flex w-full items-center gap-4 mt-3" key={tool.name}>
                    <div className="flex items-center justify-center w-20 h-20 rounded-full">
                        {tool.icon && <tool.icon className="w-20 h-20" />}
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-lg font-bold">{tool.name}</h2>
                        <p className="text-gray-600">{tool.description}</p>
                        <Button asChild className="w-full">
                            <Link href={tool.href}>Try Now</Link>
                        </Button>
                    </div>
                </div>
            ))}

        </div>
    </div>
}