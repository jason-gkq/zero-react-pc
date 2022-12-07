import platform from "platform";

class systemInfo {
  author: string;
  platform: any;
  winWidth: number;
  winHeight: number;
  onLunchPlatform: any;

  onLunchPackage: any;
  onLunchLocation: any;
  onLunchScreen: any;
  onLunchNavigator: any;
  constructor() {
    const processEnv = process.env;
    const {
      document: documentInfo,
      navigator: navigatorInfo,
      location: locationInfo,
      screen: screenInfo,
      innerHeight,
      innerWidth,
      outerHeight,
      outerWidth,
      screenTop,
      screenLeft,
    } = window;
    const platformInfo = platform.parse(navigatorInfo.userAgent);

    this.author = (processEnv.author as string) || "";
    this.platform = platformInfo.name;
    this.winWidth = innerWidth || documentInfo.body.clientWidth;
    this.winHeight = innerHeight || screenInfo.availHeight;
    /**
     * 根据运行环境解析出来的 platform 信息
     */
    this.onLunchPlatform = platformInfo;
    this.onLunchPackage = {
      projectName: processEnv.npm_package_name || "",
      babelEnv: processEnv.BABEL_ENV,
      nodeEnv: processEnv.NODE_ENV,
      lang: processEnv.LANG,
      launchInstanceID: processEnv.LaunchInstanceID,
      version: processEnv.npm_package_version,
      lifecycleEvent: processEnv.npm_lifecycle_event,
      lifeycleScript: processEnv.npm_lifecycle_script,
      projectMain: processEnv.npm_package_main,
      projectType: processEnv.npm_package_type,
      publicUrlOrPath: processEnv.publicUrlOrPath,
    };
    /**
     * 项目启动时location信息
     */
    this.onLunchLocation = {
      hash: locationInfo.hash,
      host: locationInfo.host,
      hostname: locationInfo.hostname,
      href: locationInfo.href,
      origin: locationInfo.origin,
      pathname: locationInfo.pathname,
      port: locationInfo.port,
      protocol: locationInfo.protocol,
      search: locationInfo.search,
    };
    /**
     * 计算项目启动时所有宽高以及屏幕信息
     */
    this.onLunchScreen = {
      innerHeight, // 屏幕可用工作区高度
      innerWidth, // 屏幕可用工作区宽度
      outerHeight, // 屏幕高
      outerWidth, // 屏幕宽
      clientWidth: documentInfo.body.clientWidth, // 网页可见区域宽
      clientHeight: documentInfo.body.clientHeight, // 网页可见区域高
      offsetWidth: documentInfo.body.offsetWidth, // 网页可见区域宽 (包括边线和滚动条的宽)
      offsetHeight: documentInfo.body.offsetHeight, // 网页可见区域高 (包括边线的宽)
      scrollWidth: documentInfo.body.scrollWidth, // 网页正文全文宽
      scrollHeight: documentInfo.body.scrollHeight, // 网页正文全文高
      // scrollTop:
      //   documentInfo.body.scrollTop || document.documentElement.scrollTop, // .body.scrollTop 网页被卷去的高(ff) || documentElement.scrollTop网页被卷去的高(ie)
      // scrollLeft: documentInfo.body.scrollLeft, // 网页被卷去的左
      screenTop, // 网页正文部分上
      screenLeft, // 网页正文部分左
      height: screenInfo.height, // 屏幕分辨率的高
      width: screenInfo.width, // 屏幕分辨率的宽
      availHeight: screenInfo.availHeight, // 屏幕可用工作区高度
      availWidth: screenInfo.availWidth, // 屏幕可用工作区宽度
      colorDepth: screenInfo.colorDepth, // 屏幕设置的位彩色
      pixelDepth: screenInfo.pixelDepth, // 屏幕设置的像素/英寸
    };
    /**
     * 项目运行环境信息
     */
    this.onLunchNavigator = {
      onLine: navigatorInfo.onLine,
      cookieEnabled: navigatorInfo.cookieEnabled,
      language: navigatorInfo.language,
      userAgent: navigatorInfo.userAgent,
      vendor: navigatorInfo.vendor,
    };
  }
}

const system = new systemInfo();

export const useSystem = () => {
  return system;
};
