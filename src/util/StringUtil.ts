export class StringUtil {

	/**
	 * The website is in UTF-8 but some strings aren't.  This removes characters that can't be converted to
	 * unicode (they show up on the page as question marks). From https://stackoverflow.com/a/36652446/132374.
	 */
	static removeInvalidCharacters(input: string | undefined, replacement = ' '): string {
		return input ? input.replace(/\uFFFD/g, replacement) : '';
	}

}