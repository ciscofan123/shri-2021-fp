/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import * as R from 'ramda'

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({star, square, triangle, circle}) => {
    if (triangle !== 'white' || circle !== 'white') {
        return false;
    }

    return star === 'red' && square === 'green';
};


const isRed = R.equals('red');
const isGreen = R.equals('green');
const isBlue = R.equals('blue');
const isWhite = R.equals('white');
const isOrange = R.equals('orange');

const getLength = (obj) => obj.length;

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (shapes) => {
    return R.compose(getLength, R.filter(isGreen), R.values)(shapes) > 1;
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (shapes) => {
    return R.compose(getLength, R.filter(isRed), R.values)(shapes) === R.compose(getLength, R.filter(isBlue), R.values)(shapes);
};

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = (obj) => {
    return R.allPass([
        R.compose(isBlue, R.prop('circle')),
        R.compose(isRed, R.prop('star')),
        R.compose(isOrange, R.prop('square'))
    ])(obj);
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (obj) => {
    return R.compose(getLength, R.filter(isWhite) ,R.values)(obj) < 2;
};

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = (obj) => {
    return R.allPass([
        R.compose(getLength, R.filter(isRed), R.values)(obj) > 0,
        R.compose(getLength, R.filter(isGreen), R.values)(obj) > 1,
        R.compose(isGreen, R.prop('triangle'))(obj)
    ]);
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (obj) => {
    return R.compose(getLength, R.filter(isOrange), R.values)(obj) === 4;
};

// 8. Не красная и не белая звезда.
export const validateFieldN8 = (obj) => {
    return !R.anyPass([
        R.compose(isRed, R.prop('star'))(obj),
        R.compose(isWhite, R.prop('star'))(obj)
    ]);
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = (obj) => {
    return R.compose(getLength, R.filter(isGreen), R.values)(obj) === 4;
};

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = (obj) => {
    const squareEqTriangle = obj => R.equals(R.prop('square',obj), R.prop('triangle',obj));
    const isNotWhite = obj => !isWhite(obj);
    return R.allPass([
        squareEqTriangle,
        R.compose(isNotWhite, R.prop('square'))
    ])(obj);
};
