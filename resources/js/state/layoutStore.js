import { defineStore } from 'pinia';

const useLayoutStore = defineStore({
  id: 'layout',
  persist: true,
  state: () => ({
    layout: {
      type: 'vertical',
      themeMode: 'light',
      sidebarTheme: 'light',
    },
  }),

  actions: {
    changeThemeMode(themeMode) {
      this.layout.themeMode = themeMode;
    },
    changeSidebarTheme(sidebarTheme) {
      this.layout.sidebarTheme = sidebarTheme;
    },
  },
});

export default useLayoutStore;
