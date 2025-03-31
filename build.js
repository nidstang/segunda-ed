import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import ThemesLoader from 'sd-themes-loader';

StyleDictionary.registerTransform({
	name: "assets/background",
	type: "value",
	filter: (token) => token.$type === "asset",
	transform: (token) => `url('/app/assets/${token.$value}')`,
});


register(StyleDictionary, {
    withSDBuiltins: false,
});

const loader = ThemesLoader(StyleDictionary);

async function run() {
    const themes = await loader.load('/tokens');

    const globalTheme = themes.getThemeByName('global');
    const viewportTheme = themes.getThemesByGroup('viewport');
    // const lightTheme = themes.getThemeByName('light');
    const modeTheme = themes.getThemesByGroup('mode');

    const config = {
        expand: {
            typesMap: true,
        },
        platforms: {
            web: {
                files: [
                    {
                        destination: 'app/build/global/variables.css',
                        format: 'css/variables',
                    },
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

    const modeConfig = theme => ({
        platforms: {
            web: {
                files: [
                    {
                        destination: `app/build/${theme.name}/variables.css`,
                        format: 'css/variables',
                        options: {
                            selector: `.${theme.name.toLowerCase()}`,
                            // outputReferences: true, //si ponemos true va a salir un warning puesto que tendriamos que manualmente importar las referencias para que los css funcionasen
                        },
                        // filter: token => !token.filePath.includes('palette'),

                    },
                ],

                transforms: [
                    'name/kebab',
                    'color/rgb',
                    'assets/background'
                ]
            }
        }
    });

    globalTheme.addConfig(config).build();
    viewportTheme.addConfig(config).build();
    // lightTheme.addConfig(lightConfig).build();
    modeTheme.addConfig(modeConfig).build();

}

run();
