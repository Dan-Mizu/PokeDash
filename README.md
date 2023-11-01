# This is a WIP Dashboard written in Vue for PokeBotGen-3 (libmgba) by 40Cakes. 
## (https://github.com/40Cakes/pokebot-gen3)




# Preview 
Multiple Instances can be displayed at once, trainer data and party info is fetched and displayed with the help of the bot's webhooks and PokeAPI. (the design annd layout is subject to change this project is WIP)
![image](https://github.com/U2EZNeko/PokeDash/assets/20902663/b67f7331-7870-4e0b-bdde-d8aabd8d40e5)
![image](https://github.com/U2EZNeko/PokeDash/assets/20902663/fa6e6581-830d-41de-9fe7-d67fc1f9bca2)



# Requirements:
  - NodeJS


# Install:
  1. Git Clone the Repo
  2. open CLI inside repo's main folder or CD to it.
  3. run "npm install"
  4. launch the script with "npm run dev"


# How to configure:

## Please configure your obs.yml to a different port for each instance. You can do this by copying the default obs.yml from the profiles folder of the bot to your specific profile. 
- The Profile folders will be created after you launch the bot once. 



## You can add default instances server-side by writing them into a .env like this:

### DEFAULT_INSTANCE_API_URLS="your.IP.goes.here:port1, your.IP.goes.here:port2"
it should look like this: 
### DEFAULT_INSTANCE_API_URLS="127.0.0.1:8888, 127.0.0.1:8889"


## To Do
- Target Poke selector (display only)
- Detail Displaying option (visual shiny_log, detailed total stats, phase stats and history data)
- Auto removing/Pausing instances that are off to avoid script hangs
- Display Emulator Data and other Info once it's in the API

## Done:

- Multi Instance handling
- Data Persistence if added through Browser
- Serverside default instances in .env
- Sprite fetching, Party display and Trainer Info.
- Writing a basic Readme
