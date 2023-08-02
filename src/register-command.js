import {REST, Routes} from 'discord.js';
import dotenv from 'dotenv';
import cmds from './commands.js';

dotenv.config();
                                        
const rest = new REST({version: 10}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering...');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {
                body: cmds
            }
        );

        console.log('Registered successfully');
    } catch (error) {   
        console.log(error);
    }
})()