// state
const state = () => ({
    isShrinkSidebar: false,             // 是否收缩侧边栏
    isSdialogVisible: false,            // 是否展示登陆弹出框
})


// mutations
const mutations = {
    SET_SIDEBAR_VALUE(state, isSrink) {                 // 设置侧边栏状态
        state.isShrinkSidebar = isSrink;
    },
    SET_SDIALOG_VALUE(state, isVisible) {               // 设置登陆框状态
        state.isSdialogVisible = isVisible;
    }
}

export default {
    namespaced: true,
    state,
    mutations
}