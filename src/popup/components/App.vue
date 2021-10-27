<template>
  <div>
    <button id="open-btn" @click="handleClick">open panel</button>
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
    handleClick() {
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true
        },
        tabs => {
          let message = {
            info: "open-panel"
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
  border-radius: 20px;
  height: 40px;
  width: 100px;
  padding: 10px 20px;
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
