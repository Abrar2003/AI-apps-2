// This code is for v4 of the openai package: npmjs.com/package/openai
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "Tell me a joke",
      },
      {
        role: "assistant",
        content: "Why did the chicken cross the road?",
      },
      {
        role: "user",
        content: "I don't know, why did the chicken cross the road?",
      },
      {
        role: "assistant",
        content: "To get to the other side!",
      },
      {
        role: "user",
        content: "Haha! tell me one more",
      },
      {
        role: "assistant",
        content:
          "Sure! Here's another joke for you:\n\nWhy don't scientists trust atoms?\n\nBecause they make up everything!",
      },
      {
        role: "user",
        content: "hahaha! but why did chicken wanted to cross the road?",
      },
      {
        role: "assistant",
        content:
          "Well, traditionally, the punchline \"to get to the other side\" is a play on words. It is intentionally anticlimactic and meant to catch the listener off guard, invoking a comedic effect. However, different interpretations and variations of the joke have emerged over time, with some adding more elaborate explanations or humorous twists to the chicken's motivation. Ultimately, it's all about bringing a little laughter into our lives!",
      },
      {
        role: "user",
        content: "Okay nice, Now tell me a motivation quote about working out",
      },
      {
        role: "assistant",
        content:
          '"Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. Push yourself, because no one else is going to do it for you. The pain you feel today will be the strength you feel tomorrow. Keep going, keep striving, and remind yourself that every workout is bringing you closer to your goals. You are stronger than you think!"',
      },
      {
        role: "user",
        content: "One more. A short one please",
      },
    ],
    temperature: 1,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log(response.choices[0].message.content);
}

main();