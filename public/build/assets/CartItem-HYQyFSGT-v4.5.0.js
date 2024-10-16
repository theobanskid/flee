Alpine.data("CartItem",r=>({controller:null,product:r.product,item:r.variant||r.product,oldCartItem:{...r},get productName(){return this.product.name},get productUrl(){return route("products.show",{slug:this.product.slug,...this.hasAnyVariant&&{variant:this.item.uid}})},get productPrice(){return r.unitPrice.inCurrentCurrency.formatted},get hasAnyVariation(){return Object.keys(r.variations).length!==0},get variationsLength(){return Object.keys(r.variations).length},get hasAnyOption(){return Object.keys(r.options).length!==0},get optionsLength(){return Object.keys(r.options).length},get hasAnyVariant(){return this.product.variant!==null},get hasAnyMedia(){return this.item.media.length!==0},get hasBaseImage(){return this.hasAnyVariant?this.item.base_image.length!==0||this.product.base_image.length!==0:this.item.base_image.length!==0},get baseImage(){return this.hasBaseImage?this.item.base_image.path||this.product.base_image.path:`${window.FleetCart.baseUrl}/build/assets/image-placeholder.png`},isQtyIncreaseDisabled(t){return this.maxQuantity(t)!==null&&t.qty>=t.item.qty},optionValues(t){let e=[];for(let a of t.values)e.push(a.label);return e.join(", ")},maxQuantity({item:t}){return t.is_in_stock&&t.does_manage_stock?t.qty:null},exceedsMaxStock({item:t,qty:e}){return t.does_manage_stock&&t.qty<e},changeQuantity(t,e){if(isNaN(e)||e<1){e=1,this.updateCart(t,e);return}if(t.qty=e,this.exceedsMaxStock(t)){e=t.item.qty,this.updateCart(t,e);return}this.updateCart(t,e)},updateQuantity(t,e){if(isNaN(e)||e<1){e=1,t.qty=1;return}if(t.qty=e,this.exceedsMaxStock(t)){t.qty=t.item.qty,this.updateCart(t,t.qty);return}this.updateCart(t,e)},async updateCart(t,e){this.loadingOrderSummary=!0,this.controller&&this.controller.abort(),this.controller=new AbortController;try{const{data:a}=await axios.put(route("cart.items.update",{id:t.id}),{qty:e||1},{signal:this.controller.signal});this.$store.state.updateCart(a)}catch(a){a.code!=="ERR_CANCELED"&&(this.$store.state.updateCartItemQty(this.oldCartItem),notify(trans("storefront::storefront.something_went_wrong")))}finally{this.loadingOrderSummary=!1}},removeCartItem(){this.loadingOrderSummary=!0,this.$store.state.removeCartItem(r.id),axios.delete(route("cart.items.destroy",{id:r.id})).then(t=>{this.$store.state.updateCart(t.data)}).finally(()=>{this.loadingOrderSummary=!1})}}));
