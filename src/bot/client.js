/**
 * hides implementation details of slack client
 */


class Client {

    constructor(slackClient = DUMMY_CLIENT) {
        this.slackClient = slackClient;
    }

    replyMessageToChannel(text, message) {
        return this.slackClient.chat.postMessage(message.channel, text, { thread_ts: message.ts});
    }

    addReactionToMessage(reaction, message) {
        this.slackClient.reactions.add(reaction, {
            channel: message.channel,
            timestamp: message.ts
        });
    }

    isBotMessage(msg) {
        return msg.subtype === 'bot_message';
    }


}

class DummyClient {

    constructor() {
        this.reactions = [];
        this.messages = [];
    }

    replyMessageToChannel(text, message) {
        this.messages.push(text);
    }

    addReactionToMessage(reaction, message) {
        this.reactions.push(reaction);
    }

    isBotMessage(msg) {
        return msg.subtype === 'bot_message';
    }
}

module.exports = {};
module.exports.Client = Client;
module.exports.DummyClient = DummyClient;