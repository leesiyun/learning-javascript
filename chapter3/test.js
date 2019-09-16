/* CHAPTER3 리터럴과 변수, 상수, 데이터 타입 */
/* 3.1 변수와 상수 */
//섭씨온도
let currentTempC = 22;

currentTempC = 22.5;

// let targetTempC = undefined;와 같습니다.
let targetTempC;

let targetTempC,
  room1 = "conference_room_a",
  room2 = "lobby";

const ROOM_TEMP_C = 21.5,
  MAX_TEMP_C = 30;

/* 3.4 리터럴 */
// "conference_room_a"(따옴표 안)은 리터럴 입니다.
let room1 = "conference_room_a";

// 이제 currentRoom의 값은
//room1의 값 (" conference_room_a")과 같습니다.
let currentRoom = room1;

// 에러가 일어납니다.
// conference_room_a란 식별자는 존재하지 않습니다.
currentRoom = conference_room_a;

/* 3.5 원시 타입과 객체 */
let str = "hello";
str = "world";

/* 3.6 숫자 */
// 숫자 리터럴. count는 더블입니다.
let count = 10;

// 16진수. 16진수 ff는 10진수 255와 같습니다.
const blue = 0x0000ff;

// 8진수. 8진수 22는 십진수 18과 같습니다.
const umask = 0o0022;

//십진수
const roomTemp = 21.5;

// 지수 (3.0 x 10^6 = 3,000,000)
const c = 3.0e6;

// 지수 (-1.6 x 10^-19 = 0.00000000000000000016)
const e = -1.6e-19;

const inf = Infinity;

const ninf = -Infinity;

//"숫자가 아님"
const nan = NaN;

// 1에 더했을 떄 1과 구분되는 결과를 만들 수 있는
// 가장 작은 값입니다. 근사치는 2.2e-16입니다.
const small = Number.EPSILON;

// 표현할 수 있는 가장 큰 정수
const bigInt = Number.MAX_SAFE_INTEGER;

// 표현할 수 있는 가장 큰 숫자
const max = Number.MAX_VALUE;

// 표현할 수 있는 가장 작은 정수
const minInt = Number.MIN_SAFE_INTEGER;

// 표현할 수 있는 가장 작은 숫자
const min = Number.MIN_VALUE;

// -Infinity
const nInf = Number.NEGATIVE_INFINITY;

// NaN
const nan = Number.NaN;

// Infinity
const inf = Number.POSITIVE_INFINITY;

/* 3.7.1 이스케이프*/
const dialog =
  'Sam looked up, and said "hello, old friend!", as Max walked in.';
const imperative = "Don't do that!";

//에러가 일어납니다.
//const dialog = "Sam looked up and said "don't do that!" to Max.";

const dialog1 = "He looked up and said \"don't do that!\" to Max.";
const dialog2 = 'He looked up and said "don\'t do that!" to Max.';

const s = "In JavaScript, use \\ as an escape character in strings.";

/* 3.8.1 템플릿 문자열 */
let currentTemp = 19.6;
// 00b0는 온도를 나타내는 유니코드 코드 포인트 입니다.
// const message = "The current temperature is " + currentTemp + "\u00b0C";

const message = `The current Temperature is ${currentTemp}\u00b0C`;

/* 3.8.2 여러 줄 문자열 */
const multiline = "line1\
line2";

const multiline = "line1\n\
line2";

const multiline = `line1
line2`;

const multiline = `line1
line2
line3`;

const multiline = "line1\n" +
"line2\n" +
"line3";

const multiline = 'Current temperature:\n' +
`\t${currentTemp}\u00b0C\n` +
"Don't worry...the heat is on!"; 

/* 3.8.3 숫자와 문자열 */
//3이 문자열로 바뀝니다. 결과는 문자열 '330'입니다.
const result1 = 3 + '30';
//'30'이 숫자로 바뀝니다. 결과는 숫자 90입니다.
const result = 3 * '30';

/* 3.9 불리언 */
let heating = true;
let cooling = false;

/* 3.10 심볼 */
const RED = Symbol("The color of a sunset!");
const ORANGE = Symbol("The color of a sunset!");
RED === ORANGE //false: 심볼은 모두 서로 다릅니다.