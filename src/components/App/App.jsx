import { useDispatch, useSelector } from "react-redux";
import BotForm from "../Form/BotForm";
import { selectBot } from "../../redux/bot/selectors";
import css from "./App.module.css";
import { useEffect } from "react";
import { getBotStatus } from "../../redux/bot/operations";

export default function App() {
  const bot = useSelector(selectBot);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBotStatus());
  }, [dispatch]);

  return (
    <main className={css.main}>
      {bot.isLoading ? (
        <div className={css.loader}></div>
      ) : (
        <>
          <h1 className={css.title}>
            <span style={{ color: "#882fb8" }}>Neasty's</span> Twitch Bot
          </h1>
          {bot.error && <div className={css.error}>{bot.error}</div>}
          <BotForm />
        </>
      )}
    </main>
  );
}
