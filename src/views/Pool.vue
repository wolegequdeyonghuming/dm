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
        (共 {{tableData.length}} 张)
      </el-form-item>
    </el-form>

      <!--<p><span v-for="item in tableData" :key="item.id">{{item.name}};</span></p>-->
    <el-form ref="rd_form" :model="rd_form" inline>
      <el-form-item
              label="卡池">
        <el-input
                style="width: 400px;"
                type="textarea"
                placeholder="请输入内容"
                v-model="rd_form.pool">
        </el-input>
      </el-form-item>
      <el-form-item
              label="抽出数量">
        <el-input v-model="rd_form.total_size"></el-input>
      </el-form-item>
      <el-form-item
              label="R几率(%)">
        <el-input v-model="rd_form.rare_chance"></el-input>
      </el-form-item>
      <el-button @click="roll" type="primary">ROLL</el-button>
    </el-form>

    <div class="gridbox">

      <template v-for="(item1,index1) in normal_result">
        <div class="grid rare"
             v-if="item1.modeRare === 'R'"
             :key="'n'+index1">
          <div class="grid-left">
            <img :src="getPic(item1.id)" width="88">
          </div>
          <div class="grid-right">
            <p>{{item1.name}}</p>
            <p>{{item1.attribute}} - {{item1.race}}</p>
            <p>ATK:{{item1.atk}} / DEF:{{item1.def}}</p>
            <p>标准价格：<input type="text" placeholder="price" value="500">DP</p>
          </div>
        </div>
        <div class="grid ultra-rare"
             v-if="item1.modeRare === 'UR'"
             :key="'n'+index1">
          <div class="grid-left">
            <img :src="getPic(item1.id)" width="88">
          </div>
          <div class="grid-right">
            <p>{{item1.name}}</p>
            <p>{{item1.attribute}} - {{item1.race}}</p>
            <p>ATK:{{item1.atk}} / DEF:{{item1.def}}</p>
            <p>标准价格：<input type="text" placeholder="price" value="2000">DP</p>
          </div>
        </div>
        <div class="grid"
             v-else
             :key="'n'+index1">
          <div class="grid-left">
            <img :src="getPic(item1.id)" width="88">
          </div>
          <div class="grid-right">
            <p>{{item1.name}}</p>
            <p>{{item1.attribute}} - {{item1.race}}</p>
            <p>ATK:{{item1.atk}} / DEF:{{item1.def}}</p>
            <p>标准价格：<input type="text" placeholder="price" value="10">DP</p>
          </div>
        </div>
      </template>

    </div>

  </div>
</template>

<script>
  import cards from '../../public/data/cards_mode';
  import pack_list from '../../public/data/pack_list';
  import {localSearch} from '../js/localSearch';

  export default {
    name: "Home",
    data(){
      return{
        options: {
          pack_list,
        },
        form: {
          pack: ["none", ""],
        },
        rd_form: {
          pool: "",
          total_size: 0,
          rare_chance: 0,
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
      },
      validatedPool(){
        return this.rd_form.pool.replace(/\x09/g, '\n').replace(/;/g, '\n').trim();
      }
    },
    watch: {

    },
    methods: {
      search(){
        if(this.form.pack[0] === "none"){
          this.tableData = [];
          this.rd_form.pool = "";
          return;
        }
        this.tableData = localSearch(this.form);
        this.rd_form.pool = "";
        this.tableData.forEach((data)=>{
          this.rd_form.pool += data.name + ";"
        })
      },
      getPic(id){
        try{
          return require(`../../public/pics/${id}.jpg`);
        }catch (e) {
          return null;
        }
      },
      roll() {
        let pool = this.validatedPool.split('\n');
        let normal_data = [],
            normal_data_assigned = [],
            rare_data = [],
            rare_data_assigned = [];

        this.normal_result = [];

        cards.forEach((item) => {
          if(item.name && item.name !== "" && item.alias === 0){
            if (pool.includes(item.name)) {
              if(item.modeRare === null){
                if (!normal_data_assigned.includes(item.name)) {
                  normal_data_assigned.push(item.name);
                  normal_data.push(item);
                }
              }else{
                if (!rare_data_assigned.includes(item.name)) {
                  rare_data_assigned.push(item.name);
                  rare_data.push(item);
                }
              }
            }
          }
        });

        //normal
        for (let i = 0; i < this.rd_form.total_size; i++) {
          let rare = Math.random() <= ( this.rd_form.rare_chance / 100 );
          if(rare){
            let index = Math.floor(Math.random() * rare_data.length);
            rare_data[index] && this.normal_result.push(rare_data[index]);
          }else{
            let index = Math.floor(Math.random() * normal_data.length);
            normal_data[index] && this.normal_result.push(normal_data[index]);
          }
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
    background: #fff59f;
  }
  .grid.ultra-rare{
    background: #ff9b62;
  }

  .grid p {
    margin: 4px 8px 8px 8px;
  }

  .grid input{
    width: 80px;
  }
</style>