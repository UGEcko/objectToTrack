# Object to Track (like camera-to-player from scuffedwalls)
This utility allows you to track objects in an .rmmodel file by filtering out their position and rotation to create an animTrack.

Note: objectToTrack assumes you are using Remapper(s latest version) 3.1.2.
## Usage
```import { objectToTrack } from 'https://raw.githubusercontent.com/UGEcko/objectToTrack/main/src/mod.ts'```

Import the objectToTrack class using the following import above

```ts
const OTT = new objectToTrack('test',0,69,'target') // (Input, Time, Duration, Track)
OTT.gameTrack = 'player' // Define the players track here, only use if the players track and the object track are different.
OTT.track = 'target' // Define the object track to filter here.
OTT.includePosition = false // Include or exclude position animations in the animTrack.
OTT.includeRotation = false // Include or exclude rotation animations in the animTrack.
OTT.log('ya.beatsaberIsAwesome') // Log the unfiltered object to a custom file, or leave blank to output to a default file.
OTT.push() // Push to the game!
```






This utility will produce a flood of useless Blender keyframes as there are no current array optimizations in place. It is recommended to set the sample rate in the Blender exporter to a high number, depending on the static nature of the environment and the player's animation intensity.

## Common Issues
![image](https://github.com/UGEcko/objectToTrack/assets/38820051/797a3162-e593-4157-934b-27f1600242b7)

If you encounter an error similar to this, it likely means that your ```.rmmodel``` file is corrupted or was tweaked to not work. Try re-exporting the model and see if it resolves the issue.

![image](https://github.com/UGEcko/objectToTrack/assets/38820051/ba789897-34f9-4519-bbf8-786f2625f160)

If you receive this error, it means that you haven't entered the .rmmodel file name correctly. Please ensure that you type it as follows: ```example``` or ```example.rmmodel```. Both entries work.

If you encounter any other issues, please contact **ugecko** on Discord. Thank you.
