import {
  EGetLaunchParamsResponseLanguages,
  EGetLaunchParamsResponsePlatforms,
  parseURLSearchParamsForGetLaunchParams
} from "@vkontakte/vk-bridge";
import { LaunchParams } from "@vkontakte/vk-bridge/dist/types/src/parseURLSearchParamsForGetLaunchParams";

export const MOBILE_VK_PLATFORMS: string[] = [
  EGetLaunchParamsResponsePlatforms.MOBILE_ANDROID,
  EGetLaunchParamsResponsePlatforms.MOBILE_ANDROID_MESSENGER,
  EGetLaunchParamsResponsePlatforms.MOBILE_IPAD,
  EGetLaunchParamsResponsePlatforms.MOBILE_IPHONE,
  EGetLaunchParamsResponsePlatforms.MOBILE_IPHONE_MESSENGER,
  EGetLaunchParamsResponsePlatforms.MOBILE_WEB
];

export const DESKTOP_VK_PLATFORMS: string[] = [
  EGetLaunchParamsResponsePlatforms.DESKTOP_APP_MESSENGER,
  EGetLaunchParamsResponsePlatforms.DESKTOP_WEB,
  EGetLaunchParamsResponsePlatforms.DESKTOP_WEB_MESSENGER
];

export const getVkLaunchParams = (): Partial<LaunchParams> => {
  return parseURLSearchParamsForGetLaunchParams(window.location.search);
};

export const getLaunchLanguage = (): EGetLaunchParamsResponseLanguages | undefined => {
  const launchParams: Partial<LaunchParams> = getVkLaunchParams();
  return launchParams.vk_language;
};

export const getLaunchPlatform = (): EGetLaunchParamsResponsePlatforms | undefined => {
  const launchParams: Partial<LaunchParams> = getVkLaunchParams();
  return launchParams.vk_platform;
};

export const isOnMobilePlatform = (): boolean => {
  const launchPlatform: EGetLaunchParamsResponsePlatforms | undefined = getLaunchPlatform();
  return launchPlatform !== undefined && MOBILE_VK_PLATFORMS.includes(launchPlatform);
};

export const isOnDesktopPlatform = (): boolean => {
  const launchPlatform: EGetLaunchParamsResponsePlatforms | undefined = getLaunchPlatform();
  return launchPlatform !== undefined && DESKTOP_VK_PLATFORMS.includes(launchPlatform);
};

export const isOnUnknownPlatform = (): boolean => {
  return !isOnMobilePlatform() && !isOnDesktopPlatform();
};
