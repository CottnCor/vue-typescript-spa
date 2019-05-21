import { ActionTree, GetterTree, MutationTree } from 'vuex';

interface HomePage {
    state1: string;
    state2: number;
}

const namespaced = true;

const state: HomePage = {
    state1: 'HomePage',
    state2: new Date().getTime()
};

const getters: GetterTree<HomePage, number> = {
    state1: (state: HomePage) => state.state1,
    state2: (state: HomePage) => state.state2
};

const actions: ActionTree<HomePage, any> = {
    set_state1({ commit }, data: string) {
        commit('update_state1', data);
    },
    set_state2({ commit }, data: number) {
        commit('update_state2', data);
    }
};

const mutations: MutationTree<HomePage> = {
    update_state1(state: HomePage, data: string) {
        state.state1 = data;
    },
    update_state2(state: HomePage, data: number) {
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
