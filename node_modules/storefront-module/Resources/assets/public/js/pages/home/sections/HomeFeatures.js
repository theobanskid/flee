import Swiper from "swiper";
import { Autoplay } from "swiper/modules";

Alpine.data("HomeFeatures", () => ({
    init() {
        this.initFeaturesSlider();
    },

    initFeaturesSlider() {
        new Swiper(".features", {
            modules: [Autoplay],
            slidesPerView: 1,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            breakpoints: {
                576: {
                    slidesPerView: 2,
                },
                780: {
                    slidesPerView: 3,
                },
                1180: {
                    slidesPerView: 4,
                },
                1400: {
                    slidesPerView: 5,
                },
            },
        });
    },
}));
