import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import ThemesLoader from 'sd-themes-loader';

register(StyleDictionary, {
    withSDBuiltins: false,
});

const loader = ThemesLoader(StyleDictionary);

async function run() {
    const themes = await loader.load('/tokens');

    const globalTheme = themes.getThemeByName('global');
    const lightTheme = themes.getThemeByName('light');
    const darkTheme = themes.getThemeByName('dark');

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
                    }
                ],

                transforms: [
                    'name/kebab',
                    'color/rgb'
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
                    }
                ],

                transforms: [
                    'name/kebab',
                    'color/rgb'
                ]
            }
        }
    };

    globalTheme.addConfig(globalConfig).build();
    lightTheme.addConfig(lightConfig).build();
    darkTheme.addConfig(darkConfig).build();

}

run();
