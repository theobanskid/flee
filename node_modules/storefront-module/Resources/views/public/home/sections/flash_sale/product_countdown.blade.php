<div class="daily-deals-countdown countdown">
    <span class="countdown-row">
        <span class="countdown-section">
            <span class="countdown-amount" x-text="date.days"></span>

            <span class="countdown-period">
                {{ trans("storefront::product_card.days") }}
            </span>
        </span>

        <span class="countdown-section">
            <span class="countdown-amount" x-text="date.hours"></span>

            <span class="countdown-period">
                {{ trans("storefront::product_card.hours") }}
            </span>
        </span>

        <span class="countdown-section">
            <span class="countdown-amount" x-text="date.minutes"></span>

            <span class="countdown-period">
                {{ trans("storefront::product_card.minutes") }}
            </span>
        </span>

        <span class="countdown-section">
            <span class="countdown-amount" x-text="date.seconds"></span>

            <span class="countdown-period">
                {{ trans("storefront::product_card.seconds") }}
            </span>
        </span>
    </span>
</div>