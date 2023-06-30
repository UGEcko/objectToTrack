
## Object to track (like camera-to-player from scuffedwalls)
This works by filtering out the objects in the .rmmodel, then it individually filters out the position, and rotation to be turned into a animTrack.

Example: `objectToTrack('environment',0,100, 'Player', 'Player', 'log.object')`

Parameters (All params are in jsDocs when used)

 * envFile          | rmmodel of the environment
 * time             | time of the environment
 * durationOffset   | the duration of the environment or animation
 * track            | the material of the object in blender
 * gameTrack        | the players track in-game
 * logObjectToFile? | logs the objects pos and rot to a file

Use this import: 

`import { objectToTrack } from 'https://raw.githubusercontent.com/UGEcko/Remapper-Extended/main/objectToTrack'`

MAKE SURE to set the time and duration of this to the same time and duration of the environment. If its static then subtract the time of the next environment to the current one for the duration.


Notice:
This is super super janky and just carries over a flood of useless blender keyframes, its recommended to set the sample rate in blender exporter to a high number if your environment is static, and depending on the players movement.

Also please report any issues to ugecko on discord.



