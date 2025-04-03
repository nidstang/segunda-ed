import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import ThemesLoader from 'sd-themes-loader';

register(StyleDictionary, {
    withSDBuiltins: false,
});

StyleDictionary.registerTransform({
    name: 'assets/background',
    type: 'value',
    filter: (token) => token.$type === 'asset',
    transform: (token) => `url('/app/assets/${token.$value}')`
});

const loader = ThemesLoader(StyleDictionary);

async function run() {
    const themes = await loader.load('/tokens');

    const globalTheme = themes.getThemeByName('global');
    const lightTheme = themes.getThemeByName('light');
    const darkTheme = themes.getThemeByName('dark');
    const desktopTheme = themes.getThemeByName('desktop');
    const mobileTheme = themes.getThemeByName('mobile');

    const globalConfig = {
        expand: {
            typesMap: true,
        },
        platforms: {
            web: {
                files: [
                    {
                        destination: 'app/build/global/variables.css',
                        format: 'css/variables',
                    }
                ],

                transforms: [
                    'name/kebab',
                    'ts/resolveMath',
                    'ts/typography/fontWeight',
                    'ts/size/lineheight',
                    'size/pxToRem'
                ]
            }
        }
    };

    const lightConfig = {
        platforms: {
            web: {
                files: [
                    {
                        destination: 'app/build/light/variables.css',
                        format: 'css/variables',
                        options: {
                            selector: '.light'
                        }
                    }
                ],

                transforms: [
                    'name/kebab',
                    'color/rgb',
                    'assets/background'
                ]
            }
        }
    };

    const darkConfig = {
        platforms: {
            web: {
                files: [
                    {
                        destination: 'app/build/dark/variables.css',
                        format: 'css/variables',
                        options: {
                            selector: '.dark'
                        }
                    }
                ],

                transforms: [
                    'name/kebab',
                    'color/rgb',
                    'assets/background'
                ]
            }
        }
    };

    // app/build/desktop/variables.css
    const desktopConfig = {
        expand: {
            typesMap: true,
        },
        platforms: {
            web: {
                files: [
                    {
                        destination: 'app/build/desktop/variables.css',
                        format: 'css/variables',
                    }
                ],

                transforms: [
                    'name/kebab',
                    'ts/resolveMath',
                    'ts/typography/fontWeight',
                    'ts/size/lineheight',
                    'size/pxToRem'
                ]
            }
        }

    };

    // app/build/mobile/variables.css
    const mobileConfig = {
        expand: {
            typesMap: true,
        },
        platforms: {
            web: {
                files: [
                    {
                        destination: 'app/build/mobile/variables.css',
                        format: 'css/variables',
                    }
                ],

                transforms: [
                    'name/kebab',
                    'ts/resolveMath',
                    'ts/typography/fontWeight',
                    'ts/size/lineheight',
                    'size/pxToRem'
                ]
            }
        }


    };

    globalTheme.addConfig(globalConfig).build();
    lightTheme.addConfig(lightConfig).build();
    darkTheme.addConfig(darkConfig).build();
    desktopTheme.addConfig(desktopConfig).build();
    mobileTheme.addConfig(mobileConfig).build();

}

run();
