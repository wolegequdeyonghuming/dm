<template>
  <div>
    <!--筛选栏-->
    <el-form ref="form" :model="form">
      <el-form-item>
        <el-cascader
                @change="search"
                v-model="form.pack"
                :options="options.pack_list">
        </el-cascader>
      </el-form-item>
    </el-form>

      <p><span v-for="item in tableData" :key="item.id">{{item.name}};</span>
      </p>
    <el-form ref="rd_form" :model="rd_form" inline>
      <el-form-item
              label="平卡池">
        <el-input
                style="width: 400px;"
                type="textarea"
                placeholder="请输入内容"
                v-model="rd_form.pool">
        </el-input>
      </el-form-item>
      <el-form-item
              label="平卡数量">
        <el-input v-model="rd_form.normal_size"></el-input>
      </el-form-item>
      <br>
      <el-form-item
              label="稀有池">
        <el-input
                style="width: 400px;"
                type="textarea"
                placeholder="请输入内容"
                v-model="rd_form.rare_pool">
        </el-input>
      </el-form-item>

      <el-form-item
              label="稀有数量">
        <el-input v-model="rd_form.rare_size"></el-input>
      </el-form-item>

      <el-button @click="roll" type="primary">ROLL</el-button>
    </el-form>

    <div class="gridbox">
      <div class="grid rare"
           v-for="(item1,index1) in rare_result"
           :key="'n'+index1">
        <div class="grid-left">
          <img :src="getPic(item1.id)" width="88">
        </div>
        <div class="grid-right">
          <p>{{item1.name}}</p>
          <p>{{valueTransfer('attribute', item1.attribute)}} - {{valueTransfer('race', item1.race)}}</p>
          <p>ATK:{{valueTransfer('atk', item1.atk)}} / DEF:{{valueTransfer('def', item1.def)}}</p>
          <p>标准价格：<input type="text" placeholder="price" value="500">DP</p>
        </div>
      </div>
      <div class="grid"
           v-for="(item2,index2) in normal_result"
           :key="'r'+index2">
        <div class="grid-left">
          <img :src="getPic(item2.id)" width="88">
        </div>
        <div class="grid-right">
          <p>{{item2.name}}</p>
          <p>{{valueTransfer('attribute', item2.attribute)}} - {{valueTransfer('race', item2.race)}}</p>
          <p>ATK:{{valueTransfer('atk', item2.atk)}} / DEF:{{valueTransfer('def', item2.def)}}</p>
          <p>标准价格：<input type="text" placeholder="price" value="10">DP</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import cards from '../../public/data/cards';
  import pack_list from '../../public/data/pack_list';
  import {localSearch, valueTransfer} from '../js/localSearch';

  export default {
    name: "Home",
    data(){
      return{
        valueTransfer,
        options: {
          pack_list,
        },
        form: {
          pack: [""],
        },
        rd_form: {
          pool: "",
          rare_pool: "",
          normal_size: 0,
          rare_size: 0,
        },
        tableData: [],
        rdData: [],

        normal_result: [],
        rare_result: []
      }
    },
    computed:{
      tableHeight(){
        return window.innerHeight - 300;
      }
    },
    methods: {
      search(){
        if(this.form.pack.length < 2){
          this.tableData = [];
          return;
        }
        this.tableData = localSearch(this.form);
      },
      getPic(id){
        return require(`./img/${id}.jpg`);
      },
      roll() {
        try{
          let normal_pool = this.rd_form.pool.trim().split(";");
          let rare_pool = this.rd_form.rare_pool.trim().split(";");
          let normal_data = [];
          let rare_data = [];


          this.normal_result = [];
          this.rare_result = [];


          let normal_data_assigned = [];
          let rare_data_assigned = [];
          //pool data
          cards.forEach((item) => {
            if(item.name && item.name !== ""){
              if (normal_pool.includes(item.name)) {
                if (!normal_data_assigned.includes(item.name)) {
                  normal_data_assigned.push(item.name);
                  normal_data.push(item);
                }
              }
              if (rare_pool.includes(item.name)) {
                if (!rare_data_assigned.includes(item.name)) {
                  rare_data_assigned.push(item.name);
                  rare_data.push(item);
                }
              }
            }
          });

          //normal
          for (let i = 0; i < this.rd_form.normal_size; i++) {
            let index = Math.ceil(Math.random() * normal_data.length);
            this.normal_result.push(normal_data[index]);
          }

          //rare
          for (let i = 0; i < this.rd_form.rare_size; i++) {
            let index = Math.floor(Math.random() * rare_data.length);
            this.rare_result.push(rare_data[index]);
          }

        }catch (e) {
          console.log('error');
        }
      }
    },
  }
</script>

<style scoped>
  .gridbox{
    width: 1500px;
  }
  .grid{
    width: 300px;
    float: left;
    display: flex;
    margin: 20px;
    background: aliceblue;
  }

  .grid.rare{
    background: #ffedc7;
  }

  .grid p {
    margin: 4px 8px 8px 8px;
  }

  .grid input{
    width: 80px;
  }
</style>