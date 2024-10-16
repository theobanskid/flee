Alpine.store("state", {
    cart: { ...FleetCart.cart },
    wishlist: [...FleetCart.wishlist],
    compareList: [...FleetCart.compareList],
    coupon: {},
    loading: false,

    get cartItems() {
        return this.cart.items;
    },

    get cartQuantity() {
        return this.cart.quantity;
    },

    get cartIsEmpty() {
        return Object.keys(this.cart.items).length === 0;
    },

    get cartSubTotal() {
        return this.cart.subTotal.inCurrentCurrency.formatted;
    },

    get cartTotal() {
        return this.cart.total.inCurrentCurrency.formatted;
    },

    get cartTotalAmount() {
        return this.cart.total.amount;
    },

    get compareIsEmpty() {
        return this.compareList.length === 0;
    },

    get compareCount() {
        return this.compareList.length;
    },

    get wishlistCount() {
        return this.wishlist.length;
    },

    get hasCoupon() {
        return this.cart.coupon.code !== undefined;
    },

    get getCoupon() {
        return this.cart.coupon.code;
    },

    updateCart(cart) {
        this.cart = { ...cart };

        this.setCoupon(cart);
    },

    updateCartItemQty({ id, qty }) {
        this.cart.items[id].qty = qty;
    },

    removeCartItem(id) {
        delete this.cart.items[id];
    },

    clearCart() {
        this.cart.items = {};
    },

    setCoupon(cart) {
        if (cart.coupon.code) {
            this.cart.coupon = cart.coupon;
        }
    },

    inWishlist(id) {
        return this.wishlist.includes(id);
    },

    syncWishlist(id) {
        if (this.inWishlist(id)) {
            this.removeFromWishlist(id);

            return;
        }

        this.addToWishlist(id);
    },

    async addToWishlist(id) {
        if (FleetCart.loggedIn) {
            this.wishlist.push(id);

            await axios.post(route("account.wishlist.products.store"), {
                productId: id,
            });

            return;
        }

        window.location.href = route("login");
    },

    removeFromWishlist(id) {
        this.wishlist.splice(this.wishlist.indexOf(id), 1);

        axios.delete(
            route("account.wishlist.products.destroy", { product: id })
        );
    },

    inCompareList(id) {
        return this.compareList.includes(id);
    },

    syncCompareList(id) {
        if (this.inCompareList(id)) {
            this.removeFromCompareList(id);

            return;
        }

        this.addToCompareList(id);
    },

    addToCompareList(id) {
        this.compareList.push(id);

        axios.post(route("compare.store"), {
            productId: id,
        });
    },

    async removeFromCompareList(id) {
        this.compareList.splice(this.compareList.indexOf(id), 1);

        await axios.delete(route("compare.destroy", { productId: id }));
    },
});
