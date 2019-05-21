import { ActionTree, GetterTree, MutationTree } from 'vuex';

interface VerifyPass {
    state1: string;
    state2: number;
}

const namespaced = true;

const state: VerifyPass = {
    state1: 'VerifyPass',
    state2: new Date().getTime()
};

const getters: GetterTree<VerifyPass, number> = {
    state1: (state: VerifyPass) => state.state1,
    state2: (state: VerifyPass) => state.state2
};

const actions: ActionTree<VerifyPass, any> = {
    set_state1({ commit }, data: string) {
        commit('update_state1', data);
    },
    set_state2({ commit }, data: number) {
        commit('update_state2', data);
    }
};

const mutations: MutationTree<VerifyPass> = {
    update_state1(state: VerifyPass, data: string) {
        state.state1 = data;
    },
    update_state2(state: VerifyPass, data: number) {
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
