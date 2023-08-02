import { Client, IntentsBitField } from 'discord.js';
import dotenv from 'dotenv';
import { playMusic, stopPlayMusic } from './handleInteractionEvent.js';

//import path from 'path'

dotenv.config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates
    ]
});

client.on('ready', (c) => {
    console.log('The bot is ready');
    console.log(`✅ ${c.user.username} is online`)
})

client.on('messageCreate', (msg) => {
    if(msg.author.bot) 
        return;
    console.log('alo')
})

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isChatInputCommand()) return;
    
    if(interaction.commandName === 'music') {
        if(interaction.options._subcommand === 'play_music') 
            playMusic(interaction);
        else if(interaction.options._subcommand === 'stop_playing_music') 
            stopPlayMusic(interaction);
    }
})

client.login(process.env.TOKEN);
