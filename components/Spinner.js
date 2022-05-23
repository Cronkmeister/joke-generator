import styles from "../styles/spinner.module.scss";

function Spinner() {
  return (
    <>
      <div class={styles.ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}

export default Spinner;
