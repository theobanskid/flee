@if (setting('newsletter_enabled'))
    <section x-data="NewsletterSubscription" class="subscribe-wrap d-flex justify-content-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-14 col-lg-18">
                    <div class="subscribe">
                        <div class="row align-items-center">
                            <div class="col-lg-9 col-md-18">
                                <div class="subscribe-text">
                                    <span class="title">
                                        {{ trans('storefront::layouts.subscribe_to_our_newsletter') }}
                                    </span>

                                    <span class="sub-title">
                                        {{ trans('storefront::layouts.subscribe_to_our_newsletter_subtitle') }}
                                    </span>
                                </div>
                            </div>

                            <div class="col-lg-9 col-md-18">
                                <div class="subscribe-field">
                                    <form @submit.prevent="subscribe">
                                        <div class="form-group">
                                            <input
                                                type="email"
                                                autocomplete="on"
                                                class="form-control"
                                                id="email"
                                                placeholder="{{ trans('storefront::layouts.email_address') }}"
                                                x-model="email"
                                            >
                                            
                                            <button
                                                type="submit"
                                                class="btn btn-primary btn-subscribe"
                                                :class="{ 'btn-loading': subscribing }"
                                                :disabled="subscribing"
                                            >
                                                {{ trans('storefront::layouts.subscribe') }}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endif
