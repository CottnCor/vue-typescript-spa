import { Component, Emit, Vue } from 'vue-property-decorator';

const eventBus = (Vue) => {
    const bus = new Bus();
    Vue.prototype.$bus = bus;
};

/**
 * 自定义总线
 */
@Component({})
class Bus extends Vue {
    /**
     * 'do' ？ (vue-property-decorator)Emit装饰器事件名如何传递？ 【待实现】
     */
    @Emit('do')
    public do(...args) {}

    public emit(event, ...args) {
        this.do(args);
    }

    public on(event, callback) {
        this.do(callback);
    }

    public off(event, callback) {
        this.do(callback);
    }
}

export default eventBus;
