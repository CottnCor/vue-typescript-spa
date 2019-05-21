import { ActionTree, GetterTree, MutationTree } from 'vuex';

interface ErrorTips {
    state1: string;
    state2: number;
}

const namespaced = true;

const state: ErrorTips = {
    state1: 'ErrorTips',
    state2: new Date().getTime()
};

const getters: GetterTree<ErrorTips, number> = {
    state1: (state: ErrorTips) => state.state1,
    state2: (state: ErrorTips) => state.state2
};

const actions: ActionTree<ErrorTips, any> = {
    set_state1({ commit }, data: string) {
        commit('update_state1', data);
    },
    set_state2({ commit }, data: number) {
        commit('update_state2', data);
    }
};

const mutations: MutationTree<ErrorTips> = {
    update_state1(state: ErrorTips, data: string) {
        state.state1 = data;
    },
    update_state2(state: ErrorTips, data: number) {
        state.state2 = data;
    }
};

export default {
    state,
    actions,
    getters,
    mutations,
    namespaced
};
