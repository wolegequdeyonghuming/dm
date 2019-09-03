<template>
  <el-container style="border: 1px solid #eee" :style="{height:windowHeight}">
    <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
      <el-form>
        <el-form-item>
          <el-input v-model="form.name" placeholder="关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox-group v-model="form.attribute" size="mini" disabled>
            <el-checkbox v-for="item in options.attribute_list"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"
                         border></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-checkbox-group v-model="form.race" size="mini" disabled>
            <el-checkbox v-for="item in options.race_list"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"
                         border></el-checkbox>
          </el-checkbox-group>
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
      </el-form>
    </el-aside>


  </el-container>
</template>

<script>
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
    name: "Finder",
    computed:{
      data(){
        return{
          options: {
            attribute_list,
            race_list,
          },
          form:{
            name: "",
            pack: [],
            attribute: [],
            type: [],
            race: [],
            level: ""
          }
        }
      },
      windowHeight(){
        return window.innerHeight - 300;
      }
    }
  }
</script>

<style scoped>

</style>