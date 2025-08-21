import { Field, Formik, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import css from "./Form.module.css";
import clsx from "clsx";
import { startBot, stopBot } from "../../redux/bot/operations";
import { selectBot } from "../../redux/bot/selectors";

const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  message: Yup.string()
    .min(1, "Message is too short")
    .max(500, "Message is too long")
    .required("Message is required"),
  interval: Yup.number().min(0.1).required("Interval is required"),
  token: Yup.string()
    .min(1, "Token is too short")
    .max(40, "Token is too long")
    .required("Token is required"),
});

export default function BotForm() {
  const dispatch = useDispatch();
  const bot = useSelector(selectBot);

  const initialValues = JSON.parse(localStorage.getItem("botForm"))
    ? JSON.parse(localStorage.getItem("botForm"))
    : {
        name: "",
        message: "",
        interval: 5,
        token: "",
      };

  const handleSubmit = (values) => {
    dispatch(startBot(values));
    localStorage.setItem("botForm", JSON.stringify(values));
    console.log("starting...");
  };

  const handleStopBot = () => {
    dispatch(stopBot());
    console.log("stopping...");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ isValid }) => (
        <Form className={css.form}>
          <ul className={css.fieldsList}>
            <li className={css.fieldsItem}>
              <div className={css.itemHeader}>
                <label htmlFor="name" className={css.label}>
                  Bot name
                </label>
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.error}
                />
              </div>
              <Field name="name" placeholder="Name" className={css.field} />
            </li>
            <li className={css.fieldsItem}>
              <div className={css.itemHeader}>
                <label htmlFor="message" className={css.label}>
                  Message
                </label>
                <ErrorMessage
                  name="message"
                  component="div"
                  className={css.error}
                />
              </div>
              <Field
                as="textarea"
                id="message"
                name="message"
                placeholder="Message for chat"
                className={clsx(css.field, css.textarea)}
              />
            </li>
            <li className={css.fieldsItem}>
              <div className={css.itemHeader}>
                <label htmlFor="token" className={css.label}>
                  Token
                </label>
                <ErrorMessage
                  name="token"
                  component="div"
                  className={css.error}
                />
              </div>
              <Field
                type="password"
                name="token"
                placeholder="Twitch token"
                className={css.field}
              />
            </li>
            <li className={css.fieldsItem}>
              <div className={css.itemHeader}>
                <label htmlFor="interval" className={css.label}>
                  Interval
                </label>
                <ErrorMessage
                  name="interval"
                  component="div"
                  className={css.error}
                />
              </div>
              <Field
                type="number"
                name="interval"
                placeholder="Minutes"
                className={clsx(css.field, css.interval)}
              />
            </li>
          </ul>
          <ul className={css.buttonsList}>
            {!bot.is_active ? (
              <li className={css.buttonsItem}>
                <button
                  type="submit"
                  disabled={bot.isRefreshing || !isValid}
                  className={clsx(
                    css.button,
                    css.startButton,
                    (bot.isRefreshing || !isValid) && css.disaled
                  )}
                >
                  {bot.isRefreshing ? (
                    <div className={css.loader}></div>
                  ) : (
                    "Start Bot"
                  )}
                </button>
              </li>
            ) : (
              <li className={css.buttonsItem}>
                <button
                  type="button"
                  onClick={handleStopBot}
                  disabled={bot.isRefreshing}
                  className={clsx(
                    css.button,
                    css.stopButton,
                    bot.isRefreshing && css.disaled
                  )}
                >
                  {bot.isRefreshing ? (
                    <div className={css.loader}></div>
                  ) : (
                    "Stop Bot"
                  )}
                </button>
              </li>
            )}
          </ul>
        </Form>
      )}
    </Formik>
  );
}
