import{m as n}from"./alpinejs-BVmYX9MG-v4.5.0.js";import{j as a}from"./jquery-BDaHQXZF-v4.5.0.js";import{b as s}from"./bootstrap-oJy5IAXb-v4.5.0.js";import{a as r}from"./axios-DsPaXkF5-v4.5.0.js";import{T as d}from"./toastify-js-Ck_sc_9Z-v4.5.0.js";import"./@popperjs-DMMwm23M-v4.5.0.js";window.axios=r;r.defaults.headers.common["X-CSRF-TOKEN"]=FleetCart.csrfToken;r.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";function l(o,t={}){let e=window.FleetCart.langs[o];for(let i in t)e=e.replace(`:${i}`,t[i]);return e}function w(o,t={}){d({text:o||trans("storefront::storefront.something_went_wrong"),duration:3e3,close:!0,gravity:window.innerWidth>991?"bottom":"top",position:"right",stopOnFocus:!0,style:{background:"#343a40"},...t}).showToast()}window.Alpine=n;window.bootstrap=s;window.$=window.jQuery=a;window.trans=l;window.notify=w;n.data("App",()=>({hideOverlay(){const o=this.$store.layout;o.closeSidebarMenu(),o.closeSidebarCart(),o.closeSidebarFilter(),o.closeLocalizationMenu()}}));
