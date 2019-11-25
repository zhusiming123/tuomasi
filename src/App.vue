<template>
  <div id="app">
    <routerView />
    <div 
      class="model_loading" 
      v-show="loading"
    >
      <Loading />
    </div>
    <Toast v-show="errorType" />
    <Error v-show="interError" />
  </div>
</template>



<script>
import { mapState } from "vuex";
import Loading from "@/components/default/loading";
import Error from "@/components/default/interError";
import Toast from "@/components/default/toast";
import { setCookie } from "@/api/cookie";
export default {
  name: "App",
  data() {
    return {
      height: ""
    };
  },
  computed: {
    ...mapState(["loading", "errorType", "interError"])
  },
  created: function() {
    this.$set(this, "height", window.innerHeight);
    setCookie("token", setCookie("token"), { expires: 24 * 60 * 7, path: "/" });
    window.onbeforeunload = () => {
      window.sessionStorage.setItem("websocketType", 3);
      if (
        window.localStorage.getItem("checkType") &&
        !eval(window.localStorage.getItem("checkType"))
      ) {
        const token = setCookie("token");
        if (token) {
          setCookie("token", token, { expires: 120, path: "/" });
        }
      }
    };
  },
  mounted: function() {},
  components: { Loading, Toast, Error }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
button {
  -moz-appearance: none;
  -webkit-appearance: none;
}
ul li {
  list-style-type: none;
}

.model_loading {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  z-index: 100000;
}
.layout {
  width: 100%;
  height: 100%;
  width: 1200px;
  flex-grow: 0;
  flex-shrink: 0;
}
.column-line {
  display: inline-block;
  width: 2px;
  height: 18px;
  background: rgba(240, 240, 240, 1);
  margin: 0 10px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}
input {
  -moz-appearance: textfield;
}
</style>
