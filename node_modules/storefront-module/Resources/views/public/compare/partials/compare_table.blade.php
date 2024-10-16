<template x-if="hasAnyProduct">
    <div class="table-responsive">
        <table class="table table-bordered compare-table"> 
            <tbody>
                <tr>
                    <td>{{ trans('storefront::compare.product_overview') }}</td>

                    <template x-for="(product, index) in products" :key="index">
                        <td x-data="ProductCard(product)">
                            <a :href="productUrl" class="product-image">
                                <img
                                    :src="baseImage"
                                    :class="{ 'image-placeholder': !hasBaseImage }"
                                    :alt="product.name"
                                >
                            </a>

                            <a
                                :href="productUrl"
                                class="product-name"
                                x-text="product.name"
                            >
                            </a>

                            <button class="btn btn-remove" @click="removeItem">
                                <i class="las la-times"></i>
                            </button>
                        </td>
                    </template>
                </tr>

                <tr>
                    <td>{{ trans('storefront::compare.description') }}</td>

                    <template x-for="(product, index) in products" :key="index">
                        <td x-text="product.short_description || '-'"></td>
                    </template>
                </tr>

                <tr>
                    <td>{{ trans('storefront::compare.rating') }}</td>

                    <template x-for="(product, index) in products" :key="index">
                        <td>
                            @include('storefront::public.partials.product_rating')
                        </td>
                    </template>
                </tr>

                <tr>
                    <td>{{ trans('storefront::compare.price') }}</td>

                    <template x-for="(product, index) in products" :key="index">
                        <td x-data="ProductCard(product)">
                            <span class="product-price" x-html="productPrice"></span>
                        </td>
                    </template>
                </tr>

                <tr>
                    <td>{{ trans('storefront::compare.availability') }}</td>

                    <template x-for="(product, index) in products" :key="index">
                        <td x-data="ProductCard(product)">
                            <template x-if="isInStock">
                                <span class="badge badge-success">
                                    {{ trans('storefront::compare.in_stock') }}
                                </span>
                            </template>

                            <template x-if="!isInStock">
                                <span class="badge badge-danger">
                                    {{ trans('storefront::compare.out_of_stock') }}
                                </span>
                            </template>
                        </td>
                    </template>
                </tr>

                <template x-for="(attribute, index) in attributes" :key="index">
                    <tr>
                        <td x-text="attribute.name"></td>

                        <template x-for="(product, index) in products" :key="index">
                            <td x-text="hasAttribute(product, attribute) ? attributeValues(product, attribute) : '-'"></td>
                        </template>
                    </tr>
                </template>

                <tr>
                    <td>{{ trans('storefront::compare.actions') }}</td>

                    <template x-for="product in products">
                        <td x-data="ProductCard(product)">
                            <button
                                title="{{ trans('storefront::compare.add_to_wishlist') }}"
                                class="btn btn-wishlist"
                                :class="{ 'added': inWishlist }"
                                @click="syncWishlist"
                            >
                                <template x-if="inWishlist">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M16.44 3.1001C14.63 3.1001 13.01 3.9801 12 5.3301C10.99 3.9801 9.37 3.1001 7.56 3.1001C4.49 3.1001 2 5.6001 2 8.6901C2 9.8801 2.19 10.9801 2.52 12.0001C4.1 17.0001 8.97 19.9901 11.38 20.8101C11.72 20.9301 12.28 20.9301 12.62 20.8101C15.03 19.9901 19.9 17.0001 21.48 12.0001C21.81 10.9801 22 9.8801 22 8.6901C22 5.6001 19.51 3.1001 16.44 3.1001Z" fill="#292D32"/>
                                    </svg>
                                </template>

                                <template x-if="!inWishlist">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </template>
                            </button>
                            
                            <template x-if="!hasAnyOption">
                                <button
                                    title="{{ trans('storefront::compare.add_to_cart') }}"
                                    class="btn btn-add-to-cart"
                                    :disabled="isOutOfStock"
                                    @click="addToCart"
                                >
                                    <i class="las la-shopping-cart"></i>
                                </button>
                            </template>

                            <template x-if="hasAnyOption">
                                <a
                                    :href="productUrl"
                                    title="{{ trans('storefront::compare.view_options') }}"
                                    class="btn btn-add-to-cart"
                                    :disabled="isOutOfStock"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42004 13.98 8.42004 12C8.42004 10.02 10.02 8.41998 12 8.41998C13.98 8.41998 15.58 10.02 15.58 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.46997 3.71997 5.17997 5.79997 2.88997 9.39997C1.98997 10.81 1.98997 13.18 2.88997 14.59C5.17997 18.19 8.46997 20.27 12 20.27Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </a>
                            </template>
                        </td>
                    </template>
                </tr>
            </tbody>
        </table>
    </div>
</template>
