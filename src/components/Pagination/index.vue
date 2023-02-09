<!-- //--这个应该是全局组件，但是引入全局组件的时候有问题，所以还是老办法：哪个需要它，哪个就引入一遍。。。。 -->
<template>
    <div class="pagination">
        <button v-if="pageNo >= 2" :disabled = "pageNo == 1"
            @click="$emit('getPageNo', pageNo - 1)">上一页</button>
        <button v-if="pageNo >= 4" @click="$emit('getPageNo', 1)">1</button>
        <button v-if="pageNo >= 5">···</button><!--直接拿startNumAndEndNum.start用来做判断其实更简单-->
        <!-- //-- -->
        <button 
            v-for="(page, index) in startNumAndEndNum.end" :key="index"
            v-if="page >= startNumAndEndNum.start"
            @click="$emit('getPageNo', page)"
            :class="{ active: pageNo == page }"
        >
         {{ page }} </button>
        <!-- <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>7</button> -->
        <!-- // 应该是遍历出来-- -->
        <button v-if="pageNo < pageNum - 3">···</button>
        <button v-if="pageNo < pageNum - 2" @click="$emit('getPageNo', pageNum)"> {{ pageNum }} </button><!--this is the last PageNum-->
        <button v-if="pageNo < pageNum" :disabled = "pageNo == pageNum" @click="$emit('getPageNo', pageNo + 1)">下一页</button>

        <button style="margin-left: 30px">共 {{ total }} 条</button>
        <hr>
        <!-- <div>test:后面删掉</div>
        <h1>{{ startNumAndEndNum }}---{{ pageNo }}</h1>
        <h1>{{ testMethods() }}</h1> -->
    </div>
</template>

<script>
export default {
    name: "ComPagination",

    props: [
        //父级给的数据------：
        'pageNo', 'pageSize', 'total', 'continue',
    ],

    computed: {
        //最大页码数：(这个名字取得不太好)
        pageNum: function () {
            //向上取整：
            return Math.ceil(this.total / this.pageSize)
        },

        startNumAndEndNum: function() {
            let start = 0;
            let end = 0;
            //--下面这一大坨自己写的
            if (this.continue > this.pageNum) {//连续页码数 比 总页数(计算出来的pageNum) 还大的情况，也就是总页数太少的时候
                start = 1;
                end = this.pageNum;
            } else { //正常情况 （总页数足够多的时候）
                let TestNum = Math.floor(this.continue / 2);//向下取整
                let TestStart = this.pageNo - TestNum; 
                let TestEnd = this.pageNo + TestNum;
                if (TestStart < 1) { //如果出现0或-1
                    start = 1; //防止出现负数，让他等于1
                    // end = TestEnd;//或者 下面那一行
                    end = this.continue; //这样可以稳定显示五个连续的页码
                } else { //-----
                    if (TestEnd > this.pageNum) { //如果continue的最大值大于pageNum
                        //start = TestStart;// 或者 下面那一行
                        start = this.pageNum - this.continue + 1; //稳定显示五个
                        end = this.pageNum; //防止continue最大值大于pageNum，让他等于pageNum
                    } else { //正常情况，前面没有负数，后面也没有超
                        start = TestStart;
                        end = TestEnd;
                    }
                }
            }
            return { start, end };//------
        },
        
    },

    methods: {
        testMethods() {
            console.log('111111testMethods');
        },

        getPageNo(){

        },
    },
}
</script>

<style lang="less" scoped>

.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &:hover {
            background-color: #ffd9d9;
        }

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #ff3f3f;
            color: #fff;
        }

    }
}
</style>