import {parseFilePath, KeyframesVec3} from "https://deno.land/x/remapper@3.1.2/src/mod.ts" 
import { writeJsonSync, readJsonSync } from "https://deno.land/std@0.66.0/fs/mod.ts";

export function validateRmmodel(fileName: string): boolean {
  const inputPath = parseFilePath(fileName, ".rmmodel").path; // Thanks swifter this helped lots :)
  if(`${fileName}.rmmodel` == inputPath || fileName == inputPath) { // Support input of both example.rmmodel and just example.
    return true
  } else {
    return false
  }
}

export function processArray(filePath: string, track:string, returnProp: returnProperties) {
  try {
    const inputPath = parseFilePath(filePath, ".rmmodel").path; // Thanks swifter this helped lots :)
  const fileContent:any = readJsonSync(inputPath)
  const filteredObjects = fileContent.objects.filter((obj: ObjectData) => obj.track === track);
  const [position]: number[][] = roundArray(filteredObjects.map((obj: ObjectData) => obj.pos),3);
  const [rotation]: number[][] = roundArray(filteredObjects.map((obj: ObjectData) => obj.rot),3);
          if(returnProp == Prop.Position) {
            return position
            } else if (returnProp == Prop.Rotation) {
              return rotation
            } else if (returnProp == Prop.FilteredObjects) {
              return filteredObjects
            }
  } catch(error) {
    console.error(`objectToTrack PROCESSARRAY ERROR: ${error}`)
  }
}

export function roundArray(arr: any[], decimalPlaces: number): any[] {
  return arr.map((x: any) => {
    if (Array.isArray(x)) {
      return roundArray(x, decimalPlaces); 
    } else if (typeof x === 'number') {
      return Number(x.toFixed(decimalPlaces));
    } else {
      return x;
    }
  });
}

export interface ObjectData {
    pos: KeyframesVec3[];
    rot: KeyframesVec3[];
    scale: KeyframesVec3[];
    color:  KeyframesVec3[];
    track?: string;
  }

export enum returnProperties {
  "Position",
  "Rotation",
  "FilteredObjects"
}
export const Prop = returnProperties

