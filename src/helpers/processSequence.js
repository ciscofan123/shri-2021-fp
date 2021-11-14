/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import * as R from 'ramda'
import lodash from 'lodash';
import Api from '../tools/api.js';

const api = new Api();

const square = number => Math.pow(number, 2);

const isAllowedNumber = R.allPass([
	R.compose(R.lt(0), lodash.round, Number),
	R.compose(R.gt(10), R.length),
	R.test(/^\d+\.?\d+$/)
]);

const prepareToBinaryParams = number => ({number: number, from: 10, to: 2});
const sendToBinaryRequest = api.get('https://api.tech/numbers/base');
const toBinary = R.compose(sendToBinaryRequest, prepareToBinaryParams);

const toAnimal = id => api.get('https://animals.tech/' + id, {});

const processSequence = ({value, writeLog, handleSuccess, handleError}) => {

	const handleToBinaryResponse = R.compose(
		R.andThen(R.compose(handleSuccess, R.prop('result'))),
		R.otherwise(handleError),
		toAnimal,
		R.tap(writeLog),
		R.modulo(R.__, 3),
		R.tap(writeLog),
		square,
		R.tap(writeLog),
		R.length,
		R.tap(writeLog),
		R.prop('result')
	);

	R.compose(
		R.ifElse(
			isAllowedNumber,
			R.compose(
				R.andThen(handleToBinaryResponse),
				R.otherwise(handleError),
				toBinary,
				R.tap(writeLog),
				lodash.round,
				parseFloat
			),
			R.tap(R.compose(handleError, () => 'ValidationError'))
		),
		R.tap(writeLog),
	)(value);
}

export default processSequence;
