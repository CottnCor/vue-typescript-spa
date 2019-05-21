<template>
    <div class="content">
        <input class="primary input" :type="this.type" :placeholder="this.placeholder" required />
        <a>
            <a-icon type="search" />
        </a>
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
class SearchTool extends Vue {
    @Prop(String) public placeholder!: string;

    @Prop({
        type: String,
        default: 'text',
        validator: (value: string) => {
            return ['password', 'text'].includes(value);
        }
    })
    public type!: string;

    @Prop({
        type: Function,
        default: () => {}
    })
    public onChange!: any;

    private searchState = false;

    private searchKeyword: any = null;

    private effectSearch(value: any) {
        this.searchState = true;
    }

    private changeSearch(value: any) {
        if (!this.searchKeyword) {
            this.searchState = false;
        }
    }

    private startSearch(value: any) {
        if (this.searchKeyword) {
            console.log(value);
        }
    }

    private emptySearch() {
        this.searchKeyword = null;
    }
}
export default SearchTool;
</script>

<style lang='scss' scoped>
.content {
    margin: auto 0;
    position: relative;

    .input {
        width: $size_180;
        height: $size_42;
        line-height: $size_42;
        border-radius: $size_42;
        padding-right: $size_42;
        padding-left: $size_16;
        border: $border_base;
        transition: width $ease_in;
        background-color: map-get($default, pure);

        &::-webkit-input-placeholder,
        &:-moz-placeholder,
        &:-ms-input-placeholder,
        &:focus {
            color: map-get($default, grey_4);
        }

        &:focus {
            width: $size_240;
            border-color: map-get($default, primary);
            &::-webkit-input-placeholder,
            &:-moz-placeholder,
            &:-ms-input-placeholder {
                opacity: 0;
                filter: blur($size_3);
            }
            & + a {
                color: map-get($default, pure);
                border-color: map-get($default, primary);
                background: map-get($default, linear_primary);
                transform: $transform_move;
            }
        }

        &:hover {
            border-color: map-get($default, primary);
        }
    }

    a {
        top: 0;
        bottom: 0;
        right: $size_10;
        display: flex;
        position: absolute;
        width: $size_24;
        height: $size_24;
        margin: auto 0;
        border-radius: 50%;
        border: none;
        color: map-get($default, grey_7);
        transition: transform $ease_in;

        i {
            margin: auto;
        }
    }

    @media only screen and (max-width: map-get($breakpoint, sm)) {
        .input {
            max-width: 100%;
            width: 100%;
        }
    }
}
</style>


