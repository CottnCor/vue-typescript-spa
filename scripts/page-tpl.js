/*
 * 页面快速生成脚本
 */

const fs = require('fs')
const path = require('path')
const basePath = path.resolve(__dirname, '../src')

const kebabCaseName = process.argv[2]

if (!kebabCaseName || kebabCaseName.length < 1 || !kebabCaseName.includes('-')) {
  console.log('【error】 like this: npm run page your-page-name (usded kebab-case)')
  process.exit(0)
}

const pascalCaseName = [...(kebabCaseName.toLowerCase().split(/-|_|\s/g))].map(item => item.substring(0, 1).toUpperCase() + item.substring(1)).join().replace(/,/g, '')

/**
 * vue 页面模版
 */
const VueTep = `<template>
    <content-layout>
        <div slot="content" class="wapper">
            <p class="primary title center order-center">{{ this.state1 }}</p>
            <a-button class="order-center" type="dashed" @click="this.fun1">{{
                this.title
            }}</a-button>
        </div>
    </content-layout>
</template>

<script lang="ts" src="./${pascalCaseName}.ts"></script>

<style lang="scss" scoped>
@import './${pascalCaseName}.scss';
</style>

`

// ts 模版
const ScriptTep = `import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action, namespace } from 'vuex-class';

const store = namespace('${pascalCaseName}');

import { ContentLayout } from '@/layout';

import { getData1 } from '@/api/${kebabCaseName}';

@Component({
    components: { ContentLayout }
    })
class ${pascalCaseName} extends Vue {
    @Prop(String) public prop1!: string;

    @Prop(Number) public prop2!: number;

    @store.Getter('state1')
    private state1!: string;

    @store.Action('set_state1')
    private setState1!: (val: string) => void;

    private get timestamp(): number {
        return new Date().getTime();
    }

    private title!: string;

    @Emit('reverseTitle')
    private do() {
        this.title = this.title
            .split('')
            .reverse()
            .join('');
    }

    @Watch('state1', { immediate: true, deep: true })
    private onState1Changed(val: string, oldVal: string) {
        this.fun2(val);
    }

    private activated() {}

    private mounted() {}

    private beforeDestroy() {}

    private fun1() {
        this.title = this.title
            .split('')
            .reverse()
            .join('');
        this.setState1(this.title);
    }

    private fun2(val: string) {
        if (this.title !== val) {
            this.title = val;
        }
    }
}

export default ${pascalCaseName};

`

// scss 模版
const StyleTep = `.wapper {
  width: 100%;
  padding: $size_36;
  display: flex;
}

`

// vuex 模版
const VuexTep = `import { ActionTree, GetterTree, MutationTree } from 'vuex';

interface ${pascalCaseName} {
    state1: string;
    state2: number;
}

const namespaced = true;

const state: ${pascalCaseName} = {
    state1: '${pascalCaseName}',
    state2: new Date().getTime()
};

const getters: GetterTree<${pascalCaseName}, number> = {
    state1: (state: ${pascalCaseName}) => state.state1,
    state2: (state: ${pascalCaseName}) => state.state2
};

const actions: ActionTree<${pascalCaseName}, any> = {
    set_state1({ commit }, data: string) {
        commit('update_state1', data);
    },
    set_state2({ commit }, data: number) {
        commit('update_state2', data);
    }
};

const mutations: MutationTree<${pascalCaseName}> = {
    update_state1(state: ${pascalCaseName}, data: string) {
        state.state1 = data;
    },
    update_state2(state: ${pascalCaseName}, data: number) {
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

`

// api 模版
const ApiTep = `import Request from '@/utils/request';

const request = new Request();

/**
 * @param  {any} param?
 */
export const getData1 = (param?: any) => {
    return {};
};

`

fs.mkdirSync(`${basePath}/views/${kebabCaseName}`)

process.chdir(`${basePath}/views/${kebabCaseName}`)
fs.writeFileSync(`${pascalCaseName}.vue`, VueTep)
fs.writeFileSync(`${pascalCaseName}.ts`, ScriptTep)
fs.writeFileSync(`${pascalCaseName}.scss`, StyleTep)

process.chdir(`${basePath}/store/modules`);
fs.writeFileSync(`${kebabCaseName}.ts`, VuexTep)

process.chdir(`${basePath}/api`);
fs.writeFileSync(`${kebabCaseName}.ts`, ApiTep)

process.exit(0)