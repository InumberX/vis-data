export const state = () => ({
  // ページタイトル
  title: '',
  // ページタイトル（英語）
  titleEn: ''
});

export const mutations = {
  setTitle(state, val) {
    state.title = val;
  },
  setTitleEn(state, val) {
    state.titleEn = val;
  }
};
