<template>
  <el-row>
    <el-col :span="8" style="min-width: 620px;"><shuffle-deck></shuffle-deck></el-col>
    <el-col :span="8" style="min-width: 620px;"><shuffle-deck></shuffle-deck></el-col>
    <el-col :span="8" style="min-width: 620px;"><shuffle-deck></shuffle-deck></el-col>
    <el-col :span="8" style="min-width: 620px;"><shuffle-deck></shuffle-deck></el-col>
    <el-col :span="8" style="min-width: 620px;"><shuffle-deck></shuffle-deck></el-col>
    <el-col :span="8" style="min-width: 620px;"><shuffle-deck></shuffle-deck></el-col>
  </el-row>
</template>

<script>
  import '../js/shuffle'
  import ShuffleDeck from "../components/ShuffleDeck";

  export default {
    name: "Shuffle",
    components: {ShuffleDeck},
    data(){
      return{

      }
    }
  }
</script>

<style scoped>

</style>