<template>
  <div class="home">
    <!--筛选栏-->
    <el-form ref="form" :model="form" inline>
      <el-form-item>
        <el-input v-model="form.text" placeholder="关键字"></el-input>
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

    <el-table
            :data="tableData"
            border
            :height="tableHeight"
            :row-class-name="tableRowClassName"
            @row-click="onRowClick">

      <el-table-column prop="id" label="ID" width="120"></el-table-column>

      <el-table-column prop="name" label="名称" width="200"></el-table-column>

      <el-table-column prop="attribute" label="属性" width="80"></el-table-column>

      <el-table-column prop="race" label="种族" width="80"> </el-table-column>

      <el-table-column prop="level" label="等级/阶级" width="90"></el-table-column>

      <el-table-column prop="atk" label="攻击" width="80"> </el-table-column>

      <el-table-column prop="def" label="防御" width="80"> </el-table-column>

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


    <el-dialog title="详情" :visible.sync="dialogFormVisible" width="920px">
      <el-form :model="dialogFrom" size="small" style="width: 680px; display: inline-block" inline>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="dialogFrom.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="dialogFrom.id" readonly></el-input>
        </el-form-item>
        <el-form-item label="日文名" :label-width="formLabelWidth">
          <el-input v-model="dialogFrom.japName" readonly></el-input>
        </el-form-item>
        <el-form-item label="英文名" :label-width="formLabelWidth">
          <el-input v-model="dialogFrom.enName" readonly></el-input>
        </el-form-item>
        <el-form-item label="星级/阶级/LINK" :label-width="formLabelWidth">
          <el-input v-model="dialogFrom.level" readonly></el-input>
        </el-form-item>
        <el-form-item label="属性" :label-width="formLabelWidth">
          <el-input v-model="dialogFrom.attribute" readonly></el-input>
        </el-form-item>
        <el-form-item label="种族" :label-width="formLabelWidth">
          <el-input v-model="dialogFrom.race" readonly></el-input>
        </el-form-item>
        <el-form-item label="卡片种类" :label-width="formLabelWidth">
          <el-input v-model="dialogFrom.cardType" readonly></el-input>
        </el-form-item>
        <el-form-item label="效果种类" :label-width="formLabelWidth">
          <el-input v-model="dialogFrom.cardDType" readonly></el-input>
        </el-form-item>
        <el-form-item label="卡包" :label-width="formLabelWidth">
          <el-input v-model="dialogFrom.package" readonly></el-input>
        </el-form-item>
        <el-form-item label="攻" :label-width="formLabelWidth">
          <el-input v-model="dialogFrom.attribute" readonly></el-input>
        </el-form-item>
        <el-form-item label="守" :label-width="formLabelWidth">
          <el-input v-model="dialogFrom.attribute" readonly></el-input>
        </el-form-item>
        <el-form-item label="效果/描述" :label-width="formLabelWidth">
          <!--<el-input v-model="dialogFrom.desc" readonly type="textarea" autosize></el-input>-->
          <p style="margin: 0; color: #666; max-width: 520px;">{{dialogFrom.desc}}</p>
        </el-form-item>
      </el-form>
      <img :src="dialogFrom.id && getPic(dialogFrom.id)" width="176" height="254" style="float:right"/>
    </el-dialog>
  </div>
</template>

<script>
  import pack_list from '../../public/data/pack_list';
  import {localSearch} from '../js/localSearch';

  const attribute_list = [
    { label: "属性", value: "" },
    { label: "魔陷", value: 0 },
    { label: "地" },
    { label: "水"},
    { label: "炎" },
    { label: "风" },
    { label: "光" },
    { label: "暗" },
    { label: "神" },
  ];
  const race_list = [
    { label: "种族", value: "" },
    { label: "战士", },
    { label: "魔法师", },
    { label: "天使", },
    { label: "恶魔", },
    { label: "不死", },
    { label: "机械", },
    { label: "水", },
    { label: "炎", },
    { label: "岩石",},
    { label: "鸟兽"},
    { label: "植物" },
    { label: "昆虫"},
    { label: "雷" },
    { label: "龙"},
    { label: "兽"},
    { label: "兽战士"},
    { label: "恐龙" },
    { label: "鱼"},
    { label: "海龙" },
    { label: "爬虫"},
    { label: "念动力"},
    { label: "幻神兽" },
    { label: "创造神"},
    { label: "幻龙" },
    { label: "电子界" },
  ];

  export default {
    name: "Home",
    data(){
      return{
        options: {
          pack_list,
          attribute_list,
          race_list,
        },
        form: {
          name: "",
          id: "",
          pack: ["none", ""],
          attribute: "",
          type: "",
          race: "",
          level: "",
          text: "",
        },
        tableData: [],
        tableCopyTableList: [],
        index: 1,
        size: 10,

        dialogFormVisible: false,
        formLabelWidth: '120px',
        dialogFrom: {}
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
        console.log(this.tableData);
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
      },

      tableRowClassName({row}){
        return row.modeRare === "R"? "rare" :
          row.modeRare === "UR"? "ultra-rare" : ""
      },

      onRowClick(row){
        // console.log(row);
        this.dialogFormVisible = true;
        this.dialogFrom = row;
      }
    },
    created() {
      this.search();
    }
  }
</script>

<style>
  .home .rare{
    background-color: #fff59f;
  }
  .home .ultra-rare{
    background-color: #ff9b62;
  }
</style>