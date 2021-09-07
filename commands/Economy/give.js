module.exports.run = async (client, message, args, economyData) => {
    if (!args.length) return message.channel.send(message.guild.language.mentionPlayer);

    const amount = args[0];
    const target = message.mentions.users.first();

    if(!target) message.channel.send(message.guild.language.userDontExist)

    if (amount % 1 != 0 || amount <= 0) {
      return message.channel.send(message.guild.language.depositNumber);
    } else {
      return;
    };

    try {
      const targetData = await economyData.findOne({ userID: target.id });
      if (!targetData) {
        return message.channel.send(message.guild.language.userDontExistInDB)
      } else {
        await economyData.findOneAndUpdate(
          {
            userID: target.id,
          },
          {
            $inc: {
              coins: amount,
            },
          }
        );

        return message.channel.send(`${message.guild.language.playerGivenCoins}` + `${amount} ` + `${message.guild.language.samountOfCoins}`)
      }
    } catch (err) {
      console.log(err)
    }
};

module.exports.help = {
  name: "give",
  aliases: ['g'],
  description: "Give a player some coins.",
  cooldown: 10,
  usage: '<target> <amount>',
  isUserAdmin: false,
  permissions: false,
  args: true
}