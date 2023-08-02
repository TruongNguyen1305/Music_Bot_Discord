import { createAudioPlayer, createAudioResource, joinVoiceChannel, NoSubscriberBehavior  } from '@discordjs/voice';
import ytSearch from 'yt-search';
import ytdl from 'ytdl-core';
//import path from 'path'

const audioDatabase = {};

const MOODS = ['happy', 'sad']
const KIND_OF_MUSICS = ['pop', 'folk','rock']

export const playMusic = async (interaction) => {
    try {
        const mood = interaction.options.get('your_mood') && interaction.options.get('your_mood').value;
        const kindOfMusic = interaction.options.get('kind_of_music') && interaction.options.get('kind_of_music').value;
        const freeTopic = interaction.options.get('free_topic') && interaction.options.get('free_topic').value;

        if(!mood && !kindOfMusic && !freeTopic) {
            return interaction.reply('You need to select at least one option');
        }

        let search_query = freeTopic ? freeTopic : `${mood || MOODS[Math.floor(Math.random() * 2)]} ${kindOfMusic || KIND_OF_MUSICS[Math.floor(Math.random() * 3)]} music`;

        const results = await ytSearch(search_query);
        results.all = results.all.filter(res => res.url.startsWith('https://youtube.com/watch?'));

        const random = freeTopic ? 0 : Math.round(Math.random() * results.all.length);

        //console.log(random, results.all.length)

        const youtubeLink = results.all[random].url;

        console.log(youtubeLink)
        
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
          return interaction.reply('You need to be in a voice channel to use this function.');
        }
        const connection = joinVoiceChannel({
          channelId: voiceChannel.id,
          guildId: voiceChannel.guild.id,
          adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });
    
        const audioPlayer = createAudioPlayer({
        	behaviors: {
        		noSubscriber: NoSubscriberBehavior.Pause,
        	},
        });

        audioDatabase[voiceChannel.guild.id] = audioPlayer;

        const stream = ytdl(youtubeLink, { filter: 'audioonly' });
        const resource = createAudioResource(stream);
        //const resource = createAudioResource(path.resolve('src', 'audio', 'ALoi-Double2TMasew-10119691.mp3'));
        connection.subscribe(audioPlayer);
        audioPlayer.play(resource);
        interaction.reply(youtubeLink);
    } catch (error) {
        console.error(error);
        interaction.reply('There was an error playing the music.');
    }
}

export const stopPlayMusic = (interaction) => {
    try {
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply('You need to be in a voice channel to use this function.');
        }
        const audioPlayer = audioDatabase[voiceChannel.guild.id];
        audioPlayer.stop();
        interaction.reply('Stopped playing audio');
    } catch (error) {
        console.error(error);
        interaction.reply("Can't stop playing music.");
    }
}