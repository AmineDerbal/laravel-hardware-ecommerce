import { defineStore } from 'pinia';

const useLayoutStore = defineStore({
  id: 'layout',

  state: () => ({
    layout: {
      type: 'vertical',
      themeMode: 'light',
      sidebarTheme: 'light',
      showMenu: false,
      showLoginModal: false,
      showCartModal: false,
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
    setShowLoginModal(showLoginModal) {
      this.layout.showLoginModal = showLoginModal;
    },
    setShowCartModal(showCartModal) {
      this.layout.showCartModal = showCartModal;
    },
  },
});

export default useLayoutStore;
