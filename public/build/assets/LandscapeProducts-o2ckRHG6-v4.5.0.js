import{S as r,N as a,P as o}from"./swiper-BkenO_dh-v4.5.0.js";import"./ProductCard-fXPfQTF2-v4.5.0.js";Alpine.data("LandscapeProducts",({routeName:t,watchState:s})=>({products:[],init(){this.fetchProducts(),s&&this.$watch(s,e=>{e&&(this.products=[],this.$refs.landscapeProductsWrap.remove())})},hideLandscapeProductsSkeleton(){document.querySelectorAll(".landscape-products .swiper-slide-skeleton").forEach(i=>i.remove())},async fetchProducts(){try{const e=await axios.get(route(t));this.products=e.data,this.$nextTick(()=>{new r(".landscape-products",{modules:[a,o],slidesPerView:2,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",dynamicBullets:!0,clickable:!0},breakpoints:{576:{slidesPerView:3},830:{slidesPerView:4},991:{slidesPerView:5},1200:{slidesPerView:6},1400:{slidesPerView:7},1760:{slidesPerView:8}}})})}catch(e){notify(e.response.data.message)}finally{this.hideLandscapeProductsSkeleton()}}}));
