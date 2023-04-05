import { createApp } from "@/zero";
import model from "./app.model";
import "@/zero/dist/index.css";
import "./app.less";

export default createApp({ isNeedLogin: true }, model);
