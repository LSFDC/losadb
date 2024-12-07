/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Image as ImageAttr, Imageset } from "@/lib/losatools/xmlparser";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export function IconBrowser({ Imageset }: { Imageset: Imageset[] }) {
    const [selectedImage, setSelectedImage] = useState<ImageAttr>();
    const [selectedImageset, setSelectedImageset] = useState<Imageset>();
    const [expandedImagesets, setExpandedImagesets] = useState<Set<string>>(new Set());
    const [searchTerm, setSearchTerm] = useState<string>("");

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
        imageset.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleImageClick = async (imageset: Imageset, image: ImageAttr | null) => {
        setSelectedImageset(imageset);
        setSelectedImage(image!);
    };

    return (
        <div className="grid grid-cols-5 gap-4">
            {/* Left Panel: Tree View */}
            <div className="border-r col-span-1">
                {/* Searchbar */}
                <Input
                    className="mb-4"
                    placeholder="Search..."
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <ScrollArea className="h-screen">
                    <ul>
                        {filteredImagesets?.sort((a, b) => a.Name.localeCompare(b.Name))?.map((imageset, index) => (
                            <li key={index} className="p-2">
                                <div
                                    className="font-semibold hover:cursor-pointer"
                                    onClick={() => toggleImageset(imageset.Name)}
                                >
                                    {expandedImagesets.has(imageset.Name) ? "[-]" : "[+]"} {imageset.Name}
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
                                                            selectedImageset?.Name === imageset.Name && selectedImage?.Name === image.Name,
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
            <div className="relative col-span-3 w-full items-center right-0">
                {selectedImageset && (
                    <div className="relative">
                        <Image
                            src={`/images/icons/${selectedImageset.Name}/${selectedImageset.Name}.png`}
                            alt={selectedImageset.Name}
                            width={700}
                            height={700}
                            className="w-auto h-auto"
                        />

                        {selectedImageset.Images.map((image, idx) => (
                            <div
                                key={idx}
                                className={cn("absolute", {
                                    "border-2 border-red-500": selectedImage?.Name === image.Name,
                                })}
                                style={{
                                    left: `${image.X ?? 0}px`,
                                    top: `${image.Y ?? 0}px`,
                                    width: `${image.Width ?? 0}px`,
                                    height: `${image.Height ?? 0}px`,
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Right Panel: Image Details */}
            <div className="border-l col-span-1">
                {selectedImage ? (
                    <div className="p-4">
                        <p>
                            <strong>Name:</strong> {selectedImageset?.Name}#{selectedImage.Name}
                        </p>
                        <p>
                            <strong>Position:</strong> ({selectedImage.X}, {selectedImage.Y})
                        </p>
                        <p>
                            <strong>Dimensions:</strong> {selectedImage.Width}x{selectedImage.Height}
                        </p>
                        {selectedImage.OffsetX !== undefined && (
                            <p>
                                <strong>OffsetX:</strong> {selectedImage.OffsetX ?? 0}
                            </p>
                        )}
                        {selectedImage.OffsetY !== undefined && (
                            <p>
                                <strong>OffsetY:</strong> {selectedImage.OffsetY ?? 0}
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
