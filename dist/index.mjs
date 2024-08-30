import express from "express";
import { defineComponent, useSSRContext, createSSRApp, h } from "vue";
import { renderToString } from "@vue/server-renderer";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = defineComponent({
  props: {
    name: {
      type: String,
      required: true
    }
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Hello, ${ssrInterpolate(_ctx.name)}!</h1></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/HelloWorld.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HelloWorld = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
const app = express();
app.get("/status", async (req, res) => {
  res.send("status!!");
});
app.get("/generate", async (req, res) => {
  const vueApp = createSSRApp({
    render: () => h(HelloWorld, { name: "Server-side rendering with Vue 3 and TypeScript!" })
  });
  try {
    const html = await renderToString(vueApp);
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Vue 3 SSR with TypeScript</title>
        </head>
        <body>
          <div id="app">${html}</div>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Error during rendering:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/", async (req, res) => {
  res.send("Working");
});
app.listen(1e3, () => {
  console.log("Server is running on http://localhost:1000");
});
