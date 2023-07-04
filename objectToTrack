// deno-lint-ignore-file no-inferrable-types
import {validateRmmodel, processArray, returnProperties} from 'https://raw.githubusercontent.com/UGEcko/objectToTrack/main/module/external.ts'
import { CustomEvent} from "https://deno.land/x/remapper@3.1.1/src/mod.ts" 


export class objectToTrack {
    input: string;
    time: number;
    duration: number;
    track: string;
    private logToFile: boolean = false;
    private bsTrack?: string;
    private positionIncluded?: boolean = true;
    private rotationIncluded?: boolean = true;

    constructor(input: string, time: number, duration: number, track: string) {
        this.input = input;
        this.time = time;
        this.duration = duration;
        this.track = track;
    }
    set log(value: boolean){this.logToFile = value}
    set gameTrack(value: string){this.bsTrack = value}
    set includePosition(value: boolean){this.positionIncluded = value}
    set includeRotation(value: boolean){this.rotationIncluded = value}

    push() {
        const Prop = returnProperties
        const Btrack = this.bsTrack ? this.bsTrack : this.track

        if (validateRmmodel(this.input) == true) {
            const f = new CustomEvent(this.time).animateTrack(Btrack,this.duration)
            this.positionIncluded ? f.animate.position = processArray(this.input,Btrack, Prop.Position, this.logToFile) : console.log('Skipped Position')
            this.rotationIncluded ? f.animate.rotation = processArray(this.input,Btrack,Prop.Rotation) : console.log('Skipped Rotation')
            f.push()
          } else {
            console.error(`Invalid file. Expected .rmmodel`)
          }
    }

    
}
