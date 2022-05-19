import Head from "next/head";
import { useState } from "react";
import PageTitle from "../components/PageTitle";
import styles from "../styles/index.module.scss";

export default function Home({ pageProps }) {
  const [topicInput, setTopicInput] = useState("");
  const [result, setResult] = useState();
  const [prompt, setPrompt] = useState();

  //handle form submit - send request to OpenAI
  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic: topicInput }),
    });
    const data = await response.json();

    //set states for responses
    setPrompt(topicInput);
    setResult(data.result);
    setTopicInput("");
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Dad Joke Generator</title>
        <meta charset="UTF-8"></meta>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <main className={styles.main}>
        <div className="robot">
          <img src="/chatbot.png" className={styles.icon} />
        </div>
        <PageTitle />
        <form onSubmit={onSubmit}>
          <label htmlFor="topic">suggestions: politics, fish, golf</label>
          <input
            type="text"
            name="topic"
            placeholder="Enter a topic"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
          />
          <input type="submit" value="Generate jokes" />
        </form>
        <div className={styles.box}>
          <p>
            <span>Your prompt: </span>
            {prompt}
          </p>
          <p className={styles.result}>
            <span>Response:</span>
            {result}
          </p>
        </div>
      </main>
    </div>
  );
}
