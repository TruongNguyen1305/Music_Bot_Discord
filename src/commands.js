import {SlashCommandBuilder} from 'discord.js';

const musicCmd = new SlashCommandBuilder()
                    .setName('music')
                    .setDescription('Play music function')
                    .addSubcommand(
                        cmd => cmd.setName('play_music')
                                  .setDescription('Listen to music according to your mood')
                                  .addStringOption(
                                        opt => opt.setName('your_mood')
                                                  .setDescription('How do you feel today ?')
                                                  .setChoices(
                                                        {
                                                             name: 'Sad',
                                                             value: 'Sad',
                                                        },
                                                        {
                                                            name: 'Happy',
                                                            value: 'Happy'
                                                        }
                                                  )
                                    )
                                  .addStringOption(
                                      opt => opt.setName('kind_of_music')
                                                .setDescription('What kind of music do you like ?')
                                                .setChoices(
                                                      {
                                                           name: 'Pop',
                                                           value: 'Pop',
                                                      },
                                                      {
                                                          name: 'Folk',
                                                          value: 'Folk'
                                                      },
                                                      {
                                                          name: 'Rock',
                                                          value: 'Rock'
                                                      }
                                                )
                                  )
                                  .addStringOption(
                                        opt => opt.setName('free_topic')
                                                .setDescription('Select a topic which you want to play')
                                  )
                )
                .addSubcommand(
                    cmd => cmd.setName('stop_playing_music')
                              .setDescription('Stop playing music')
                ).toJSON()


export default [musicCmd]