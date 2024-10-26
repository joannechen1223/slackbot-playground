require("dotenv").config();
const { WebClient } = require("@slack/web-api");
const options = {};
const web = new WebClient(process.env.SLACK_TOKEN, options);

console.log("🚀 Slack Notifier 🚀");

export const authTest = async () => {
  console.log("Testing authentication...");
  console.log(process.env.SLACK_TOKEN);
  try {
    const result = await web.auth.test();
    console.log("Authentication successful:", result);
  } catch (error) {
    console.error("Authentication failed:", error);
  }
};

async function getUserIdByEmail(email) {
  try {
    const result = await web.users.lookupByEmail({ email });
    console.log("User ID:", result.user.id);
    return result.user.id; // This is the user's ID
  } catch (error) {
    console.error("Error fetching user ID:", error);
  }
}

export const sendChannelMessage = async (message, channel = null) => {
  const channelId = channel || process.env.SLACK_CHANNEL_ID;

  console.log("channelId", channelId);
  // Join the channel
  try {
    console.log(process.env.SLACK_TOKEN);
    const resp = await web.conversations.join({
      channel: channelId,
    });
    if (resp.ok) {
      console.log(`Successfully joined channel: ${channelId}`);
    } else {
      console.log(`Failed to join channel: ${response.error}`);
    }
  } catch (error) {
    console.log("Error", error);
  }

  // Send the message
  try {
    const result = await web.chat.postMessage({
      channel: channelId,
      text: message,
    });
    console.log("Message sent:", result.ts);
  } catch (error) {
    console.error("Error posting message:", error);
  }
};

async function sendDirectMessage(email, message) {
  try {
    const userId = await getUserIdByEmail("jc3553@cornell.edu");

    // Open a direct message conversation
    const response = await web.conversations.open({
      users: userId, // User ID(s) you want to DM
    });

    // Send a message to the opened DM conversation
    const result = await web.chat.postMessage({
      channel: response.channel.id, // DM channel ID
      text: message, // Message to send
    });

    console.log(`Message sent successfully: ${result.ts}`);
  } catch (error) {
    console.error("Error sending DM:", error);
  }
}

authTest();
const email = "jc3553@cornell.edu";
sendDirectMessage(email, "This is a test message");
// sendMessage("This is generated by Notifier Test App");
