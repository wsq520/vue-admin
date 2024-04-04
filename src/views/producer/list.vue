<template>
  <div class="main-content"
    :style='{ "minHeight": "100vh", "padding": "20px 20px 20px", "overflow": "hidden", "color": "#93a2a9", "background": "#e9ecf3", "fontSize": "14px", "position": "relative" }'>
    <!-- 列表页 -->
    <template>
      <el-form class="center-form-pv"
        :style='{ "border": "0px solid #ddd", "padding": "20px 20px 0", "margin": "0px 0 0", "overflow": "hidden", "borderRadius": "0px", "flexWrap": "wrap", "background": "#fff", "display": "flex", "width": "auto", "fontSize": "inherit", "justifyContent": "space-between" }'
        :inline="true" :model="searchForm">
        <el-row
          :style='{ "padding": "0px", "margin": "0 0 10px", "borderRadius": "0px", "alignItems": "center", "textAlign": "center", "flexWrap": "wrap", "background": "#fff", "flexDirection": "row", "display": "flex", "width": "auto", "fontSize": "inherit", "order": "2" }'>
          <div :style='{ "margin": "0 10px 0 0", "fontSize": "inherit", "alignItems": "center", "display": "flex" }'>
            <label
              :style='{ "margin": "0 10px 0 0", "color": "inherit", "display": "inline-block", "lineHeight": "40px", "fontSize": "inherit", "fontWeight": "500", "height": "40px" }'
              class="item-label">农户账号</label>
            <el-input v-model="searchForm.nonghuzhanghao" placeholder="农户账号" @keydown.enter.native="search()"
              clearable></el-input>
          </div>
          <div :style='{ "margin": "0 10px 0 0", "fontSize": "inherit", "alignItems": "center", "display": "flex" }'>
            <label
              :style='{ "margin": "0 10px 0 0", "color": "inherit", "display": "inline-block", "lineHeight": "40px", "fontSize": "inherit", "fontWeight": "500", "height": "40px" }'
              class="item-label">农户姓名</label>
            <el-input v-model="searchForm.nonghuxingming" placeholder="农户姓名" @keydown.enter.native="search()"
              clearable></el-input>
          </div>
          <el-button class="search" type="success" @click="search()">
            <span class="icon iconfont icon-chakan14"
              :style='{ "margin": "0 0px", "fontSize": "inherit", "color": "inherit", "display": "block", "height": "40px" }'></span>
          </el-button>
        </el-row>

        <el-row class="actions"
          :style='{ "padding": "0px", "margin": "0 0 10px", "color": "#fff", "flexWrap": "wrap", "textAlign": "left", "flexDirection": "row", "background": "none", "display": "flex", "width": "auto", "fontSize": "12px" }'>
          <el-button class="add" type="success" @click="addOrUpdateHandler()">
            <span class="icon iconfont icon-tianjia1"
              :style='{ "margin": "0 0px", "fontSize": "inherit", "color": "inherit", "display": "inline-block" }'></span>
            新增
          </el-button>
          <el-button class="del" :disabled="dataListSelections.length ? false : true" type="danger"
            @click="deleteHandler()">
            <span class="icon iconfont icon-shanchu15"
              :style='{ "margin": "0 0px", "fontSize": "inherit", "color": "inherit", "display": "inline-block" }'></span>
            删除
          </el-button>
          <el-button class="btn18" type="success">
            <span class="icon iconfont icon-a-fenxiang2"
              :style='{ "margin": "0 0px", "fontSize": "inherit", "color": "inherit", "display": "inline-block" }'></span>
            农户数量
          </el-button>
        </el-row>
      </el-form>
      <div
        :style='{ "border": "0px solid #bababa", "padding": "0", "margin": "0 0 0 0", "borderRadius": "2px", "background": "rgba(255,255,255,1)", "width": "calc(100% - 0px)", "float": "right" }'>
        <el-table class="tables" :stripe='true'
          :style='{ "padding": "0", "borderColor": "#eee", "color": "inherit", "borderRadius": "0px", "borderWidth": "0px 0px 0 0px", "background": "none", "width": "100%", "fontSize": "inherit", "borderStyle": "solid" }'
          :border='true' :data="dataList" @selection-change="selectionChangeHandler">
          <el-table-column :resizable='true' type="selection" align="center" width="50"></el-table-column>
          <el-table-column :resizable='true' :sortable='true' label="序号" type="index" width="50" />
          <el-table-column :resizable='true' :sortable='true' prop="accountNumber" label="账号">
          </el-table-column>
          <el-table-column :resizable='true' :sortable='true' prop="password" label="密码">
          </el-table-column>
          <el-table-column :resizable='true' :sortable='true' prop="name" label="联系人姓名">
          </el-table-column>
          <el-table-column :resizable='true' :sortable='true' prop="phone" label="手机号">
          </el-table-column>
          <el-table-column :resizable='true' :sortable='true' prop="address" label="地址">
          </el-table-column>
          <el-table-column :resizable='true' :sortable='true' prop="type" label="生产方类型">
          </el-table-column>
          <el-table-column :resizable='true' :sortable='true' prop="addtime" label="创建时间">
          </el-table-column>
          </el-table-column>
          <el-table-column width="300" label="操作">
            <template slot-scope="scope">
              <el-button class="edit" type="success" @click="addOrUpdateHandler(scope.row.id)">
                <span class="icon iconfont icon-xiugai10"
                  :style='{ "margin": "0 0px", "fontSize": "inherit", "color": "inherit", "display": "inline-block" }'></span>
                修改
              </el-button>
              <el-button class="del" type="primary" @click="deleteHandler(scope.row.id)">
                <span class="icon iconfont icon-shanchu6"
                  :style='{ "margin": "0 0px", "fontSize": "inherit", "color": "#dd514c", "display": "inline-block" }'></span>
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
        background :page-sizes="[10, 50, 100, 200]" :page-size="pageSize" :layout="layouts.join()" :total="totalPage"
        prev-text="上一页 " next-text="下一页 " :hide-on-single-page="false"
        :style='{ "padding": "20px", "margin": "0 0 0 0", "whiteSpace": "nowrap", "color": "#333", "textAlign": "right", "background": "#fff", "width": "100%", "clear": "both", "fontSize": "inherit", "fontWeight": "500" }'></el-pagination>
    </template>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      searchForm: {
        key: ""
      },
      form: {},
      dataList: [{
        "id": 1774003098513620994,
        "accountNumber": "123456",
        "password": "1234561",
        "name": "www",
        "phone": "123123",
        "address": "广州",
        "type": "个体农户",
        "addtime": "2024-03-30T09:17:52.000+0000"
      }],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      showFlag: true,
      sfshVisiable: false,
      shForm: {},
      addOrUpdateFlag: false,
      layouts: ["total", "prev", "pager", "next", "sizes", "jumper"],
    };
  },
  created() {

  },
  mounted() {
  },
  filters: {
    htmlfilter: function (val) {
      return val.replace(/<[^>]*>/g).replace(/undefined/g, '');
    }
  },
  computed: {
  },
  components: {

  },
  methods: {
    search() { },
    sizeChangeHandle() {

    },
    currentChangeHandle() { },
    addOrUpdateHandler() { },
    deleteHandler() { },
    selectionChangeHandler() { }
  }

};
</script>
<!-- <style lang="scss" scoped>
.center-form-pv {
	.el-date-editor.el-input {
		width: auto;
	}
}

.el-input {
	width: auto;
}

// form
.center-form-pv .el-input /deep/ .el-input__inner {
	border: 1px solid #eee;
	border-radius: 2px;
	padding: 0 12px;
	color: inherit;
	background: #fff;
	width: 150px;
	font-size: inherit;
	height: 34px;
}

.center-form-pv .el-select /deep/ .el-input__inner {
	border: 1px solid #eee;
	border-radius: 2px;
	padding: 0 10px;
	color: inherit;
	background: #fff;
	width: 150px;
	font-size: inherit;
	height: 34px;
}

.center-form-pv .el-date-editor /deep/ .el-input__inner {
	border: 1px solid #eee;
	border-radius: 2px;
	padding: 0 10px 0 30px;
	color: inherit;
	background: #fff;
	width: 150px;
	font-size: inherit;
	height: 34px;
}

.center-form-pv .search {
	cursor: pointer;
	padding: 0 10px;
	margin: 0;
	color: #fff;
	font-size: 16px;
	border-color: #1576c2;
	line-height: 34px;
	transition: all 0.3s;
	border-radius: 2px;
	background: #5eb95e;
	width: auto;
	border-width: 0 0 0px;
	border-style: solid;
	min-width: 50px;
	height: 34px;
}

.center-form-pv .search:hover {}

.center-form-pv .actions .add {
	border: 0px solid #4db14d;
	cursor: pointer;
	border-radius: 0px;
	padding: 0 10px;
	margin: 0 0 10px 0;
	color: #fff;
	background: #4db14d;
	width: auto;
	font-size: inherit;
	height: 30px;
}

.center-form-pv .actions .add:hover {}

.center-form-pv .actions .del {
	border: 0px solid rgba(255, 91, 91, 0.1);
	cursor: pointer;
	border-radius: 0px;
	padding: 0 10px;
	margin: 0 0 10px 0;
	color: #fff;
	background: #dd514c;
	width: auto;
	font-size: inherit;
	height: 30px;
}

.center-form-pv .actions .del:hover {}

.center-form-pv .actions .statis {
	border: 0px solid rgba(16, 196, 105, 0.1);
	cursor: pointer;
	border-radius: 0px;
	padding: 0 10px;
	margin: 0 0 10px 0;
	color: #fff;
	background: #3bb4f2;
	width: auto;
	font-size: inherit;
	height: 30px;
}

.center-form-pv .actions .statis:hover {}

.center-form-pv .actions .btn18 {
	border: 1px solid rgba(114, 123, 132, 0.1);
	cursor: pointer;
	border-radius: 0px;
	padding: 0 10px;
	margin: 0 0 10px 0;
	color: #727b84;
	background: rgba(114, 123, 132, 0.15);
	width: auto;
	font-size: inherit;
	height: 30px;
}

.center-form-pv .actions .btn18:hover {}

// table
.el-table /deep/ .el-table__header-wrapper thead {
	color: inherit;
	background: #f3f4f6;
	width: 100%;
}

.el-table /deep/ .el-table__header-wrapper thead tr {
	background: none;
}

.el-table /deep/ .el-table__header-wrapper thead tr th {
	padding: 12px 0;
	color: #93a2a9;
	background: none;
	border-color: #ddd;
	border-width: 0 0px 1px 0;
	border-style: solid;
	text-align: left;
}

.el-table /deep/ .el-table__header-wrapper thead tr th .cell {
	padding: 0 10px;
	word-wrap: normal;
	color: #93a2a9;
	word-break: break-all;
	white-space: normal;
	font-weight: 600;
	display: inline-block;
	vertical-align: middle;
	width: 100%;
	line-height: 24px;
	position: relative;
	text-overflow: ellipsis;
}


.el-table /deep/ .el-table__body-wrapper tbody {
	padding: 0;
	width: 100%;
}

.el-table /deep/ .el-table__body-wrapper tbody tr {
	background: none;
}

.el-table /deep/ .el-table__body-wrapper tbody tr td {
	padding: 2px 0;
	color: inherit;
	background: none;
	font-size: inherit;
	border-color: #ddd;
	border-width: 0 0 0 0;
	border-style: solid;
	text-align: left;
}

.el-table /deep/ .el-table__body-wrapper tbody tr.el-table__row--striped td {
	background: #f3f4f6;
}

.el-table /deep/ .el-table__body-wrapper tbody tr:hover td {
	padding: 2px 0;
	color: inherit;
	background: #f3f4f6;
	font-weight: 500;
	border-color: #ddd;
	border-width: 0 0 0 0;
	border-style: solid;
	text-align: left;
}

.el-table /deep/ .el-table__body-wrapper tbody tr td {
	padding: 2px 0;
	color: inherit;
	background: none;
	font-size: inherit;
	border-color: #ddd;
	border-width: 0 0 0 0;
	border-style: solid;
	text-align: left;
}

.el-table /deep/ .el-table__body-wrapper tbody tr td .cell {
	padding: 0 10px;
	overflow: hidden;
	color: inherit;
	word-break: break-all;
	white-space: normal;
	line-height: 24px;
	text-overflow: ellipsis;
}

.el-table /deep/ .el-table__body-wrapper tbody tr td .view {
	border: 1px solid #d9d9d9;
	cursor: pointer;
	border-radius: 0px;
	padding: 0 10px;
	margin: 0 0px 5px 0;
	color: #3bb4f2;
	background: #fff;
	width: auto;
	font-size: 13px;
	height: 26px;
}

.el-table /deep/ .el-table__body-wrapper tbody tr td .view:hover {}

.el-table /deep/ .el-table__body-wrapper tbody tr td .add {}

.el-table /deep/ .el-table__body-wrapper tbody tr td .add:hover {}

.el-table /deep/ .el-table__body-wrapper tbody tr td .edit {
	border: 1px solid #d9d9d9;
	cursor: pointer;
	border-radius: 0px;
	padding: 0 10px;
	margin: 0 0px 5px 0;
	color: #444;
	background: #fff;
	width: auto;
	font-size: 13px;
	min-width: 40px;
	height: 26px;
}

.el-table /deep/ .el-table__body-wrapper tbody tr td .edit:hover {}

.el-table /deep/ .el-table__body-wrapper tbody tr td .del {
	border: 1px solid #d9d9d9;
	cursor: pointer;
	border-radius: 0px;
	padding: 0 10px;
	margin: 0 0px 5px 0;
	color: #dd514c;
	background: #fff;
	width: auto;
	font-size: 13px;
	height: 26px;
}

.el-table /deep/ .el-table__body-wrapper tbody tr td .del:hover {}

.el-table /deep/ .el-table__body-wrapper tbody tr td .btn8 {
	border: 1px solid #d9d9d9;
	cursor: pointer;
	border-radius: 0px;
	padding: 0 10px;
	margin: 0 0px 5px 0;
	color: #727b84;
	background: #fff;
	width: auto;
	font-size: 13px;
	height: 26px;
}

.el-table /deep/ .el-table__body-wrapper tbody tr td .btn8:hover {}

// pagination
.main-content .el-pagination /deep/ .el-pagination__total {
	margin: 0 10px 0 0;
	color: inherit;
	font-weight: 400;
	display: inline-block;
	vertical-align: top;
	font-size: inherit;
	line-height: 28px;
	height: 28px;
}

.main-content .el-pagination /deep/ .btn-prev {
	border: none;
	border-radius: 2px;
	padding: 0 5px;
	margin: 0 5px;
	color: inherit;
	background: none;
	display: inline-block;
	vertical-align: top;
	font-size: inherit;
	line-height: 28px;
	min-width: 35px;
	height: 28px;
}

.main-content .el-pagination /deep/ .btn-next {
	border: none;
	border-radius: 2px;
	padding: 0 5px;
	margin: 0 5px;
	color: inherit;
	background: none;
	display: inline-block;
	vertical-align: top;
	font-size: inherit;
	line-height: 28px;
	min-width: 35px;
	height: 28px;
}

.main-content .el-pagination /deep/ .btn-prev:disabled {
	border: none;
	cursor: not-allowed;
	border-radius: 2px;
	padding: 0 5px;
	margin: 0 5px;
	color: #666;
	background: none;
	display: inline-block;
	vertical-align: top;
	font-size: inherit;
	line-height: 28px;
	height: 28px;
}

.main-content .el-pagination /deep/ .btn-next:disabled {
	border: none;
	cursor: not-allowed;
	border-radius: 2px;
	padding: 0 5px;
	margin: 0 5px;
	color: #666;
	background: none;
	display: inline-block;
	vertical-align: top;
	font-size: inherit;
	line-height: 28px;
	height: 28px;
}

.main-content .el-pagination /deep/ .el-pager {
	padding: 0;
	margin: 0;
	display: inline-block;
	vertical-align: top;
	font-size: inherit;
}

.main-content .el-pagination /deep/ .el-pager .number {
	cursor: pointer;
	border: 1px solid #ddd;
	padding: 0 4px;
	margin: 0 5px;
	color: #23abf0;
	background: none;
	display: inline-block;
	vertical-align: top;
	font-size: inherit;
	line-height: 24px;
	text-align: center;
	height: 24px;
}

.main-content .el-pagination /deep/ .el-pager .number:hover {
	cursor: pointer;
	padding: 0 4px;
	margin: 0 5px;
	color: #fff;
	background: #23abf0;
	display: inline-block;
	vertical-align: top;
	font-size: inherit;
	line-height: 24px;
	text-align: center;
	height: 24px;
}

.main-content .el-pagination /deep/ .el-pager .number.active {
	cursor: default;
	padding: 0 4px;
	margin: 0 5px;
	color: #fff;
	background: #23abf0;
	display: inline-block;
	vertical-align: top;
	font-size: inherit;
	line-height: 24px;
	text-align: center;
	height: 24px;
}

.main-content .el-pagination /deep/ .el-pagination__sizes {
	color: inherit;
	display: inline-block;
	vertical-align: top;
	font-size: inherit;
	line-height: 28px;
	height: 28px;
}

.main-content .el-pagination /deep/ .el-pagination__sizes .el-input {
	margin: 0 5px;
	color: inherit;
	width: 100px;
	font-size: inherit;
	position: relative;
}

.main-content .el-pagination /deep/ .el-pagination__sizes .el-input .el-input__inner {
	border: 0px solid #ddd;
	cursor: pointer;
	padding: 0 25px 0 8px;
	color: inherit;
	display: inline-block;
	font-size: inherit;
	line-height: 28px;
	border-radius: 3px;
	outline: 0;
	background: none;
	width: 100%;
	text-align: center;
	height: 28px;
}

.main-content .el-pagination /deep/ .el-pagination__sizes .el-input span.el-input__suffix {
	top: 0;
	position: absolute;
	right: 0;
	height: 100%;
}

.main-content .el-pagination /deep/ .el-pagination__sizes .el-input .el-input__suffix .el-select__caret {
	cursor: pointer;
	color: #C0C4CC;
	width: 25px;
	font-size: 14px;
	line-height: 28px;
	text-align: center;
}

.main-content .el-pagination /deep/ .el-pagination__jump {
	margin: 0 0 0 24px;
	color: inherit;
	display: inline-block;
	vertical-align: top;
	font-size: inherit;
	line-height: 28px;
	height: 28px;
}

.main-content .el-pagination /deep/ .el-pagination__jump .el-input {
	border-radius: 3px;
	padding: 0 2px;
	margin: 0 2px;
	color: inherit;
	display: inline-block;
	width: 50px;
	font-size: inherit;
	line-height: 18px;
	position: relative;
	text-align: center;
	height: 28px;
}

.main-content .el-pagination /deep/ .el-pagination__jump .el-input .el-input__inner {
	border: 1px solid #eee;
	cursor: pointer;
	padding: 0 0px;
	color: inherit;
	display: inline-block;
	font-size: inherit;
	line-height: 24px;
	border-radius: 3px;
	outline: 0;
	background: none;
	width: auto;
	text-align: center;
	height: 24px;
}

// list one
.one .list1-view {
	border: 0px solid #0260ad30;
	cursor: pointer;
	border-radius: 0px;
	padding: 0 6px 0 4px;
	margin: 0 0 5px 0;
	color: #fff;
	background: #5eb95e;
	width: auto;
	font-size: 12px;
	height: 30px;
}

.one .list1-view:hover {
	transform: rotate(3deg) translate3d(0px, 3px, 0px);
}

.one .list1-edit {
	border: 0px solid #ddd;
	cursor: pointer;
	border-radius: 0px;
	padding: 0 6px 0 4px;
	margin: 0 0 5px 0;
	color: #fff;
	background: #3bb4f2;
	width: auto;
	font-size: 12px;
	height: 30px;
}

.one .list1-edit:hover {
	transform: rotate(3deg) translate3d(0px, 3px, 0px);
}

.one .list1-del {
	border: 0px solid #ddd;
	cursor: pointer;
	border-radius: 0px;
	padding: 0 6px 0 4px;
	margin: 0 0 5px 0;
	color: #fff;
	background: #dd514c;
	width: auto;
	font-size: 12px;
	height: 30px;
}

.one .list1-del:hover {
	transform: rotate(3deg) translate3d(0px, 3px, 0px);
}

.one .list1-btn8 {
	border: 1px solid #ddd;
	cursor: pointer;
	border-radius: 0px;
	padding: 0 6px 0 4px;
	margin: 0 0 5px 0;
	color: #333;
	background: rgba(114, 123, 132, 0.15);
	width: auto;
	font-size: 12px;
	height: 30px;
}

.one .list1-btn8:hover {
	transform: rotate(3deg) translate3d(0px, 3px, 0px);
}

.main-content .el-table .el-switch {
	display: inline-flex;
	vertical-align: middle;
	line-height: 30px;
	position: relative;
	align-items: center;
	height: 30px;
}

.main-content .el-table .el-switch /deep/ .el-switch__label--left {
	cursor: pointer;
	margin: 0 10px 0 0;
	color: #333;
	font-weight: 500;
	display: inline-block;
	vertical-align: middle;
	font-size: 16px;
	transition: .2s;
	height: 30px;
}

.main-content .el-table .el-switch /deep/ .el-switch__label--right {
	cursor: pointer;
	margin: 0 0 0 10px;
	color: #333;
	font-weight: 500;
	display: inline-block;
	vertical-align: middle;
	font-size: 16px;
	transition: .2s;
	height: 30px;
}

.main-content .el-table .el-switch /deep/ .el-switch__core {
	border: 0px solid #188ae2;
	cursor: pointer;
	border-radius: 20px;
	margin: 0;
	outline: 0;
	background: #b0d5f6;
	display: inline-block;
	width: 40px;
	box-sizing: border-box;
	transition: border-color .3s, background-color .3s;
	height: 18px;
}

.main-content .el-table .el-switch /deep/ .el-switch__core::after {
	border-radius: 100%;
	top: 1px;
	left: 1px;
	background: #FFF;
	width: 16px;
	position: absolute;
	transition: all .3s;
	height: 16px;
}

.main-content .el-table .el-switch.is-checked /deep/ .el-switch__core::after {
	margin: 0 0 0 -17px;
	left: 100%;
}

.main-content .el-table .el-rate /deep/ .el-rate__item {
	cursor: pointer;
	display: inline-block;
	vertical-align: middle;
	font-size: 0;
	position: relative;
}

.main-content .el-table .el-rate /deep/ .el-rate__item .el-rate__icon {
	margin: 0 3px;
	color: #212529;
	display: inline-block;
	font-size: 18px;
	position: relative;
	transition: .3s;
}
</style> -->
