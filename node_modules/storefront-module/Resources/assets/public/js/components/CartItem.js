Alpine.data("CartItem", (cartItem) => ({
    controller: null,
    product: cartItem.product,
    item: cartItem.variant || cartItem.product,
    oldCartItem: { ...cartItem },

    get productName() {
        return this.product.name;
    },

    get productUrl() {
        return route("products.show", {
            slug: this.product.slug,
            ...(this.hasAnyVariant && {
                variant: this.item.uid,
            }),
        });
    },

    get productPrice() {
        return cartItem.unitPrice.inCurrentCurrency.formatted;
    },

    get hasAnyVariation() {
        return Object.keys(cartItem.variations).length !== 0;
    },

    get variationsLength() {
        return Object.keys(cartItem.variations).length;
    },

    get hasAnyOption() {
        return Object.keys(cartItem.options).length !== 0;
    },

    get optionsLength() {
        return Object.keys(cartItem.options).length;
    },

    get hasAnyVariant() {
        return this.product.variant !== null;
    },

    get hasAnyMedia() {
        return this.item.media.length !== 0;
    },

    get hasBaseImage() {
        if (this.hasAnyVariant) {
            return this.item.base_image.length !== 0 ||
                this.product.base_image.length !== 0
                ? true
                : false;
        }

        return this.item.base_image.length !== 0;
    },

    get baseImage() {
        return this.hasBaseImage
            ? this.item.base_image.path || this.product.base_image.path
            : `${window.FleetCart.baseUrl}/build/assets/image-placeholder.png`;
    },

    isQtyIncreaseDisabled(cartItem) {
        return (
            this.maxQuantity(cartItem) !== null &&
            cartItem.qty >= cartItem.item.qty
        );
    },

    optionValues(option) {
        let values = [];

        for (let value of option.values) {
            values.push(value.label);
        }

        return values.join(", ");
    },

    maxQuantity({ item }) {
        return item.is_in_stock && item.does_manage_stock ? item.qty : null;
    },

    exceedsMaxStock({ item, qty }) {
        return item.does_manage_stock && item.qty < qty;
    },

    changeQuantity(cartItem, qty) {
        if (isNaN(qty) || qty < 1) {
            qty = 1;

            this.updateCart(cartItem, qty);

            return;
        }

        cartItem.qty = qty;

        if (this.exceedsMaxStock(cartItem)) {
            qty = cartItem.item.qty;

            this.updateCart(cartItem, qty);

            return;
        }

        this.updateCart(cartItem, qty);
    },

    updateQuantity(cartItem, qty) {
        if (isNaN(qty) || qty < 1) {
            qty = 1;
            cartItem.qty = 1;

            return;
        }

        cartItem.qty = qty;

        if (this.exceedsMaxStock(cartItem)) {
            cartItem.qty = cartItem.item.qty;

            this.updateCart(cartItem, cartItem.qty);

            return;
        }

        this.updateCart(cartItem, qty);
    },

    async updateCart(cartItem, qty) {
        this.loadingOrderSummary = true;

        if (this.controller) {
            this.controller.abort();
        }

        this.controller = new AbortController();

        try {
            const { data } = await axios.put(
                route("cart.items.update", {
                    id: cartItem.id,
                }),
                {
                    qty: qty || 1,
                },
                {
                    signal: this.controller.signal,
                }
            );

            this.$store.state.updateCart(data);
        } catch (error) {
            if (error.code !== "ERR_CANCELED") {
                // revert cart item quantity on server error
                this.$store.state.updateCartItemQty(this.oldCartItem);

                notify(trans("storefront::storefront.something_went_wrong"));
            }
        } finally {
            this.loadingOrderSummary = false;
        }
    },

    removeCartItem() {
        this.loadingOrderSummary = true;

        this.$store.state.removeCartItem(cartItem.id);

        axios
            .delete(
                route("cart.items.destroy", {
                    id: cartItem.id,
                })
            )
            .then((response) => {
                this.$store.state.updateCart(response.data);
            })
            .finally(() => {
                this.loadingOrderSummary = false;
            });
    },
}));
