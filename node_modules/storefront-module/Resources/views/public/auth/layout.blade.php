<!DOCTYPE html>
<html>
    <head>
        <base href="{{ url('/') }}">
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

        <title>
            @yield('title') - {{ setting('store_name') }}
        </title>

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="{{ font_url(setting('storefront_display_font', 'Rubik')) }}" rel="stylesheet">

        <style>
            :root {
                --base-font-family: "{{ setting('storefront_display_font', 'Poppins') }}", sans-serif;
                --base-font-size: 15px;
                --font-light: 300;
                --font-normal: 400;
                --font-medium: 500;
                --font-semibold: 600;
                --font-bold: 700;
                --font-extrabold: 800;
                --default-border-radius: 8px;
                --color-primary: {{ tinycolor($themeColor->toString())->toHexString() }};
                --color-primary-darken-10: {{ generate_color_shade($themeColor->toString(), 0.1) }};
                --color-primary-alpha-10: {{ tinycolor($themeColor->toString())->setAlpha(0.1)->toString() }};
                --color-primary-alpha-90: {{ tinycolor($themeColor->toString())->setAlpha(0.9)->toString() }};
                --color-secondary: #00bc65;
                --color-dark: #0e1e3e;
                --color-dark-2: #626f84;
                --color-dark-3: #a0aec0; 
                --color-light: #ffffff;
                --color-border: #e1e2e4;
                --color-red: #ff5748;
                --transition-200: 0.2s ease-in-out;
            }
        </style>

        @vite([
            'modules/Storefront/Resources/assets/public/sass/pages/auth/main.scss',
            'modules/Storefront/Resources/assets/public/js/pages/auth/main.js',
        ])

        @stack('globals')
    </head>

    <body class="clearfix {{ is_rtl() ? 'rtl' : 'ltr' }}" dir="{{ is_rtl() ? 'rtl' : 'ltr' }}">
        <div class="login-page">
            @yield('content')
        </div>
    </body>
</html>
