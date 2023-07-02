// deno-lint-ignore-file no-explicit-any
import { CustomEvent, optimizeAnimation, OptimizeSettings, parseFilePath, KeyframesVec3} from "https://deno.land/x/remapper@3.1.1/src/mod.ts" 
import { writeJsonSync, readJsonSync } from "https://deno.land/std@0.66.0/fs/mod.ts";


interface ObjectData {
    pos: KeyframesVec3[];
    rot: KeyframesVec3[];
    scale: KeyframesVec3[];
    color:  KeyframesVec3[];
    track?: string;
  }
interface Item {
  property: string;
}

enum returnProperties {
  "Position",
  "Rotation"
}
const optimSettings = new OptimizeSettings()
optimSettings.passes = 5
optimSettings.active = true
optimSettings.performance_log = true
optimSettings.optimizeSimilarPoints.active = true

const Prop = returnProperties
function processArray(filePath: string, track:string, returnProp: returnProperties, logObjectToFile?:string) {

  try {
    const inputPath = parseFilePath(filePath, ".rmmodel").path; // Thanks swifter this helped lots :)
  const fileContent:any = readJsonSync(inputPath)
  const filteredObjects = fileContent.objects.filter((obj: ObjectData) => obj.track === track);
  const [optimizedPos]: KeyframesVec3 = optimizeAnimation(filteredObjects.map((obj: ObjectData) => obj.pos), optimSettings);
  const [optimizedRot]: KeyframesVec3 = optimizeAnimation(filteredObjects.map((obj: ObjectData) => obj.rot), optimSettings);

        if(logObjectToFile) {
          writeJsonSync(logObjectToFile,filteredObjects) //Does NOT write the optimized keyframes to the file, only the object when its first found
          console.log(`Written object to ${logObjectToFile}`)
        }
          if(returnProp == Prop.Position) {
            return optimizedPos
            } else if (returnProp == Prop.Rotation) {
              return optimizedRot
            }

  } catch(error) {
    console.error(`objectToTrack PROCESSARRAY ERROR: ${error}`)
  }
}

function validateRmmodel(fileName: string): boolean {
  const inputPath = parseFilePath(fileName, ".rmmodel").path; // Thanks swifter this helped lots :)
  if(`${fileName}.rmmodel` == inputPath || fileName == inputPath) { // Support input of both example.rmmodel and just example.
    return true
  } else {
    return false
  }
}

/**
 * @param  {string} envFile rmmodel of the environment
 * @param  {number} time time of the environment
 * @param  {number} durationOffset the duration of the environment or animation
 * @param  {string} track the material of the object in blender
 * @param  {string} gameTrack the players track in-game
 * @param  {string} logObjectToFile? logs the objects pos and rot to a file
 */
export function objectToTrack(envFile: string, time: number, durationOffset: number, track: string, gameTrack:string, logObjectToFile?:string) {
if (validateRmmodel(envFile) == true) {
  const f = new CustomEvent(time).animateTrack(gameTrack,durationOffset)
  f.animate.position = processArray(envFile,track, Prop.Position,logObjectToFile)
  f.animate.rotation = processArray(envFile,track,Prop.Rotation)
  f.push()
} else {
  console.error(`Invalid file. Expected .rmmodel`)
}

}
