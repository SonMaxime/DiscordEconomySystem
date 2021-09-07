const mongoose = require("mongoose");
const { Guild, User } = require("../models/index");
const message = require("../events/message/message");

module.exports = async (client, message) => {
  client.createGuild = async guild => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
    const createGuild = await new Guild(merged);
    createGuild.save().then(g => console.log(`Nouveau serveur -> ${g.guildName}`));
  };

  client.getGuild = async guild => {
    const data = await Guild.findOne({ guildID: guild.id });
    if (data) return data;
    return client.config.DEFAULTSETTINGS;
  };

  client.updateGuild = async (guild, settings) => {
    let data = await client.getGuild(guild);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  };

  client.createUser = async user => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, user);
    const createUser = await new User(merged);
    createUser.save().then(u => console.log(`Nouvel utilisateur -> ${u.username}`));
  };

  client.getUser = async user => {
    try {
      const data = await User.findOne({ userID: user.id });
      if (data) return data;
      else return;
    }
    catch (e) {
      console.log(e);
    }
  };

  client.getUsers = async guild => {
    try {
      const data = await User.find({ guildID: guild.id });
      if (data) return data;
      else return;
    }
    catch (e) {
      console.log(e);
    }
  };

  client.updateUser = async (user, settings) => {
    let data = await client.getUser(user);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  };
};