export function checkForBotCommands(message) {
  if (message.toLowerCase().includes("hello bot")) {
    return "BassBall 2000™: Hi there! Need help?"
  }
  return null
}