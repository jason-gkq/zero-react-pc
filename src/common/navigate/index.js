import navigate from "./configureNavigate";

export { navigate };

export const history = navigate.history;

export {
  generateRoute,
  guardRoute,
  ConfigureMenu,
  injectRouterRules,
} from "./configureRoute";
