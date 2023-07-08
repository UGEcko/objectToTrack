import {parseFilePath, KeyframesVec3} from "https://deno.land/x/remapper@3.1.2/src/mod.ts" 
import { readJsonSync } from "https://deno.land/std@0.66.0/fs/mod.ts";
//! Types n' stuff

export interface ObjectData {
  pos: KeyframesVec3[];
  rot: KeyframesVec3[];
  scale: KeyframesVec3[];
  color:  KeyframesVec3[];
  track?: string;
}

export type objectType = "animated" | "static"

type KeyframesOpt = [ value1: number, value2: number, value3: number, time: number ];

export enum returnProperties {
  "Position",
  "Rotation",
  "FilteredObjects"
}

export const Prop = returnProperties


//! Functions


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

export function areKeyframesSimilar(keyframe1: KeyframesOpt, keyframe2: KeyframesOpt, factor: number): boolean {
  const roundingFactor = factor // Good sweet spot is 0.75
  for (let i = 0; i < keyframe1.length; i++) {
    const roundedValue1 = Math.round(keyframe1[i] * roundingFactor) / roundingFactor;
    const roundedValue2 = Math.round(keyframe2[i] * roundingFactor) / roundingFactor;

    if (roundedValue1 !== roundedValue2) {
      return false;
    }
  }

  return true;
}


export function optimizeKeyframes(keyframes: KeyframesOpt[], factor: number): KeyframesOpt[]{
  const uniqueKeyframes: KeyframesOpt[] = [];

  for (let i = 0; i < keyframes.length; i++) {
    const keyframe = keyframes[i];
    let isDuplicate = false;

    for (let j = 0; j < uniqueKeyframes.length; j++) {
      const uniqueKeyframe = uniqueKeyframes[j];

      if (areKeyframesSimilar(keyframe, uniqueKeyframe, factor)) {
        isDuplicate = true;
        break;
      }
    }

    if (!isDuplicate) {
      uniqueKeyframes.push(keyframe);
    }
  }

  return uniqueKeyframes;
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





