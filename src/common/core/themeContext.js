import React from "react";

export let themes = {
  A: {
    "--theme-color": "#000000",
    background: "#eeeeee",
  },
  B: {
    "--theme-color": "#ffffff",
    background: "#222222",
  },
  C: {
    "--theme-color": "#000230",
    background: "#eeeeee",
  },
};

export const injectTheme = (newThemes) => {
  return Promise.resolve(Object.assign(themes, newThemes));
};

export let currentTheme = "A";

// 确保传递给 createContext 的默认值数据结构是调用的组件（consumers）所能匹配的！
export let ThemeContext = React.createContext({
  theme: currentTheme,
  themeInfo: themes[currentTheme],
  toggleTheme: () => {},
});

// 确保传递给 createContext 的默认值数据结构是调用的组件（consumers）所能匹配的！
export const setThemeContext = (theme) => {
  if (!theme || !themes[theme]) {
    theme = currentTheme;
  }
  currentTheme = theme;
  ThemeContext = React.createContext({
    theme: theme,
    themeInfo: themes[theme],
    toggleTheme: () => {},
  });
};

export const getThemeContext = () => ThemeContext;
