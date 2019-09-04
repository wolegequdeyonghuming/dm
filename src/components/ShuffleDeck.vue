<template>
  <div class="shuffle-deck">
    <div class="inline">
      <label>Deck</label>
      <el-input
              class="deck"
              type="textarea"
              :rows="11"
              v-model="deckString">
      </el-input>
      <br/>
      <el-button class="shuffle" @click="shuffle">shuffle</el-button>
    </div>
    <div class="inline">
      <label>Hand</label>
      <el-input
              class="hand"
              type="textarea"
              :rows="6"
              v-model="handString">
      </el-input>
      <label>Extra</label>
      <el-input
              class="extra"
              type="textarea"
              :rows="5"
              v-model="extraString">
      </el-input>
    </div>
    <div class="inline">
      <table class="deck-field">
        <tr>
          <td></td>
          <td></td>
          <td class="ex-zone"><input type="text" title="card" class="card-input"/></td>
          <td></td>
          <td class="banish-zone"><input type="text" title="card" class="card-input"/></td>
        </tr>
        <tr>
          <td class="field-zone"><input type="text" title="card" class="card-input"/></td>
          <td class="monster-zone"><input type="text" title="card" class="card-input"/></td>
          <td class="monster-zone"><input type="text" title="card" class="card-input"/></td>
          <td class="monster-zone"><input type="text" title="card" class="card-input"/></td>
          <td class="graveyard-zone"><input type="text" title="card" class="card-input"/></td>
        </tr>
        <tr>
          <td class="exdeck-zone"><input type="text" title="card" class="card-input"/></td>
          <td class="magic-zone"><input type="text" title="card" class="card-input"/></td>
          <td class="magic-zone"><input type="text" title="card" class="card-input"/></td>
          <td class="magic-zone"><input type="text" title="card" class="card-input"/></td>
          <td class="deck-zone"><input type="text" title="card" class="card-input"/></td>
        </tr>
      </table>

      <div>
        <div class="inline">
          <label>name</label>
          <el-input class="name"></el-input>
        </div>
        <div class="inline">
          <label>lp</label>
          <el-input class="lp"></el-input>
        </div>
      </div>
      <div>
        <div class="inline">
          <label>order</label>
          <el-input class="order"></el-input>
        </div>
        <div class="inline">
          <label>count</label>
          <el-input class="count"></el-input>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import '../js/shuffle'

  export default {
    name: "ShuffleDeck",
    data(){
      return{
        deckString: '',
        handString: '',
        extraString: '',
      }
    },
    methods:{
      shuffle(){
        let deckArray = this.deckString.trim().split('\n');
        let newArray = deckArray.shuffle();
        this.deckString = newArray.join('\n');
      }
    },
    watch:{
      deckString(val){
        this.deckString = val.replace(/\x09/g, '\n')
      },
      handString(val){
        this.handString = val.replace(/\x09/g, '\n')
      },
      extraString(val){
        this.extraString = val.replace(/\x09/g, '\n')
      },
    }
  }
</script>

<style scoped>
  .shuffle-deck{
    width: 568px;
    padding: 16px;
    box-shadow: 1px 1px 15px 0px rgba(0,0,0,0.4);
    margin-bottom: 36px;
  }
  .inline{
    display: inline-block;
    margin: 0 4px;
  }
  label{
    display: block;
    font-size: 12px;
    color: #888;
  }
  .deck, .hand, .extra{
    width: 120px;
    /*height: 200px;*/
  }

  .shuffle{
    margin-top: 4px;
  }

  .deck-field {
    width: 300px;
  }
  .deck-field td{
    height: 48px;
  }
  .deck-field td input{
    width: 100%;
    height: 100%;
    border: 1px solid #AAA;
    border-radius: 2px;
  }
  .name, .lp, .order, .count{ width: 140px; }

  .ex-zone input { background: #86baed; }
  .monster-zone input{ background: #edd9b2; }
  .field-zone input{ background: #9cedb0; }
  .graveyard-zone input{ background: #afafaa; }
  .magic-zone input{ background: #9cedb0; }
  .exdeck-zone input{ background: #c0a8fe; }
  .deck-zone input{ background: #4a2511; }
  .banish-zone input{ background: #0d0d0d; color:white; }
</style>
<style>
  .deck textarea, .hand textarea, .extra textarea{
    white-space: nowrap;
  }
</style>