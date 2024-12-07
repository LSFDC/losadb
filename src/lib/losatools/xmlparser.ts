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
      return {
        Name: imageset?.Name,
        File: imageset.File,
        Images: (Array.isArray(imageset.Image)
          ? imageset.Image
          : [imageset.Image]
        )
          .map((image: any) => {
            // Skip images with missing properties
            if (
              !image ||
              !image.X ||
              !image.Y ||
              !image.Width ||
              !image.Height
            ) {
              console.log("Skipping image due to missing properties: " + image);

              return null;
            }

            return {
              Name: image?.Name,
              X: Number(image.X),
              Y: Number(image.Y),
              Width: Number(image.Width),
              Height: Number(image.Height),
              OffsetX: Number(image.OffsetX),
              OffsetY: Number(image.OffsetY),
            };
          })
          .filter((image: any) => image !== null),
      };
    }),
  };

  console.log("Final Imageset Layout: " + imagesetLayout);

  return imagesetLayout;
}
