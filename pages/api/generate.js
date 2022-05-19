import { Configuration, OpenAIApi } from "openai";

//make a new confirguration with secret API Key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  //complete request to openAI api using a chosen engine
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: generatePrompt(req.body.topic),
    temperature: 0.8,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

//function to take user input as the new topic from which to generate a new response
function generatePrompt(topic) {
  const capitalizedTopic =
    topic[0].toUpperCase() + topic.slice(1).toLowerCase();
  //instructions for the openAI
  return `Suggest a joke based on a particular topic.

Topic: Golf
Joke: Why do fathers take an extra pair of socks when they go golfing? In case they get a hole in one!
Topic: Fish
Joke: What do you call a fish wearing a bowtie? Sofishticated!
Topic: Time
Joke: I'm afraid for the calendar. Its days are numbered.
Topic: ${capitalizedTopic}
Joke:`;
}
