<template>
  <div>
    <!--筛选栏-->
    <el-form ref="form" :model="form" inline>
      <el-form-item>
        <el-input v-model="form.name" placeholder="卡名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.attribute" placeholder="属性">
          <el-option
                  v-for="item in options.attribute_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.race" placeholder="种族">
          <el-option
                  v-for="item in options.race_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.level" placeholder="等级"></el-input>
      </el-form-item>
      <el-form-item>
        <el-cascader
                v-model="form.pack"
                :options="options.pack_list">
        </el-cascader>
      </el-form-item>
      <el-button @click="search" type="primary">查询</el-button>
    </el-form>

    <el-table :data="tableData" border :height="tableHeight">

      <el-table-column prop="id" label="ID" width="120"></el-table-column>

      <el-table-column prop="name" label="名称" width="200"></el-table-column>

      <el-table-column label="category" width="86">
        <template slot-scope="scope">
          <span>{{ valueTransfer("category", scope.row.category) }}</span>
        </template>
      </el-table-column>>

      <el-table-column label="type" width="80">
        <template slot-scope="scope">
          <span>{{ valueTransfer("type", scope.row.type) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="属性" width="80">
        <template slot-scope="scope">
          <span>{{ valueTransfer("attribute", scope.row.attribute) }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="race" label="种族" width="80">
        <template slot-scope="scope">
          <span>{{ valueTransfer("race", scope.row.race) }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="level" label="等级/阶级" width="90">
        <template slot-scope="scope">
          <span>{{ valueTransfer("level", scope.row.level) }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="atk" label="攻击" width="80">
        <template slot-scope="scope">
          <span>{{ valueTransfer("atk", scope.row.atk) }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="def" label="防御" width="80">
        <template slot-scope="scope">
          <span>{{ valueTransfer("def", scope.row.def) }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="desc" label="描述/效果"></el-table-column>

      <el-table-column
              fixed="right"
              label="卡图"
              width="100">
        <template slot-scope="scope">
          <img :src="getPic(scope.row.id)" width="88" height="127">
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="index"
            :page-sizes="[10, 20, 30, 40, 50, 100]"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableCopyTableList.length">
    </el-pagination>
  </div>
</template>

<script>
  import pack_list from '../data/pack_list';
  import {localSearch, valueTransfer} from '../js/localSearch';

  const attribute_list = [
    { label: "属性", value: "" },
    { label: "魔陷", value: 0 },
    { label: "地", value: Math.pow(2,0) },
    { label: "水", value: Math.pow(2,1) },
    { label: "炎", value: Math.pow(2,2) },
    { label: "风", value: Math.pow(2,3) },
    { label: "光", value: Math.pow(2,4) },
    { label: "暗", value: Math.pow(2,5) },
    { label: "神", value: Math.pow(2,6) },
  ];
  const race_list = [
    { label: "种族", value: "" },
    { label: "战士", value: Math.pow(2,0) },
    { label: "魔法师", value: Math.pow(2,1) },
    { label: "天使", value: Math.pow(2,2) },
    { label: "恶魔", value: Math.pow(2,3) },
    { label: "不死", value: Math.pow(2,4) },
    { label: "机械", value: Math.pow(2,5) },
    { label: "水", value: Math.pow(2,6) },
    { label: "炎", value: Math.pow(2,7) },
    { label: "岩石", value: Math.pow(2,8) },
    { label: "鸟兽", value: Math.pow(2,9) },
    { label: "植物", value: Math.pow(2,10) },
    { label: "昆虫", value: Math.pow(2,11) },
    { label: "雷", value: Math.pow(2,12) },
    { label: "龙", value: Math.pow(2,13) },
    { label: "兽", value: Math.pow(2,14) },
    { label: "兽战士", value: Math.pow(2,15) },
    { label: "恐龙", value: Math.pow(2,16) },
    { label: "鱼", value: Math.pow(2,17) },
    { label: "海龙", value: Math.pow(2,18) },
    { label: "爬虫", value: Math.pow(2,19) },
    { label: "念动力", value: Math.pow(2,20) },
    { label: "幻神兽", value: Math.pow(2,21) },
    { label: "创造神", value: Math.pow(2,22) },
    { label: "幻龙", value: Math.pow(2,23) },
    { label: "电子界", value: Math.pow(2,24) },
  ];

  export default {
    name: "Home",
    data(){
      return{
        valueTransfer,
        options: {
          pack_list,
          attribute_list,
          race_list,
        },
        form: {
          name: "",
          id: "",
          pack: [""],
          attribute: "",
          type: "",
          race: "",
          level: ""
        },
        tableData: [],
        tableCopyTableList: [],
        index: 1,
        size: 10
      }
    },
    computed:{
      tableHeight(){
        return window.innerHeight - 300;
      }
    },
    methods: {
      search(){
        this.index = 1;
        this.tableData = localSearch(this.form);
        this.tableCopyTableList = JSON.parse(JSON.stringify(this.tableData));
        this.tableData = this.paging(this.size, this.index);
      },
      getPic(id){
        return require(`../../public/pics/${id}.jpg`);
      },
      // 页数改变事件
      handleSizeChange(size) {
        this.size = size;
        this.tableData = this.paging(size, this.index);
      },
      // 页码改变事件
      handleCurrentChange(current) {
        this.index = current;
        this.tableData = this.paging(this.size, current);
      },
      // 本地分页的方法
      paging(size, current) {
        const tableList = JSON.parse(JSON.stringify(this.tableCopyTableList));
        const tablePush = [];
        tableList.forEach((item, index) => {
          if (size * (current - 1) <= index && index <= size * current - 1) {
            tablePush.push(item);
          }
        });
        return tablePush;
      }
    },
    created() {
      this.search();
    }
  }
</script>

<style scoped>

</style>