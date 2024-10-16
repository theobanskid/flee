<style>
    :root {
        --base-font-family: "{{ setting('storefront_display_font', 'Poppins') }}", sans-serif;
        --font-light: 300;
        --font-normal: 400; 
        --font-medium: 500;
        --font-semibold: 600;
        --font-bold: 700;
        --font-extrabold: 800;

        /* colors */
        --color-primary: {{ tinycolor($themeColor->toString())->toHexString() }};
        --color-primary-hover: {{ tinycolor($themeColor->toString())->darken(8)->toString() }};
        --color-primary-alpha-10: {{ tinycolor($themeColor->toString())->setAlpha(0.10)->toString() }};
        --color-primary-alpha-12: {{ tinycolor($themeColor->toString())->setAlpha(0.12)->toString() }};
        --color-primary-alpha-15: {{ tinycolor($themeColor->toString())->setAlpha(0.15)->toString() }};
        --color-primary-alpha-30: {{ tinycolor($themeColor->toString())->setAlpha(0.3)->toString() }};
        --color-primary-alpha-80: {{ tinycolor($themeColor->toString())->setAlpha(0.8)->toString() }};
        --color-white: #ffffff;
        --color-white-lite: #f2f4f5;
        --color-white-dark: #f9f9f9;
        --color-white-transparent: rgba(255, 255, 255, 0.7);
        --color-black: #191919;
        --color-gray: #6e6e6e;
        --color-gray-lite: #ebebeb;
        --color-gray-dark: #a6a6a6;
        --color-red: #FF5748;
        --color-green: #00BC65;
        --color-info: #247cc6;
        --color-yellow: #ffb136;
        --border-color: #E8E7EB;
        --border-color-lite: #e5e5e5;
        --border-color-5: #d4d4d4;
        --color-gray-dark-5: #999999;
        --color-gray-lite-10: #d2d2d2;
        --color-black-20: #4c4c4c;
        --color-black-35: #727272;
        --color-white-lite-2: #eceff1;

        /* miscellaneous */
        --radius-default: 8px;
        --radius-full: 50%;
        --transition-100: 100ms ease-in-out;
        --transition-150: 150ms ease-in-out;
        --transition-200: 200ms ease-in-out;
        --transition-250: 250ms ease-in-out;
    }
</style>
