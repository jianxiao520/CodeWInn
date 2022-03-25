


// state
const state = () => ({
    fontSize: 18,           // 编辑器字体大小
    snippet: '',            // 编辑器代码片段
    lang: 'default',        // 编辑器语言环境
    theme: 'mdn-like',      // 编辑器默认皮肤
    tabLen: 2,              // 编辑器Tab长度
    mode: 'text/x-c++src',  // 编辑器语言

})

// mutations
const mutations = {
    SET_EDITOR_FONTSIZE(state, fontSize) {          // 设置编辑器字体大小
        state.fontSize = fontSize;
    },
    SET_EDITOR_LANG(state, lang) {                  // 设置编辑器语言环境
        state.lang = lang;
    },
    SET_EDITOR_SNIPPET(state, snippet) {            // 设置编辑器代码片段
        state.snippet = snippet;
    },
    SET_EDITOR_THEME(state, theme) {                // 设置编辑器主题
        state.theme = theme;
    },
    SET_EDITOR_TABLEN(state, tabLen) {              // 设置编辑器Tab长度
        state.tabLen = tabLen;
    },
    SET_EDITOR_MODE(state, mode) {                  // 设置编辑器mode
        state.mode = mode;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
}