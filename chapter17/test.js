//CHAPTER 17 정규표현식

//17.1 부분 문자열 검색과 대체
//정규식을 쓰지 않고 검색하고 교체하는 방법
//String.prototype

const input = 'As I was going to Saint Ives';
console.log(input.startsWith('As')); //true
console.log(input.endsWith('Ives')); //true
console.log(input.startsWith('going', 9)); //true --인덱스 9에서 시작
console.log(input.endsWith('going', 14)); //true -- 인덱스 14를 문자열의 끝으로 간주
console.log(input.includes('going')); //true
console.log(input.includes('going', 10)); //false
console.log(input.indexOf('going')); //9
console.log(input.indexOf('going', 10)); //-1
console.log(input.indexOf('nope')); //-1

//이들 메서드는 모두 대소문자를 구분 대소문자를 구분하지 않고 비교하려면 소문자로 바꿔서 비교
console.log(input.startsWith('as')); //false

//toLowerCase()
console.log(input.toLowerCase().startsWith('as')); //true
//String.prototype.toLowerCase 원래 문자열은 그대루 두고 새 문자열을 반환

//String.prototype.replace 부분 문자열을 찾아 교체
console.log(input.replace('going', 'walking')); //As I was walking to Saint Ives

//17.2 정규식 만들기
//자바스크립트의 정규식은 RegExp 클래스

const re1 = /going/; //단어 'going'을 찾을 수 있는 정규식
const re2 = new RegExp('going'); //생성자를 사용했지만 결과는 같음

//17.3 정규식 검색

//세　글자 이상인 단어에 모두 일치하고, 대소문자는 가리지 않는 정규식
const re = /\w{3,}/gi;

//문자열(input)의 메서드를 사용할 때
console.log(input.match(re)); //(4) ["was", "going", "Saint", "Ives"]
console.log(input.search(re)); //5(세 글자 이상으로 이루어진 첫 단어의 인덱스는 5)

//정규식(re)의 메서드를 사용할 때
console.log(re.exec(input)); //["was", index: 5, input: "As I was going to Saint Ives", groups: undefined] (처음 일치 하는 것)
console.log(re.exec(input)); //["going", index: 9, input: "As I was going to Saint Ives", groups: undefined] (exec는 마지막 위치를 '기억'합니다.)
console.log(re.exec(input)); //["Saint", index: 18, input: "As I was going to Saint Ives", groups: undefined]
console.log(re.exec(input)); //["Ives", index: 24, input: "As I was going to Saint Ives", groups: undefined]
console.log(re.exec(input)); //null --일치하는 것이 더는 없습니다.
console.log(re.test(input)); //true (input에는 세 글자 이상으로 이루어진 단어가 한개 이상 있습니다.)

//위 예제는 모두 정규식 리터럴을 그대로 써도 됩니다.
console.log(input.match(/\w{3,}/gi)); //(4) ["was", "going", "Saint", "Ives"]
console.log(input.search(/\w{3,}/gi)); //5
console.log(/\w{3,}/gi.test(input)); //true
console.log(/\w{3,}/gi.exec(input)); //["was", index: 5, input: "As I was going to Saint Ives", groups: undefined]

//가장 많은 정보를 제공하는 것은 RegExp.prototype.exec 메서드지만, 현실적으로는 가장 적게 쓰임
//String.prototype.match와 RegExp.prototype.test 자주 쓰이는 메서드

//17.4 정규식을 사용한 문자열 교체
//String.prototype.replace 메서드에도 정규식을 쓸수 있음
console.log(input.replace(/\w{4,}/gi, '****')); //As I was **** to **** ****

//17.5 입력소비

//17.6 대체
//HTML 페이지를 문자열에 담았다고 가정할 때 이 문자열에서 외부 자원을 가리키는 태그 <a>,<area>,<link>,<script>,<source>,<meta>를 모두 찾고 싶은 경우, 이 문자열에는 태그의 대소문자가 통일 되지 않아 <Area>,<Link>같은 태그도 있음
//정규식에서는 대체(alternation)을 통해 이런 문제를 해결
const html =
  'HTML with <a href="/one">one link</a>, and some JavaScript.' +
  '<script src="stuff.js">';
const matches = html.match(/area|a|link|script|source/gi); //첫 시도
console.log(matches); //(8) ["a", "link", "a", "a", "a", "a", "Script", "script"]
//파이프(|) : 대체를 뜻하는 메타 문자, ig는 대소문자를 가리지 않고(i), 전체를(g) 검색이라는 뜻
//g 플래그가 없으면 일치하는 것 중 첫 번째만 반환함
//area, a 처럼 겹치는 것이 있을 경우 더 큰 것을 먼저 써야함 17.5 입력소비 참고

//17.7 HTML 찾기
const html1 = '<br>[!CDATA[[<br>]]]]';
const matches1 = html1.match(/<br>/gi);
console.log(matches1); //(2) ["<br>", "<br>"]
//정규식은 HTML처럼 매우 복잡한 것을 검색하기에는 알맞지 않음

//17.8 문자셋
//문자셋은 글자 하나를 다른 것으로 대체(alternation)하는 방법을 간단하게 줄인 것

const beer99 =
  '99 bottles of beer on the wall' +
  'take 1 down and pass it round --' +
  '98 bottles of beer on the wall.';

const matches2 = beer99.match(/0|1|2|3|4|5|6|7|8|9/g);
console.log(matches2); //(5) ["9", "9", "1", "9", "8"]

const m1 = beer99.match(/[0123456789]/g);
console.log(m1); //(5) ["9", "9", "1", "9", "8"]
const m2 = beer99.match(/[0-9]/g);
console.log(m2); //(5) ["9", "9", "1", "9", "8"]

//공백 빼고 전부 찾는 정규식
const match = beer99.match(/[\-0-9a-z.]/gi);
console.log(match); //(74) ["9", "9", "b", "o", "t", "t", "l", "e", "s", "o", "f", "b", "e", "e", "r", "o", "n", "t", "h", "e", "w", "a", "l", "l", "t", "a", "k", "e", "1", "d", "o", "w", "n", "a", "n", "d", "p", "a", "s", "s", "i", "t", "r", "o", "u", "n", "d", "-", "-", "9", "8", "b", "o", "t", "t", "l", "e", "s", "o", "f", "b", "e", "e", "r", "o", "n", "t", "h", "e", "w", "a", "l", "l", "."]
//순서는 중요하지 않음 /[.a-z0-9\-]/도 똑같은 값
//하이픈을 이스케이프 하지않으면 범위를 표시하는 메타문자로 간주하기 때문에 이스케이프 해야함

//캐럿(^)
const match1 = beer99.match(/[^\-0-9az.]/);
console.log(match1); //[" ", index: 2, input: "99 bottles of beer on the walltake 1 down and pass it round --98 bottles of beer on the wall.", groups: undefined]
//문자열에서 공백만 찾음
