export class StringUtil {

	/** From https://stackoverflow.com/a/36652446/132374 */
	static fixInvalidUTF(input: string | undefined, replacement = ' '): string {
		return input ? input.replace(/\uFFFD/g, replacement) : '';
	}

}