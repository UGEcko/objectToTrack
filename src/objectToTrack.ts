// deno-lint-ignore-file no-inferrable-types
import { CustomEvent} from "https://deno.land/x/remapper@3.1.2/src/mod.ts" 
import { writeJsonSync } from "https://deno.land/std@0.66.0/fs/mod.ts";
import { Prop, processArray, validateRmmodel, returnProperties, optimizeKeyframes, objectType } from './external.ts';


export class objectToTrack {
    input: string;
    time: number;
    duration: number;
    track: string;
    private opFac: number = 0.75;
    private bsTrack?: string;
    private positionIncluded?: boolean = true;
    private rotationIncluded?: boolean = true;
  /**
   * Constructs a new objectToTrack instance.
   * @param {string} input - The .rmmodel file from which to copy properties.
   * @param {number} time - The starting time of the keyframes. Should match the startTime of the associated environment.
   * @param {number} duration - The duration of the animation track. Should match the duration of the associated environment.
   * @param {string} track - The track (material) of the object in blender that is to be copied.
   */
    constructor(input: string, time: number, duration: number, track: string) {
        this.input = input;
        this.time = time;
        this.duration = duration;
        this.track = track;
    }
    set gameTrack(value: string){this.bsTrack = value}
    set includePosition(value: boolean){this.positionIncluded = value}
    set includeRotation(value: boolean){this.rotationIncluded = value}
    /**
     * @param  {number} value Optimization factor | 0.75 is default, the lower it is, the more optimized the animation is, however 0 does not count. Must be a decimal
     */
    set opFactor(value: number){this.opFac = value}
    /**
     * @param  {objectType} type Can be "static" or "animated"
     */
    push(type: objectType) {
        const Prop = returnProperties
        const Btrack = this.bsTrack ? this.bsTrack : this.track

        if (validateRmmodel(this.input) == true) {
            const f = new CustomEvent(this.time).animateTrack(Btrack,this.duration)
            if(type == "animated") {
              this.positionIncluded ? f.animate.position = optimizeKeyframes(processArray(this.input,this.track, Prop.Position),this.opFac) : console.log('Skipped Position')
              this.rotationIncluded ? f.animate.rotation = optimizeKeyframes(processArray(this.input,this.track,Prop.Rotation),this.opFac) : console.log('Skipped Rotation')
              f.push()
            } else if(type == "static") {
              this.positionIncluded ? f.animate.position = optimizeKeyframes(processArray(this.input,this.track, Prop.Position),0.00000001) : console.log('Skipped Position')
              this.rotationIncluded ? f.animate.rotation = optimizeKeyframes(processArray(this.input,this.track,Prop.Rotation),0.00000001) : console.log('Skipped Rotation')
              f.push()
            }
            
          } else {
            console.error(`Invalid file. Expected .rmmodel`)
          }
    }
    /**
   * Logs the object properties to a file. (Unfiltered)
   * @param {string} [logFile='ott.log'] - The name of the log file to which the log will be written. If not provided, it will log to a default file.
   */
    log(logFile?:string) {
      let file
      if(logFile) {
        file = logFile
      } else {
        file = 'ott.log'
      }
        writeJsonSync(file,processArray(this.input,this.track,Prop.FilteredObjects))
        console.log(`Written object to ${file}`)
    }

    
}