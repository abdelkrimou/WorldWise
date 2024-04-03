import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import Navbar from "../components/Navbar";
import styleBtn from "../components/Button.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("karim@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();

  useEffect(
    function () {
      isAuthenticated && navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );
  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) {
      login(email, password);
    }
  }
  return (
    <main className={styles.login}>
      <Navbar />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button className={`${styleBtn.btn} ${styleBtn.primary}`}>
            Login
          </button>
        </div>
      </form>
    </main>
  );
}
