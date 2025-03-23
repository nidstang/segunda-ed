import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import ThemesLoader from 'sd-themes-loader';

register(StyleDictionary, {
	withSDBuiltins: false,
});


const lodaer = ThemesLoader(StyleDictionary);


async function run() {
	const holder = await lodaer.load('/tokens');

	const global = holder.getThemeByName('global');

	const config = {
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
					'size/pxToRem'
				]
			}
		}
	}

	global.addConfig(config).build();

}

run();
