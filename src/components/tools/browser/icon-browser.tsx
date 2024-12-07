/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Image as ImageAttr, Imageset } from "@/lib/losatools/xmlparser";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export function IconBrowser({ Imageset }: { Imageset: Imageset[] }) {
    const [selectedImage, setSelectedImage] = useState<ImageAttr | null>(null);
    const [selectedImageset, setSelectedImageset] = useState<Imageset | null>(null);
    const [expandedImagesets, setExpandedImagesets] = useState<Set<string>>(new Set());
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [imageDimensions, setImageDimensions] = useState({
        naturalWidth: 1,
        naturalHeight: 1,
        displayedWidth: 1,
        displayedHeight: 1,
    });


    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        setImageDimensions({
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            displayedWidth: img.width,
            displayedHeight: img.height,
        });
    };

    // Calculate scaling ratio
    const scaleX = imageDimensions.displayedWidth / imageDimensions.naturalWidth;
    const scaleY = imageDimensions.displayedHeight / imageDimensions.naturalHeight;

    const toggleImageset = (imagesetName: string) => {
        setExpandedImagesets((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(imagesetName)) {
                newSet.delete(imagesetName);
            } else {
                newSet.add(imagesetName);
            }
            return newSet;
        });
    };

    const filteredImagesets = Imageset.filter(imageset =>
        imageset?.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleImageClick = async (imageset: Imageset, image: ImageAttr | null) => {

        setSelectedImageset(imageset);
        setSelectedImage(image!);
    };

    return (
        <div className="grid grid-cols-7 gap-4">
            {/* Left Panel: Tree View */}
            <div className="border-r col-span-2">
                <Input
                    className="mb-4"
                    placeholder="Search..."
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                        //reset
                        toggleImageset("")
                        setSelectedImageset(null)
                        setSelectedImage(null)
                    }
                    }
                />
                <ScrollArea className="h-screen ">
                    <ul>
                        {filteredImagesets.map((imageset, index) => (
                            <li key={index} className="p-2">
                                <div
                                    className="font-semibold hover:cursor-pointer"
                                    onClick={() => {

                                        toggleImageset(imageset.Name)

                                    }}
                                >
                                    {expandedImagesets.has(imageset?.Name) ? "[-]" : "[+]"} {imageset?.Name}
                                </div>
                                {expandedImagesets.has(imageset.Name) && (
                                    <ul className="ml-4">
                                        {imageset.Images.map((image, idx) => (
                                            <li
                                                key={idx}
                                                className={cn(
                                                    "cursor-pointer hover:bg-gray-200 p-1",
                                                    {
                                                        "bg-gray-200 text-red-500":
                                                            selectedImageset?.Name === imageset?.Name && selectedImage?.Name === image?.Name,
                                                    }
                                                )}
                                                onClick={() => handleImageClick(imageset, image)}
                                            >
                                                {image.Name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </div>

            {/* Center Panel: Image Preview */}
            <div className="relative col-span-3 w-full items-center right-0 border-2">
                {selectedImageset && (
                    <div className="relative">
                        <Image
                            src={`/images/icons/${selectedImageset?.Name}/${selectedImageset?.Name}.png`}
                            alt={selectedImageset?.Name}
                            width={selectedImageset?.ImageWidth}
                            height={selectedImageset?.ImageHeight}
                            onLoad={handleImageLoad}
                        />
                        {selectedImageset.Images.map((image, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className={cn("absolute", {
                                        "border-2 border-red-500": selectedImage?.Name === image.Name,
                                    })}
                                    style={{
                                        left: `${(image.X ?? 0) * scaleX}px`,
                                        top: `${(image.Y ?? 0) * scaleY}px`,
                                        width: `${(image.Width ?? 0) * scaleX}px`,
                                        height: `${(image.Height ?? 0) * scaleY}px`,
                                    }}
                                />
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Right Panel: Image Details */}
            <div className="border-l col-span-2 w-full">
                {selectedImage ? (
                    <div className="p-4">
                        <p>
                            <strong>Name :</strong> {selectedImage.Name}
                        </p>
                        <p>
                            <strong>Used as:</strong> {selectedImageset?.Name}#{selectedImage.Name}
                        </p>
                        <p>
                            <strong>Position :</strong> ({selectedImage.X}, {selectedImage.Y})
                        </p>
                        <p>
                            <strong>Dimensions :</strong> {selectedImage.Width}x{selectedImage.Height}
                        </p>
                        {selectedImage.OffsetX !== undefined && (
                            <p>
                                <strong>OffsetX :</strong> {isNaN(selectedImage.OffsetX) ? 0 : selectedImage.OffsetX}
                            </p>

                        )}
                        {selectedImage.OffsetY !== undefined && (
                            <p>
                                <strong>OffsetY :</strong> {isNaN(selectedImage.OffsetY) ? 0 : selectedImage.OffsetY}
                            </p>
                        )}
                    </div>
                ) : (
                    <p className="p-4">Select an image to view details.</p>
                )}
            </div>
        </div>
    );
}
