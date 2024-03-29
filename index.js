const aoijs = require("aoi.js");
const bot = new aoijs.AoiClient({
  token: process.env.Token,
  prefix: "?",
  intents: ["GUILDS", "GUILD_MESSAGES"],
  mobilePlatform: true,
});

//status from the bot
bot.status({
  text: "Watching Sanko @Socials",
  type: "SOCIALS",
  url: "https://www.linkedin.com/in/saptadeep-banerjee-2b15bbb0/",
});

//Events
bot.onMessage();

//Command Example (ping)
const loader = new aoijs.LoadCommands(bot);
loader.load(bot.cmd, "./commands/");

//Chat bot main command
bot.command({
  name: "$alwaysExecute",
  category: "Command Support",
  code: `
  $reply[$messageID;yes]
  $httpRequest[https://api.udit.tk/api/chatbot?message=$message&name=Disco&gender=Male&user=$authorId;GET;;message]
  $botTyping
  $cooldown[2s;{newEmbed:{description:\:_\: Don't send messages to fast, you can break me by doing it}{color:RED}}]

  $onlyIf[$checkContains[$message;@everyone;@here]==false;{newEmbed:{description:\:_\: I don't disturb people!}{color:#ff0000}}]

  $onlyForChannels[$getServerVar[chatbotChannel];]

  $onlyIf[$getServerVar[chatbotChannel]!=;]
  $suppressErrors
  `,
});
bot.variables({
  money: 0,
  chatbotChannel: "",
});

const keepAlive = require("./server");




keepAlive();
