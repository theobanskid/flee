<section class="navigation-wrap">
    <div class="container">
        <div class="navigation-inner">
            @include('storefront::public.layouts.navigation.category_menu')
            @include('storefront::public.layouts.navigation.primary_menu')

            <span class="navigation-text">
                {{ setting('storefront_navbar_text') }}
            </span>
        </div>
    </div>
</section>

@include('storefront::public.layouts.navigation.bottom_navigation_menu')
