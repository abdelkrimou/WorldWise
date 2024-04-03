import styles from "./Button.module.css";
function Button({ children, type, handleClick = () => {} }) {
  return (
    <button
      className={`${styles.btn} ${styles[type]}`}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
    >
      {children}
    </button>
  );
}

export default Button;
