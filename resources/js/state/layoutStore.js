import { defineStore } from 'pinia';

const useLayoutStore = defineStore({
  id: 'layout',

  state: () => ({
    layout: {
      type: 'vertical',
      themeMode: 'light',
      sidebarTheme: 'light',
      showMenu: false,
    },
    persistPaths: ['layout.type', 'layout.themeMode', 'layout.sidebarTheme'],
  }),

  actions: {
    changeThemeMode(themeMode) {
      this.layout.themeMode = themeMode;
    },
    changeSidebarTheme(sidebarTheme) {
      this.layout.sidebarTheme = sidebarTheme;
    },
    setShowMenu(showMenu) {
      this.layout.showMenu = showMenu;
    },
  },
});

export default useLayoutStore;
