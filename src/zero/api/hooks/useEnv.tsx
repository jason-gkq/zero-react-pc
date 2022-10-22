import { applicationEnv } from "../../utils";

type IEnvConfig = {
  ENV: string;
  FILE_SERVICE_URL: string;
  VERSION: string;
  appId: string;
  appName: string;
  cachePrefix: string;
  clientId: string;
  digitalPlatform: string;
  layout: Record<string, any>;
  onLunchTime: number;
  parentSessionId: string;
  sessionId: string;
  ssoLoginUrl: string;
  uploadUrl: string;
  [key: string]: any;
};

export const useEnv = () => {
  return applicationEnv as any; // as IEnvConfig
};
