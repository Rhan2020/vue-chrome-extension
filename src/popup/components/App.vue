<template>
  <div>
    <button id="open-btn" @click="handleClick(1)">sheetToCode</button>
    <button id="open-btn" @click="handleClick(2)">多语言自检工具</button>
  </div>
</template>

<script>
export default {
  name: "App",

  components: {},

  data() {
    return {};
  },

  methods: {
    handleClick(tpye) {
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true
        },
        tabs => {
          let message = {
            info: `open-panel-${tpye}`
          };
          chrome.tabs.sendMessage(tabs[0].id, message, () => {});
        }
      );
    }
  },

  computed: {},

  mounted() {}
};
</script>

<style>
#open-btn {
  color: black;
  border-radius: 10px;
  height: 40px;
  width: 100px;
  padding: 5px 20px;
  margin: 0 auto 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
