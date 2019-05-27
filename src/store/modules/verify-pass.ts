import { ActionTree, GetterTree, MutationTree } from 'vuex';

interface VerifyPass {}

const namespaced = true;

const state: VerifyPass = {};

const getters: GetterTree<VerifyPass, any> = {};

const actions: ActionTree<VerifyPass, any> = {};

const mutations: MutationTree<VerifyPass> = {};

export default {
    state,
    actions,
    getters,
    mutations,
    namespaced
};
