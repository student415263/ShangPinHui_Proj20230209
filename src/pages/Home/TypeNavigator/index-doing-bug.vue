<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="resetCurrentIndex"
                >
                <h2 class="all">全部商品分类</h2>
                <div class="sort">
                    <div class="all-sort-list2"
                        @click="goRouteSearch"
                        >
                        <!-- 事件委派（给父节点），（利用冒泡，） -->

                        <!-- 
                            后端的数据结构：

                            [
                                {
                                    id:aaaa
                                    name:bbb
                                    child:[
                                        id:aaaa
                                        name:bbbb
                                        child:[
                                            id:1
                                            name:11
                                            `````````````
                                        ]
                                    ]
                                },
                                {
                                    //格式同上
                                }
                            ]

                        -->



                        <!-- //1 -->
                        <!-- 
                        :class="{whithListBgc:currentListIndex == index}"     里面：
                            whithListBgc是类名，
                            currentListIndex是mouseenter事件获取的那一个list的index
                            index就是v-for生成组件的时候生成的固定索引值 
                        -->
                        <div class="item bo c1CategoryListBgc" 
                            v-for="(c1, index) in categoryList" 
                            :key="c1.categoryId"
                            :class="{whithListBgc:currentListIndex == index}"
                            >
                            <h3 
                                @mouseenter="changeIndex(index)"

                            >
                                <!-- 用编程式导航 -->
                                <a 
                                    :data-categoryName="c1.categoryName"
                                    :c1-data-categoryId="c1.categoryId"
                                    >{{index+1}}. {{c1.categoryName}}</a>
                                <!-- 声明式导航会导致性能问题，所以不用了 -->
                                <!-- <router-link to="/Route1Search">{{index+1}}. {{c1.categoryName}}</router-link> -->
                            </h3>

                            <!-- {display: currentListIndex == index? 'block': 'block'} -->
                            <div 
                                class="item-list clearfix"
                                @mouseenter="C2MouseEnter"
                                :style="{display: currentListIndex == index? 'block': 'none'}"
                            >
                            <!-- ,{display: changeC2Show} -->
    <!--                         <div 
                                class="item-list clearfix"
                            > -->

                                <!-- //2 -->
                                <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId"
                                    @mouseleave="C2MouseLeave"
                                >
                                    <dl class="fore">
                                        <dt>
                                            <a 
                                                :data-categoryName="c2.categoryName" href=""
                                                :c2-data-categoryId="c2.categoryId">{{index+1}}. {{c2.categoryName}}</a>
                                            <!-- <router-link to="/Route1Search">{{c2.categoryName}}</router-link> -->
                                        </dt>
                                        <dd>

                                            <!-- // -->
                                            <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                                                <a 
                                                    :data-categoryName="c3.categoryName"
                                                    :c3-data-categoryId="c3.categoryId">{{index+1}}. {{ c3.categoryName }}</a>
                                                <!-- <router-link to="/Route1Search">{{ c3.categoryName }}</router-link> -->
                                            </em>
                                        <!--  <em>
                                                <a href="">文学</a>
                                            </em>
                                            <em>
                                                <a href="">经管</a>
                                            </em>
                                            <em>
                                                <a href="">畅读VIP</a>
                                            </em> -->
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
    <!--                     <div class="item bo">
                            <h3>
                                <a href="JavaScript:;">图书、音像、数字商品</a>
                            </h3>
                            <div class="item-list clearfix">
                                <div class="subitem">
                                    <dl class="fore">
                                        <dt>
                                            <a href="">电子书</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">婚恋/两性</a>
                                            </em>
                                            <em>
                                                <a href="">文学</a>
                                            </em>
                                            <em>
                                                <a href="">经管</a>
                                            </em>
                                            <em>
                                                <a href="">畅读VIP</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div> -->
                        <!-- <div class="item">
                            <h3>
                                <a href="">家用电器</a>
                            </h3>
                            <div class="item-list clearfix">
                                <div class="subitem">
                                    <dl class="fore">
                                        <dt>
                                            <a href="">电子书1</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">免费</a>
                                            </em>
                                            <em>
                                                <a href="">小说</a>
                                            </em>
                                            <em>
                                                <a href="">励志与成功</a>
                                            </em>
                                            <em>
                                                <a href="">婚恋/两性</a>
                                            </em>
                                            <em>
                                                <a href="">文学</a>
                                            </em>
                                            <em>
                                                <a href="">经管</a>
                                            </em>
                                            <em>
                                                <a href="">畅读VIP</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>
                                            <a href="">数字音乐</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">通俗流行</a>
                                            </em>
                                            <em>
                                                <a href="">古典音乐</a>
                                            </em>
                                            <em>
                                                <a href="">摇滚说唱</a>
                                            </em>
                                            <em>
                                                <a href="">爵士蓝调</a>
                                            </em>
                                            <em>
                                                <a href="">乡村民谣</a>
                                            </em>
                                            <em>
                                                <a href="">有声读物</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>
                                            <a href="">音像</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">音乐</a>
                                            </em>
                                            <em>
                                                <a href="">影视</a>
                                            </em>
                                            <em>
                                                <a href="">教育音像</a>
                                            </em>
                                            <em>
                                                <a href="">游戏</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>文艺</dt>
                                        <dd>
                                            <em>
                                                <a href="">小说</a>
                                            </em>
                                            <em>
                                                <a href="">文学</a>
                                            </em>
                                            <em>
                                                <a href="">青春文学</a>
                                            </em>
                                            <em>
                                                <a href="">传记</a>
                                            </em>
                                            <em>
                                                <a href="">艺术</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>人文社科</dt>
                                        <dd>
                                            <em>
                                                <a href="">历史</a>
                                            </em>
                                            <em>
                                                <a href="">心理学</a>
                                            </em>
                                            <em>
                                                <a href="">政治/军事</a>
                                            </em>
                                            <em>
                                                <a href="">国学/古籍</a>
                                            </em>
                                            <em>
                                                <a href="">哲学/宗教</a>
                                            </em>
                                            <em>
                                                <a href="">社会科学</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>经管励志</dt>
                                        <dd>
                                            <em>
                                                <a href="">经济</a>
                                            </em>
                                            <em>
                                                <a href="">金融与投资</a>
                                            </em>
                                            <em>
                                                <a href="">管理</a>
                                            </em>
                                            <em>
                                                <a href="">励志与成功</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>生活</dt>
                                        <dd>
                                            <em>
                                                <a href="">家庭与育儿</a>
                                            </em>
                                            <em>
                                                <a href="">旅游/地图</a>
                                            </em>
                                            <em>
                                                <a href="">烹饪/美食</a>
                                            </em>
                                            <em>
                                                <a href="">时尚/美妆</a>
                                            </em>
                                            <em>
                                                <a href="">家居</a>
                                            </em>
                                            <em>
                                                <a href="">婚恋与两性</a>
                                            </em>
                                            <em>
                                                <a href="">娱乐/休闲</a>
                                            </em>
                                            <em>
                                                <a href="">健身与保健</a>
                                            </em>
                                            <em>
                                                <a href="">动漫/幽默</a>
                                            </em>
                                            <em>
                                                <a href="">体育/运动</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>科技</dt>
                                        <dd>
                                            <em>
                                                <a href="">科普</a>
                                            </em>
                                            <em>
                                                <a href="">IT</a>
                                            </em>
                                            <em>
                                                <a href="">建筑</a>
                                            </em>
                                            <em>
                                                <a href="">医学</a>
                                            </em>
                                            <em>
                                                <a href="">工业技术</a>
                                            </em>
                                            <em>
                                                <a href="">电子/通信</a>
                                            </em>
                                            <em>
                                                <a href="">农林</a>
                                            </em>
                                            <em>
                                                <a href="">科学与自然</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>少儿</dt>
                                        <dd>
                                            <em>
                                                <a href="">少儿</a>
                                            </em>
                                            <em>
                                                <a href="">0-2岁</a>
                                            </em>
                                            <em>
                                                <a href="">3-6岁</a>
                                            </em>
                                            <em>
                                                <a href="">7-10岁</a>
                                            </em>
                                            <em>
                                                <a href="">11-14岁</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <h3>
                                <a href="">手机、数码、充值</a>
                            </h3>
                            <div class="item-list clearfix">
                                <div class="subitem">
                                    <dl class="fore">
                                        <dt>
                                            <a href="">充值</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="recharge.html">充值</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>
                                            <a href="">电子书2</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">免费</a>
                                            </em>
                                            <em>
                                                <a href="">小说</a>
                                            </em>
                                            <em>
                                                <a href="">励志与成功</a>
                                            </em>
                                            <em>
                                                <a href="">婚恋/两性</a>
                                            </em>
                                            <em>
                                                <a href="">文学</a>
                                            </em>
                                            <em>
                                                <a href="">经管</a>
                                            </em>
                                            <em>
                                                <a href="">畅读VIP</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>
                                            <a href="">数字音乐</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">通俗流行</a>
                                            </em>
                                            <em>
                                                <a href="">古典音乐</a>
                                            </em>
                                            <em>
                                                <a href="">摇滚说唱</a>
                                            </em>
                                            <em>
                                                <a href="">爵士蓝调</a>
                                            </em>
                                            <em>
                                                <a href="">乡村民谣</a>
                                            </em>
                                            <em>
                                                <a href="">有声读物</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>
                                            <a href="">音像</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">音乐</a>
                                            </em>
                                            <em>
                                                <a href="">影视</a>
                                            </em>
                                            <em>
                                                <a href="">教育音像</a>
                                            </em>
                                            <em>
                                                <a href="">游戏</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>文艺</dt>
                                        <dd>
                                            <em>
                                                <a href="">小说</a>
                                            </em>
                                            <em>
                                                <a href="">文学</a>
                                            </em>
                                            <em>
                                                <a href="">青春文学</a>
                                            </em>
                                            <em>
                                                <a href="">传记</a>
                                            </em>
                                            <em>
                                                <a href="">艺术</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>人文社科</dt>
                                        <dd>
                                            <em>
                                                <a href="">历史</a>
                                            </em>
                                            <em>
                                                <a href="">心理学</a>
                                            </em>
                                            <em>
                                                <a href="">政治/军事</a>
                                            </em>
                                            <em>
                                                <a href="">国学/古籍</a>
                                            </em>
                                            <em>
                                                <a href="">哲学/宗教</a>
                                            </em>
                                            <em>
                                                <a href="">社会科学</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <h3>
                                <a href="">电脑、办公</a>
                            </h3>
                            <div class="item-list clearfix">
                                <div class="subitem">
                                    <dl class="fore">
                                        <dt>
                                            <a href="">电子书3</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">免费</a>
                                            </em>
                                            <em>
                                                <a href="">小说</a>
                                            </em>
                                            <em>
                                                <a href="">励志与成功</a>
                                            </em>
                                            <em>
                                                <a href="">婚恋/两性</a>
                                            </em>
                                            <em>
                                                <a href="">文学</a>
                                            </em>
                                            <em>
                                                <a href="">经管</a>
                                            </em>
                                            <em>
                                                <a href="">畅读VIP</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>
                                            <a href="">数字音乐</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">通俗流行</a>
                                            </em>
                                            <em>
                                                <a href="">古典音乐</a>
                                            </em>
                                            <em>
                                                <a href="">摇滚说唱</a>
                                            </em>
                                            <em>
                                                <a href="">爵士蓝调</a>
                                            </em>
                                            <em>
                                                <a href="">乡村民谣</a>
                                            </em>
                                            <em>
                                                <a href="">有声读物</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>
                                            <a href="">音像</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">音乐</a>
                                            </em>
                                            <em>
                                                <a href="">影视</a>
                                            </em>
                                            <em>
                                                <a href="">教育音像</a>
                                            </em>
                                            <em>
                                                <a href="">游戏</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>文艺</dt>
                                        <dd>
                                            <em>
                                                <a href="">小说</a>
                                            </em>
                                            <em>
                                                <a href="">文学</a>
                                            </em>
                                            <em>
                                                <a href="">青春文学</a>
                                            </em>
                                            <em>
                                                <a href="">传记</a>
                                            </em>
                                            <em>
                                                <a href="">艺术</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>人文社科</dt>
                                        <dd>
                                            <em>
                                                <a href="">历史</a>
                                            </em>
                                            <em>
                                                <a href="">心理学</a>
                                            </em>
                                            <em>
                                                <a href="">政治/军事</a>
                                            </em>
                                            <em>
                                                <a href="">国学/古籍</a>
                                            </em>
                                            <em>
                                                <a href="">哲学/宗教</a>
                                            </em>
                                            <em>
                                                <a href="">社会科学</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>经管励志</dt>
                                        <dd>
                                            <em>
                                                <a href="">经济</a>
                                            </em>
                                            <em>
                                                <a href="">金融与投资</a>
                                            </em>
                                            <em>
                                                <a href="">管理</a>
                                            </em>
                                            <em>
                                                <a href="">励志与成功</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>生活</dt>
                                        <dd>
                                            <em>
                                                <a href="">家庭与育儿</a>
                                            </em>
                                            <em>
                                                <a href="">旅游/地图</a>
                                            </em>
                                            <em>
                                                <a href="">烹饪/美食</a>
                                            </em>
                                            <em>
                                                <a href="">时尚/美妆</a>
                                            </em>
                                            <em>
                                                <a href="">家居</a>
                                            </em>
                                            <em>
                                                <a href="">婚恋与两性</a>
                                            </em>
                                            <em>
                                                <a href="">娱乐/休闲</a>
                                            </em>
                                            <em>
                                                <a href="">健身与保健</a>
                                            </em>
                                            <em>
                                                <a href="">动漫/幽默</a>
                                            </em>
                                            <em>
                                                <a href="">体育/运动</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>科技</dt>
                                        <dd>
                                            <em>
                                                <a href="">科普</a>
                                            </em>
                                            <em>
                                                <a href="">IT</a>
                                            </em>
                                            <em>
                                                <a href="">建筑</a>
                                            </em>
                                            <em>
                                                <a href="">医学</a>
                                            </em>
                                            <em>
                                                <a href="">工业技术</a>
                                            </em>
                                            <em>
                                                <a href="">电子/通信</a>
                                            </em>
                                            <em>
                                                <a href="">农林</a>
                                            </em>
                                            <em>
                                                <a href="">科学与自然</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>少儿</dt>
                                        <dd>
                                            <em>
                                                <a href="">少儿</a>
                                            </em>
                                            <em>
                                                <a href="">0-2岁</a>
                                            </em>
                                            <em>
                                                <a href="">3-6岁</a>
                                            </em>
                                            <em>
                                                <a href="">7-10岁</a>
                                            </em>
                                            <em>
                                                <a href="">11-14岁</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>教育</dt>
                                        <dd>
                                            <em>
                                                <a href="">教材教辅</a>
                                            </em>
                                            <em>
                                                <a href="">考试</a>
                                            </em>
                                            <em>
                                                <a href="">外语学习</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>其它</dt>
                                        <dd>
                                            <em>
                                                <a href="">英文原版书</a>
                                            </em>
                                            <em>
                                                <a href="">港台图书</a>
                                            </em>
                                            <em>
                                                <a href="">工具书</a>
                                            </em>
                                            <em>
                                                <a href="">套装书</a>
                                            </em>
                                            <em>
                                                <a href="">杂志/期刊</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <h3>
                                <a href="">家居、家具、家装、厨具</a>
                            </h3>
                            <div class="item-list clearfix">
                                <div class="subitem">
                                    <dl class="fore">
                                        <dt>
                                            <a href="">电子书4</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">免费</a>
                                            </em>
                                            <em>
                                                <a href="">小说</a>
                                            </em>
                                            <em>
                                                <a href="">励志与成功</a>
                                            </em>
                                            <em>
                                                <a href="">婚恋/两性</a>
                                            </em>
                                            <em>
                                                <a href="">文学</a>
                                            </em>
                                            <em>
                                                <a href="">经管</a>
                                            </em>
                                            <em>
                                                <a href="">畅读VIP</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>
                                            <a href="">数字音乐</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">通俗流行</a>
                                            </em>
                                            <em>
                                                <a href="">古典音乐</a>
                                            </em>
                                            <em>
                                                <a href="">摇滚说唱</a>
                                            </em>
                                            <em>
                                                <a href="">爵士蓝调</a>
                                            </em>
                                            <em>
                                                <a href="">乡村民谣</a>
                                            </em>
                                            <em>
                                                <a href="">有声读物</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>
                                            <a href="">音像</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">音乐</a>
                                            </em>
                                            <em>
                                                <a href="">影视</a>
                                            </em>
                                            <em>
                                                <a href="">教育音像</a>
                                            </em>
                                            <em>
                                                <a href="">游戏</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>文艺</dt>
                                        <dd>
                                            <em>
                                                <a href="">小说</a>
                                            </em>
                                            <em>
                                                <a href="">文学</a>
                                            </em>
                                            <em>
                                                <a href="">青春文学</a>
                                            </em>
                                            <em>
                                                <a href="">传记</a>
                                            </em>
                                            <em>
                                                <a href="">艺术</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>人文社科</dt>
                                        <dd>
                                            <em>
                                                <a href="">历史</a>
                                            </em>
                                            <em>
                                                <a href="">心理学</a>
                                            </em>
                                            <em>
                                                <a href="">政治/军事</a>
                                            </em>
                                            <em>
                                                <a href="">国学/古籍</a>
                                            </em>
                                            <em>
                                                <a href="">哲学/宗教</a>
                                            </em>
                                            <em>
                                                <a href="">社会科学</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>经管励志</dt>
                                        <dd>
                                            <em>
                                                <a href="">经济</a>
                                            </em>
                                            <em>
                                                <a href="">金融与投资</a>
                                            </em>
                                            <em>
                                                <a href="">管理</a>
                                            </em>
                                            <em>
                                                <a href="">励志与成功</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>生活</dt>
                                        <dd>
                                            <em>
                                                <a href="">家庭与育儿</a>
                                            </em>
                                            <em>
                                                <a href="">旅游/地图</a>
                                            </em>
                                            <em>
                                                <a href="">烹饪/美食</a>
                                            </em>
                                            <em>
                                                <a href="">时尚/美妆</a>
                                            </em>
                                            <em>
                                                <a href="">家居</a>
                                            </em>
                                            <em>
                                                <a href="">婚恋与两性</a>
                                            </em>
                                            <em>
                                                <a href="">娱乐/休闲</a>
                                            </em>
                                            <em>
                                                <a href="">健身与保健</a>
                                            </em>
                                            <em>
                                                <a href="">动漫/幽默</a>
                                            </em>
                                            <em>
                                                <a href="">体育/运动</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>科技</dt>
                                        <dd>
                                            <em>
                                                <a href="">科普</a>
                                            </em>
                                            <em>
                                                <a href="">IT</a>
                                            </em>
                                            <em>
                                                <a href="">建筑</a>
                                            </em>
                                            <em>
                                                <a href="">医学</a>
                                            </em>
                                            <em>
                                                <a href="">工业技术</a>
                                            </em>
                                            <em>
                                                <a href="">电子/通信</a>
                                            </em>
                                            <em>
                                                <a href="">农林</a>
                                            </em>
                                            <em>
                                                <a href="">科学与自然</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>少儿</dt>
                                        <dd>
                                            <em>
                                                <a href="">少儿</a>
                                            </em>
                                            <em>
                                                <a href="">0-2岁</a>
                                            </em>
                                            <em>
                                                <a href="">3-6岁</a>
                                            </em>
                                            <em>
                                                <a href="">7-10岁</a>
                                            </em>
                                            <em>
                                                <a href="">11-14岁</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <h3>
                                <a href="">服饰内衣</a>
                            </h3>
                            <div class="item-list clearfix">
                                <div class="subitem">
                                    <dl class="fore">
                                        <dt>
                                            <a href="">电子书5</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">免费</a>
                                            </em>
                                            <em>
                                                <a href="">小说</a>
                                            </em>
                                            <em>
                                                <a href="">励志与成功</a>
                                            </em>
                                            <em>
                                                <a href="">婚恋/两性</a>
                                            </em>
                                            <em>
                                                <a href="">文学</a>
                                            </em>
                                            <em>
                                                <a href="">经管</a>
                                            </em>
                                            <em>
                                                <a href="">畅读VIP</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>
                                            <a href="">数字音乐</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">通俗流行</a>
                                            </em>
                                            <em>
                                                <a href="">古典音乐</a>
                                            </em>
                                            <em>
                                                <a href="">摇滚说唱</a>
                                            </em>
                                            <em>
                                                <a href="">爵士蓝调</a>
                                            </em>
                                            <em>
                                                <a href="">乡村民谣</a>
                                            </em>
                                            <em>
                                                <a href="">有声读物</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>
                                            <a href="">音像</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">音乐</a>
                                            </em>
                                            <em>
                                                <a href="">影视</a>
                                            </em>
                                            <em>
                                                <a href="">教育音像</a>
                                            </em>
                                            <em>
                                                <a href="">游戏</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>文艺</dt>
                                        <dd>
                                            <em>
                                                <a href="">小说</a>
                                            </em>
                                            <em>
                                                <a href="">文学</a>
                                            </em>
                                            <em>
                                                <a href="">青春文学</a>
                                            </em>
                                            <em>
                                                <a href="">传记</a>
                                            </em>
                                            <em>
                                                <a href="">艺术</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>人文社科</dt>
                                        <dd>
                                            <em>
                                                <a href="">历史</a>
                                            </em>
                                            <em>
                                                <a href="">心理学</a>
                                            </em>
                                            <em>
                                                <a href="">政治/军事</a>
                                            </em>
                                            <em>
                                                <a href="">国学/古籍</a>
                                            </em>
                                            <em>
                                                <a href="">哲学/宗教</a>
                                            </em>
                                            <em>
                                                <a href="">社会科学</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>经管励志</dt>
                                        <dd>
                                            <em>
                                                <a href="">经济</a>
                                            </em>
                                            <em>
                                                <a href="">金融与投资</a>
                                            </em>
                                            <em>
                                                <a href="">管理</a>
                                            </em>
                                            <em>
                                                <a href="">励志与成功</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>生活</dt>
                                        <dd>
                                            <em>
                                                <a href="">家庭与育儿</a>
                                            </em>
                                            <em>
                                                <a href="">旅游/地图</a>
                                            </em>
                                            <em>
                                                <a href="">烹饪/美食</a>
                                            </em>
                                            <em>
                                                <a href="">时尚/美妆</a>
                                            </em>
                                            <em>
                                                <a href="">家居</a>
                                            </em>
                                            <em>
                                                <a href="">婚恋与两性</a>
                                            </em>
                                            <em>
                                                <a href="">娱乐/休闲</a>
                                            </em>
                                            <em>
                                                <a href="">健身与保健</a>
                                            </em>
                                            <em>
                                                <a href="">动漫/幽默</a>
                                            </em>
                                            <em>
                                                <a href="">体育/运动</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>科技</dt>
                                        <dd>
                                            <em>
                                                <a href="">科普</a>
                                            </em>
                                            <em>
                                                <a href="">IT</a>
                                            </em>
                                            <em>
                                                <a href="">建筑</a>
                                            </em>
                                            <em>
                                                <a href="">医学</a>
                                            </em>
                                            <em>
                                                <a href="">工业技术</a>
                                            </em>
                                            <em>
                                                <a href="">电子/通信</a>
                                            </em>
                                            <em>
                                                <a href="">农林</a>
                                            </em>
                                            <em>
                                                <a href="">科学与自然</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <h3>
                                <a href="">个护化妆</a>
                            </h3>
                            <div class="item-list clearfix">
                                <div class="subitem">
                                    <dl class="fore">
                                        <dt>
                                            <a href="">电子书6</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">免费</a>
                                            </em>
                                            <em>
                                                <a href="">小说</a>
                                            </em>
                                            <em>
                                                <a href="">励志与成功</a>
                                            </em>
                                            <em>
                                                <a href="">婚恋/两性</a>
                                            </em>
                                            <em>
                                                <a href="">文学</a>
                                            </em>
                                            <em>
                                                <a href="">经管</a>
                                            </em>
                                            <em>
                                                <a href="">畅读VIP</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>
                                            <a href="">数字音乐</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">通俗流行</a>
                                            </em>
                                            <em>
                                                <a href="">古典音乐</a>
                                            </em>
                                            <em>
                                                <a href="">摇滚说唱</a>
                                            </em>
                                            <em>
                                                <a href="">爵士蓝调</a>
                                            </em>
                                            <em>
                                                <a href="">乡村民谣</a>
                                            </em>
                                            <em>
                                                <a href="">有声读物</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>
                                            <a href="">音像</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">音乐</a>
                                            </em>
                                            <em>
                                                <a href="">影视</a>
                                            </em>
                                            <em>
                                                <a href="">教育音像</a>
                                            </em>
                                            <em>
                                                <a href="">游戏</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>文艺</dt>
                                        <dd>
                                            <em>
                                                <a href="">小说</a>
                                            </em>
                                            <em>
                                                <a href="">文学</a>
                                            </em>
                                            <em>
                                                <a href="">青春文学</a>
                                            </em>
                                            <em>
                                                <a href="">传记</a>
                                            </em>
                                            <em>
                                                <a href="">艺术</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>人文社科</dt>
                                        <dd>
                                            <em>
                                                <a href="">历史</a>
                                            </em>
                                            <em>
                                                <a href="">心理学</a>
                                            </em>
                                            <em>
                                                <a href="">政治/军事</a>
                                            </em>
                                            <em>
                                                <a href="">国学/古籍</a>
                                            </em>
                                            <em>
                                                <a href="">哲学/宗教</a>
                                            </em>
                                            <em>
                                                <a href="">社会科学</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>经管励志</dt>
                                        <dd>
                                            <em>
                                                <a href="">经济</a>
                                            </em>
                                            <em>
                                                <a href="">金融与投资</a>
                                            </em>
                                            <em>
                                                <a href="">管理</a>
                                            </em>
                                            <em>
                                                <a href="">励志与成功</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>生活</dt>
                                        <dd>
                                            <em>
                                                <a href="">家庭与育儿</a>
                                            </em>
                                            <em>
                                                <a href="">旅游/地图</a>
                                            </em>
                                            <em>
                                                <a href="">烹饪/美食</a>
                                            </em>
                                            <em>
                                                <a href="">时尚/美妆</a>
                                            </em>
                                            <em>
                                                <a href="">家居</a>
                                            </em>
                                            <em>
                                                <a href="">婚恋与两性</a>
                                            </em>
                                            <em>
                                                <a href="">娱乐/休闲</a>
                                            </em>
                                            <em>
                                                <a href="">健身与保健</a>
                                            </em>
                                            <em>
                                                <a href="">动漫/幽默</a>
                                            </em>
                                            <em>
                                                <a href="">体育/运动</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>科技</dt>
                                        <dd>
                                            <em>
                                                <a href="">科普</a>
                                            </em>
                                            <em>
                                                <a href="">IT</a>
                                            </em>
                                            <em>
                                                <a href="">建筑</a>
                                            </em>
                                            <em>
                                                <a href="">医学</a>
                                            </em>
                                            <em>
                                                <a href="">工业技术</a>
                                            </em>
                                            <em>
                                                <a href="">电子/通信</a>
                                            </em>
                                            <em>
                                                <a href="">农林</a>
                                            </em>
                                            <em>
                                                <a href="">科学与自然</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>少儿</dt>
                                        <dd>
                                            <em>
                                                <a href="">少儿</a>
                                            </em>
                                            <em>
                                                <a href="">0-2岁</a>
                                            </em>
                                            <em>
                                                <a href="">3-6岁</a>
                                            </em>
                                            <em>
                                                <a href="">7-10岁</a>
                                            </em>
                                            <em>
                                                <a href="">11-14岁</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>教育</dt>
                                        <dd>
                                            <em>
                                                <a href="">教材教辅</a>
                                            </em>
                                            <em>
                                                <a href="">考试</a>
                                            </em>
                                            <em>
                                                <a href="">外语学习</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>其它</dt>
                                        <dd>
                                            <em>
                                                <a href="">英文原版书</a>
                                            </em>
                                            <em>
                                                <a href="">港台图书</a>
                                            </em>
                                            <em>
                                                <a href="">工具书</a>
                                            </em>
                                            <em>
                                                <a href="">套装书</a>
                                            </em>
                                            <em>
                                                <a href="">杂志/期刊</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <h3>
                                <a href="">运动健康</a>
                            </h3>
                            <div class="item-list clearfix">
                                <div class="subitem">
                                    <dl class="fore">
                                        <dt>
                                            <a href="">电子书7</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">免费</a>
                                            </em>
                                            <em>
                                                <a href="">小说</a>
                                            </em>
                                            <em>
                                                <a href="">励志与成功</a>
                                            </em>
                                            <em>
                                                <a href="">婚恋/两性</a>
                                            </em>
                                            <em>
                                                <a href="">文学</a>
                                            </em>
                                            <em>
                                                <a href="">经管</a>
                                            </em>
                                            <em>
                                                <a href="">畅读VIP</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>
                                            <a href="">数字音乐</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">通俗流行</a>
                                            </em>
                                            <em>
                                                <a href="">古典音乐</a>
                                            </em>
                                            <em>
                                                <a href="">摇滚说唱</a>
                                            </em>
                                            <em>
                                                <a href="">爵士蓝调</a>
                                            </em>
                                            <em>
                                                <a href="">乡村民谣</a>
                                            </em>
                                            <em>
                                                <a href="">有声读物</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>
                                            <a href="">音像</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">音乐</a>
                                            </em>
                                            <em>
                                                <a href="">影视</a>
                                            </em>
                                            <em>
                                                <a href="">教育音像</a>
                                            </em>
                                            <em>
                                                <a href="">游戏</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>文艺</dt>
                                        <dd>
                                            <em>
                                                <a href="">小说</a>
                                            </em>
                                            <em>
                                                <a href="">文学</a>
                                            </em>
                                            <em>
                                                <a href="">青春文学</a>
                                            </em>
                                            <em>
                                                <a href="">传记</a>
                                            </em>
                                            <em>
                                                <a href="">艺术</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <h3>
                                <a href="">汽车用品</a>
                            </h3>
                            <div class="item-list clearfix">
                                <div class="subitem">
                                    <dl class="fore">
                                        <dt>
                                            <a href="">电子书8</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">免费</a>
                                            </em>
                                            <em>
                                                <a href="">小说</a>
                                            </em>
                                            <em>
                                                <a href="">励志与成功</a>
                                            </em>
                                            <em>
                                                <a href="">婚恋/两性</a>
                                            </em>
                                            <em>
                                                <a href="">文学</a>
                                            </em>
                                            <em>
                                                <a href="">经管</a>
                                            </em>
                                            <em>
                                                <a href="">畅读VIP</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>
                                            <a href="">数字音乐</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">通俗流行</a>
                                            </em>
                                            <em>
                                                <a href="">古典音乐</a>
                                            </em>
                                            <em>
                                                <a href="">摇滚说唱</a>
                                            </em>
                                            <em>
                                                <a href="">爵士蓝调</a>
                                            </em>
                                            <em>
                                                <a href="">乡村民谣</a>
                                            </em>
                                            <em>
                                                <a href="">有声读物</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>
                                            <a href="">音像</a>
                                        </dt>
                                        <dd>
                                            <em>
                                                <a href="">音乐</a>
                                            </em>
                                            <em>
                                                <a href="">影视</a>
                                            </em>
                                            <em>
                                                <a href="">教育音像</a>
                                            </em>
                                            <em>
                                                <a href="">游戏</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>文艺</dt>
                                        <dd>
                                            <em>
                                                <a href="">小说</a>
                                            </em>
                                            <em>
                                                <a href="">文学</a>
                                            </em>
                                            <em>
                                                <a href="">青春文学</a>
                                            </em>
                                            <em>
                                                <a href="">传记</a>
                                            </em>
                                            <em>
                                                <a href="">艺术</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>人文社科</dt>
                                        <dd>
                                            <em>
                                                <a href="">历史</a>
                                            </em>
                                            <em>
                                                <a href="">心理学</a>
                                            </em>
                                            <em>
                                                <a href="">政治/军事</a>
                                            </em>
                                            <em>
                                                <a href="">国学/古籍</a>
                                            </em>
                                            <em>
                                                <a href="">哲学/宗教</a>
                                            </em>
                                            <em>
                                                <a href="">社会科学</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>经管励志</dt>
                                        <dd>
                                            <em>
                                                <a href="">经济</a>
                                            </em>
                                            <em>
                                                <a href="">金融与投资</a>
                                            </em>
                                            <em>
                                                <a href="">管理</a>
                                            </em>
                                            <em>
                                                <a href="">励志与成功</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>生活</dt>
                                        <dd>
                                            <em>
                                                <a href="">家庭与育儿</a>
                                            </em>
                                            <em>
                                                <a href="">旅游/地图</a>
                                            </em>
                                            <em>
                                                <a href="">烹饪/美食</a>
                                            </em>
                                            <em>
                                                <a href="">时尚/美妆</a>
                                            </em>
                                            <em>
                                                <a href="">家居</a>
                                            </em>
                                            <em>
                                                <a href="">婚恋与两性</a>
                                            </em>
                                            <em>
                                                <a href="">娱乐/休闲</a>
                                            </em>
                                            <em>
                                                <a href="">健身与保健</a>
                                            </em>
                                            <em>
                                                <a href="">动漫/幽默</a>
                                            </em>
                                            <em>
                                                <a href="">体育/运动</a>
                                            </em>
                                        </dd>
                                    </dl>
                                    <dl class="fore">
                                        <dt>科技</dt>
                                        <dd>
                                            <em>
                                                <a href="">科普</a>
                                            </em>
                                            <em>
                                                <a href="">IT</a>
                                            </em>
                                            <em>
                                                <a href="">建筑</a>
                                            </em>
                                            <em>
                                                <a href="">医学</a>
                                            </em>
                                            <em>
                                                <a href="">工业技术</a>
                                            </em>
                                            <em>
                                                <a href="">电子/通信</a>
                                            </em>
                                            <em>
                                                <a href="">农林</a>
                                            </em>
                                            <em>
                                                <a href="">科学与自然</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <h3>
                                <a href="">彩票、旅行</a>
                            </h3>
                        </div>
                        <div class="item">
                            <h3>
                                <a href="">理财、众筹</a>
                            </h3>
                        </div>
                        <div class="item">
                            <h3>
                                <a href="">母婴、玩具</a>
                            </h3>
                        </div>
                        <div class="item">
                            <h3>
                                <a href="">箱包</a>
                            </h3>
                        </div>
                        <div class="item">
                            <h3>
                                <a href="">运动户外</a>
                            </h3>
                        </div>
                        <div class="item">
                            <h3>
                                <a href="">箱包</a>
                            </h3>
                        </div> -->
                    </div>
                </div>
            </div>
            <!-- 这里也可以用事件的委派，但我没用，视频地址：   https://www.bilibili.com/video/BV1Vf4y1T7bw?p=21&vd_source=21355942ad2bbd45b5f318acf56b2bdd      -->
            <nav class="nav adasdaaafsafas">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';

//lodash，  这种引入方法是吧lodash的全部功能函数。
/* import _ from 'lodash';
console.log('@@@@-lodash', _); */
// lodash的每一种方法都是一个单独的js文件，可以按需引入：(module.export默认暴露不需要大括号。)
import throttle from 'lodash/throttle'
import { query } from 'express';



export default {
    name: 'Rou2TypeNav',

    data(){
        return {
            currentListIndex: null,
            // the data not be used:
            changeC2Show: 'none',
        }
    },

    methods:{

        // 鼠标进入触发的事件, lodash的节流函数（别用箭头函数，否则可能会出现上下文问题）
        changeIndex: throttle(function(indexc1){
            console.log('c1.index',indexc1);
            this.currentListIndex = indexc1;
        }, 50),
        // 鼠标离开触发的事件
        resetCurrentIndex(){
            this.currentListIndex = null;
        },

        //跳转
        goRouteSearch(event){
            // dataset.categoryname

            //element写错了，但问题不大
            let currentElemrnt = event.target;
            console.log('TyprNav@@currentElemrnt: ', currentElemrnt);
            //横线要去掉，也不能使用小驼峰命名:
            let {datacategoryname, c1datacategoryid, c2datacategoryid, c3datacategoryid} = currentElemrnt.dataset;
            let aaaaaaaaa = currentElemrnt.dataset;console.log('TypeNav--$##$#$testaaaa:', aaaaaaaaa);
            console.log('TyprNav@@currentElemrntDataset', datacategoryname,c1datacategoryid);

            if (datacategoryname) {
                let ToSearchLocationName = {name: 'Route1Search'};
                let ToSearchQuery = {querydatacategoryName: datacategoryname};
                if (c1datacategoryid) {
                    query.queryc1datacategoryId = c1datacategoryid;
                    // this.$router.push({})
                } else if (c2datacategoryid) {
                    query.queryc2datacategoryId = c2datacategoryid;
                    // this.$router.push({})
                } else {
                    // this.$router.push({})
                    query.queryc3datacategoryId = c3datacategoryid;
                }
                ToSearchLocationName.query = ToSearchQuery;
                this.$router.push(ToSearchLocationName);
            }
            

        },


        //the three function not be used
        changeC2ShowFun(){
            this.currentListIndex = null;
            this.changeC2Show = 'none';
        },
        C2MouseEnter(){
            this.changeC2Show = 'block'
        },
        C2MouseLeave(){
            this.changeC2Show = 'none'
        },
    },

    mounted(){
        this.$store.dispatch('categoryList');
    },

    computed:{
        //把 mapState 对象里的每一对 K:V 一个个展开
        ...mapState({
            //key       :   value
            //右侧是一个函数，使用则个计算属性的时候右侧的函数会自动执行一次。
            //state参数是大仓库中的数据。
            categoryList:(state)=>{
                // return state.home.categoryList;
                console.log('TyprNav$$$$$$$state.categoryList', state.categoryList);//undefined
                console.log('TyprNav$$$$？？？？？state', state);//发现想要的东西在state.HomeStore.categoryList，HomeStore是自己引入的小仓库名字！
/*                 console.log('$$$$$state2', state.home.categoryList);//typrError:   */  
                   return state.HomeStore.categoryList;
            },
            // categoryList:(state)=>state.home.categoryList;//简写
            
        })
    },
}

</script>


<style scoped lang="less">

    // css添加背景，这样可以。但是练习js为主，不用这种方法。
/*     .c1CategoryListBgc{
        &:hover{
            background-color: rgb(223, 172, 172);
        }
    } */

    .whithListBgc{
        // &:hover{
            background-color: rgb(224, 72, 72);
        // }
    }

    //错
     .adasdaaafsafas{
        a{
            &:hover{
/*                 display: inline-block;
                width: 50px;
                height: 30px; */
                background-color: rgb(216, 71, 71);
            }
        }
    }

    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    //自己改成padding，便于 :hover 添加背景色
                    // margin: 0 22px;
                    padding: 12px 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                    // 自己加的
                    &:link:hover{
                        color: #333 !important;
                        text-decoration: none;
                    }
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                                &:link:hover {
                                    color: #333 !important;
                                }
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;
                           

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }
/* // /不用css了，用js做一下。(用CSS也行，但这里是为了练习js)，但好像有点bug，还是用CSS吧，
                        &:hover {
                            //鼠标移动上去就显示二三级商品分类。
                            .item-list {
                                display: block;
                            } 
                        } */
                    }
                }
            }
        }
    }

</style>