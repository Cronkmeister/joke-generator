import Head from "next/head";
import { useState } from "react";
import PageTitle from "../components/PageTitle";
import Spinner from "../components/Spinner";
import styles from "../styles/index.module.scss";

export default function Home({ pageProps }) {
  const [topicInput, setTopicInput] = useState("");
  const [result, setResult] = useState();
  const [prompt, setPrompt] = useState();
  const [isLoading, setIsLoading] = useState();

  //handle form submit - send request to OpenAI
  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
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
    setIsLoading(false);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Dad Joke Generator</title>
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
          {isLoading ? (
            <div className={styles.buttonContainer}>
              <input type="submit" value="" />
              <Spinner />
            </div>
          ) : (
            <div className={styles.buttonContainer}>
              <input type="submit" value="Generate jokes" />
            </div>
          )}

          {/* <div className={styles.buttonContainer}>
            <input type="submit" value="Generate jokes" />
            <Spinner />
          </div> */}
        </form>
        {/* {isLoading ? <Spinner /> : <p className={styles.hidden}>not loading</p>} */}
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
