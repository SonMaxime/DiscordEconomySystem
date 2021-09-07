const { MessageEmbed } = require("discord.js");
const Economy = require('./../../models/economy');

module.exports = async (client, member, guild) => {
  let profile = await profileModel.create({
    userID: member.id,
    guildID: member.guild.id,
    coins: 1000,
    bank: 0
  })
  profile.save();
}