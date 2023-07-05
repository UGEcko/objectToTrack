// deno-lint-ignore-file no-inferrable-types
import { dev } from 'https://raw.githubusercontent.com/UGEcko/objectToTrack/main/src/mod.ts'
import { CustomEvent} from "https://deno.land/x/remapper@3.1.2/src/mod.ts" 


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
        const Prop = dev.returnProperties
        const Btrack = this.bsTrack ? this.bsTrack : this.track

        if (dev.validateRmmodel(this.input) == true) {
            const f = new CustomEvent(this.time).animateTrack(Btrack,this.duration)
            this.positionIncluded ? f.animate.position = dev.processArray(this.input,Btrack, Prop.Position, this.logToFile) : console.log('Skipped Position')
            this.rotationIncluded ? f.animate.rotation = dev.processArray(this.input,Btrack,Prop.Rotation) : console.log('Skipped Rotation')
            f.push()
          } else {
            console.error(`Invalid file. Expected .rmmodel`)
          }
    }

    
}
