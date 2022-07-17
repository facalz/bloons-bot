require('dotenv/config');
const Client = require('./structure/client');
const {
    MessageEmbed,
    WebhookClient
} = require('discord.js');
const client = new Client();

const {
    QuickDB
} = require('quick.db');
const db = new QuickDB();

client.login(process.env.token);

client.on('ready', async () => {
    console.log('on')
});

client.on('messageCreate', async (message) => {

    if (message.author.bot || message.channel.type === "dm" || !message.guild) return;

    const regex = /https:\/\/join.btd6.com\/(\w+)\/([a-zA-Z]{6})/gm;

    if (message.content.match(regex)) {
        message.delete().catch(() => { });
        
        const info = regex.exec(message);

        const match = info[1];
        const code = info[2];

        if (!message.channel.permissionsFor(message.guild.me).has('MANAGE_WEBHOOKS')) return message.channel.send('sem permissão');

        const webhooks = await message.channel.fetchWebhooks();
        const myWebhook = webhooks.filter(webhook => webhook.owner.id === client.user.id && webhook.name === client.user.username);

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .addFields(
                { name: 'Code', value: code, inline: true },
                { name: 'Mode', value: match, inline: true }
            );

        if (myWebhook.size == 0) {
            message.channel.createWebhook(client.user.username, {
                avatar: client.user.displayAvatarURL()
            }).then(async wb => {

                await db.set(message.channel.id, {
                    id: wb.id,
                    token: wb.token
                });

                return await wb.send({
                    username: message.author.username,
                    avatarURL: message.author.displayAvatarURL(),
                    embeds: [embed]
                }).catch(O_o => {});
            });
            return;
        };

        const web = await db.get(message.channel.id);

        const webhook = new WebhookClient({
            id: web.id,
            token: web.token
        });

        return webhook.send({
            username: message.author.username,
            avatarURL: message.author.displayAvatarURL(),
            embeds: [embed]
        }).catch(O_o => {});

    };
});