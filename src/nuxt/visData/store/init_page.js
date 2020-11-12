export const state = () => ({
  // 初回のアクセス判定
  flgInitPage: false
});

export const mutations = {
  setFlgInitPageTrue(state) {
    state.flgInitPage = true;
  },
  setFlgInitPageFalse(state) {
    state.flgInitPage = false;
  }
};
