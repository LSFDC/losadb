import { IconBrowser } from "@/components/tools/browser/icon-browser";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { parseXml } from "@/lib/losatools/xmlparser";
import Link from "next/link";
import path from "path";
import fs from "fs";
import sizeOf from "image-size";

export default function IconbrowserPage() {
    let parsedData;
    const imageDirectory = path.join(process.cwd(), "public", "images", "icons");
    try {
        const filePath = path.join(process.cwd(), "src", "assets", "xml", "uiimageset.xml");
        parsedData = parseXml(filePath);
        parsedData.Imageset.sort((a, b) => a?.Name.localeCompare(b?.Name));

        //force set width and height
        for (const imageset of parsedData.Imageset) {

            // force skip for UIIconPack158
            if (imageset?.Name === "UIIconPack158") {
                continue;
            }

            const imagePath = path.join(imageDirectory, `${imageset?.Name}/${imageset?.Name}.png`);
            if (fs.existsSync(imagePath)) {
                const dimensions = sizeOf(imagePath)

                // console.log(imageset.Name, dimensions.width, dimensions.height);

                imageset.ImageWidth = dimensions.width || 0;
                imageset.ImageHeight = dimensions.height || 0;


            } else {
                console.warn(`Image not found: ${imagePath}`);

            }
        }
    } catch (error) {
        console.error(`Failed to parse XML: ${(error as Error).message}`);
        console.error(error)

    }

    return (
        <div className="space-y-5 ">
            <h1 className="text-lg font-bold">Icon Browser <Badge variant="destructive">BETA</Badge></h1>
            <Separator />

            <p>Before you start, please make sure you have to extract your uiimageset.xml and dds files to separate PNG files</p>
            <p>You can use the <Link className="underline" href="https://github.com/LSFDC/losatools" target="_blank" rel="noopener noreferrer">UIXMLParser</Link> tools to do that and put them in the src/assets/xml folder for uiimageset.xml and public/images/icons/ for image/extracted dds files</p>

            <div className="">
                {parsedData && <IconBrowser Imageset={parsedData.Imageset} />}
            </div>
        </div>
    );
}
