# Object to Track (like camera-to-player from scuffedwalls)
This utility allows you to track objects in an .rmmodel file by filtering out their position and rotation to create an animTrack.

Note: objectToTrack assumes you are using Remapper(s latest version) 3.1.2.
## Usage
```import { objectToTrack } from 'https://raw.githubusercontent.com/UGEcko/objectToTrack/main/src/mod.ts'```

Import the objectToTrack class using the following import above

This is the layout:
```ts
const OTT = new objectToTrack('test',0,69,'target') // (Input, Time, Duration, Track)
OTT.gameTrack = 'player' // Define the players track here, only use if the players track and the object track are different.
OTT.track = 'target' // Define the object track to filter here.
OTT.includePosition = false // Include or exclude position animations in the animTrack.
OTT.includeRotation = false // Include or exclude rotation animations in the animTrack.
OTT.log('ya.beatsaberIsAwesome') // Log the unfiltered object to a custom file, or leave blank to output to a default file.
OTT.push() // Push to the game!
```


Notice:
~~This is super super janky and just carries over a flood of useless blender keyframes, its recommended to set the sample rate in blender exporter to a high number if your environment is static, and depending on the players animation.~~
**NOT ANYMORE HAHAHAHA**

## Common Issues
![image](https://github.com/UGEcko/objectToTrack/assets/38820051/797a3162-e593-4157-934b-27f1600242b7)

If you encounter an error similar to this, it likely means that your ```.rmmodel``` file is corrupted or was tweaked to not work. Try re-exporting the model and see if it resolves the issue.

![image](https://github.com/UGEcko/objectToTrack/assets/38820051/ba789897-34f9-4519-bbf8-786f2625f160)

If you get this error, this means **you havent typed in the rmmodel correctly**. Please type it like this: `example` OR `example.rmmodel`

![image](https://github.com/UGEcko/objectToTrack/assets/38820051/2395ad1a-29b4-4335-afb8-9641b7b727de)

If you get a similar error, this most likely means your array is not valid for animation. **Please use the "static" type when pushing your OTT.**


If you encounter any other issues, please contact **ugecko** on Discord. Thank you.
