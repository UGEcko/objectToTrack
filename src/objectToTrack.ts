// deno-lint-ignore-file no-inferrable-types
import { CustomEvent} from "https://deno.land/x/remapper@3.1.2/src/mod.ts" 
import { writeJsonSync } from "https://deno.land/std@0.66.0/fs/mod.ts";
import { Prop, processArray, validateRmmodel, returnProperties } from './external.ts';


export class objectToTrack {
    input: string;
    time: number;
    duration: number;
    track: string;
    private bsTrack?: string;
    private positionIncluded?: boolean = true;
    private rotationIncluded?: boolean = true;

    constructor(input: string, time: number, duration: number, track: string) {
        this.input = input;
        this.time = time;
        this.duration = duration;
        this.track = track;
    }
    set gameTrack(value: string){this.bsTrack = value}
    set includePosition(value: boolean){this.positionIncluded = value}
    set includeRotation(value: boolean){this.rotationIncluded = value}

    push() {
        const Prop = returnProperties
        const Btrack = this.bsTrack ? this.bsTrack : this.track

        if (validateRmmodel(this.input) == true) {
            const f = new CustomEvent(this.time).animateTrack(Btrack,this.duration)
            this.positionIncluded ? f.animate.position = processArray(this.input,this.track, Prop.Position) : console.log('Skipped Position')
            this.rotationIncluded ? f.animate.rotation = processArray(this.input,this.track,Prop.Rotation) : console.log('Skipped Rotation')
            f.push()
          } else {
            console.error(`Invalid file. Expected .rmmodel`)
          }
    }
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
