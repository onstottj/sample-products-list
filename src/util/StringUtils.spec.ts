import { StringUtil } from './StringUtil';

describe('StringUtils', () => {

	it('should remove invalid characters from text that was converted to UTF', () => {
		const input = 'offers a 360�� rotating head with adjustable tilt, 180�� swivel/pan and an articulating arm';
		const fixed = 'offers a 360 rotating head with adjustable tilt, 180 swivel/pan and an articulating arm';
		expect(StringUtil.removeInvalidCharacters(input, '')).toBe(fixed);
	});

});