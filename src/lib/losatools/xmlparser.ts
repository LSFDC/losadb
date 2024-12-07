/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from "fs";
// import * as path from "path";

import { XMLParser } from "fast-xml-parser";

export interface Image {
  Name: string;
  X?: number;
  Y?: number;
  Width: number;
  Height: number;
  OffsetX?: number;
  OffsetY?: number;
}

export interface Imageset {
  Name: string;
  File: string;
  Images: Image[];
  ImageWidth: number;
  ImageHeight: number;
}

export interface ImagesetLayout {
  Imageset: Imageset[];
}

export function parseXml(filePath: string): ImagesetLayout {
  const xmlData = fs.readFileSync(filePath, "utf-8");

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    allowBooleanAttributes: false,
  });

  const jsonObj = parser.parse(xmlData);

  const imagesetLayout: ImagesetLayout = {
    Imageset: (Array.isArray(jsonObj.ImagesetLayout.Imageset)
      ? jsonObj.ImagesetLayout.Imageset
      : [jsonObj.ImagesetLayout.Imageset]
    ).map((imageset: any) => {
      //skipping .bmp
      if (imageset.File.endsWith(".bmp")) return null;

      // force skip for UIIconPack158
      if (imageset?.Name === "UIIconPack158") return null;

      return {
        Name: imageset?.Name,
        File: imageset.File,
        Images: (Array.isArray(imageset.Image)
          ? imageset.Image
          : [imageset.Image]
        )
          .map((image: any) => {
            return {
              Name: image?.Name,
              X: Number(image?.X ?? 0),
              Y: Number(image?.Y ?? 0),
              Width: Number(image?.Width ?? 0),
              Height: Number(image?.Height ?? 0),
              OffsetX: Number(image?.OffsetX ?? 0),
              OffsetY: Number(image?.OffsetY ?? 0),
            };
          })
          .filter((image: any) => image !== null),
      };
    }),
  };

  console.log("Final Imageset Layout ");

  return imagesetLayout;
}
