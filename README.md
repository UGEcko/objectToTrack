
## Object to track (like camera-to-player from scuffedwalls)
This works by filtering out the objects in the .rmmodel, then it individually filters out the position, and rotation to be turned into a animTrack.

Use this import: 

```import { objectToTrack } from 'https://raw.githubusercontent.com/UGEcko/objectToTrack/main/src/mod.ts'```

MAKE SURE to set the time and duration of this to the same time and duration of the environment. If its static then subtract the time of the next environment to the current one for the duration.

## New features from the previous version:

optimizationKeyframes

Option to use `static` or `animated` player movements through `.push("static" OR "animated")` ( Sort of like `.static()` and `.animate()` with Remapper modelScene )

---

Notice:
~~This is super super janky and just carries over a flood of useless blender keyframes, its recommended to set the sample rate in blender exporter to a high number if your environment is static, and depending on the players animation.~~
**NOT ANYMORE HAHAHAHA**

##  Common Issues:

![image](https://github.com/UGEcko/objectToTrack/assets/38820051/797a3162-e593-4157-934b-27f1600242b7)

If you get an error similar to this, this most likely means **your rmmodel is messed up**, you can try to re-export the model and see if it fixes it.

![image](https://github.com/UGEcko/objectToTrack/assets/38820051/ba789897-34f9-4519-bbf8-786f2625f160)

If you get this error, this means **you havent typed in the rmmodel correctly**. Please type it like this: `example` OR `example.rmmodel`

![image](https://github.com/UGEcko/objectToTrack/assets/38820051/2395ad1a-29b4-4335-afb8-9641b7b727de)

If you get a similar error, this most likely means your array is not valid for animation. **Please use the "static" type when pushing your OTT.**

If you encounter any other issues, please contact ugecko on discord. Thank you





