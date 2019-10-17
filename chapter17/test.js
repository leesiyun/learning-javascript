//CHAPTER 17 정규표현식

//17.1 부분 문자열 검색과 대체
//정규식을 쓰지 않고 검색하고 교체하는 방법
//String.prototype

let input = 'As I was going to Saint Ives';
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

/* 17.3 정규식 검색

세　글자 이상인 단어에 모두 일치하고, 대소문자는 가리지 않는 정규식
*/
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

/*가장 많은 정보를 제공하는 것은 RegExp.prototype.exec 메서드지만, 현실적으로는 가장 적게 쓰인다.
String.prototype.match와 RegExp.prototype.test 자주 쓰이는 메서드


17.4 정규식을 사용한 문자열 교체
String.prototype.replace 메서드에도 정규식을 쓸 수 있다.
*/
console.log(input.replace(/\w{4,}/gi, '****')); //As I was **** to **** ****

//17.5 입력소비

//17.6 대체
//HTML 페이지를 문자열에 담았다고 가정할 때 이 문자열에서 외부 자원을 가리키는 태그 <a>,<area>,<link>,<script>,<source>,<meta>를 모두 찾고 싶은 경우, 이 문자열에는 태그의 대소문자가 통일 되지 않아 <Area>,<Link>같은 태그도 있음
//정규식에서는 대체(alternation)을 통해 이런 문제를 해결
let html =
  'HTML with <a href="/one">one link</a>, and some JavaScript.' +
  '<script src="stuff.js">';
let matches = html.match(/area|a|link|script|source/gi); //첫 시도
console.log(matches); //(8) ["a", "link", "a", "a", "a", "a", "Script", "script"]
//파이프(|) : 대체를 뜻하는 메타 문자, ig는 대소문자를 가리지 않고(i), 전체를(g) 검색이라는 뜻
//g 플래그가 없으면 일치하는 것 중 첫 번째만 반환함
//area, a 처럼 겹치는 것이 있을 경우 더 큰 것을 먼저 써야함 17.5 입력소비 참고

//17.7 HTML 찾기
html = '<br>[!CDATA[[<br>]]]]';
matches = html.match(/<br>/gi);
console.log(matches); //(2) ["<br>", "<br>"]
//정규식은 HTML처럼 매우 복잡한 것을 검색하기에는 알맞지 않음

//17.8 문자셋
//문자셋은 글자 하나를 다른 것으로 대체(alternation)하는 방법을 간단하게 줄인 것

const beer99 =
  '99 bottles of beer on the wall' +
  'take 1 down and pass it round --' +
  '98 bottles of beer on the wall.';

matches = beer99.match(/0|1|2|3|4|5|6|7|8|9/g);
console.log(matches); //(5) ["9", "9", "1", "9", "8"]

const m1 = beer99.match(/[0123456789]/g);
console.log(m1); //(5) ["9", "9", "1", "9", "8"]
const m2 = beer99.match(/[0-9]/g);
console.log(m2); //(5) ["9", "9", "1", "9", "8"]

//공백 빼고 전부 찾는 정규식
let match = beer99.match(/[\-0-9a-z.]/gi);
console.log(match); //(74) ["9", "9", "b", "o", "t", "t", "l", "e", "s", "o", "f", "b", "e", "e", "r", "o", "n", "t", "h", "e", "w", "a", "l", "l", "t", "a", "k", "e", "1", "d", "o", "w", "n", "a", "n", "d", "p", "a", "s", "s", "i", "t", "r", "o", "u", "n", "d", "-", "-", "9", "8", "b", "o", "t", "t", "l", "e", "s", "o", "f", "b", "e", "e", "r", "o", "n", "t", "h", "e", "w", "a", "l", "l", "."]
//순서는 중요하지 않음 /[.a-z0-9\-]/도 똑같은 값
//하이픈을 이스케이프 하지않으면 범위를 표시하는 메타문자로 간주하기 때문에 이스케이프 해야함

//캐럿(^)
match = beer99.match(/[^\-0-9az.]/);
console.log(match); //[" ", index: 2, input: "99 bottles of beer on the walltake 1 down and pass it round --98 bottles of beer on the wall.", groups: undefined]
//문자열에서 공백만 찾음

//17.9 자주 쓰는 문자셋
//매우 자주 쓰이는 일부 문자셋은 단축 표기가 따로 있음. 이들은 클래스라고 부르기도 함.

//\d = [0-9]
//\D = [^0-9]
//\s = [ \t\v\n\r] : 텝, 스페이스, 세로 탭, 줄바꿈이 포함됨
//\S = [^ \t\v\n\r]
//\w  = [a-zA-Z_]: 하이픈과 미침표는 포함되지 않으므로 문자셋으로 도메인 이름이나 CSS 클래스 등을 찾을 수는 없음
//\W = [^a-zA-Z_]

//공백문자셋 \s : 위 단축 표기중 가장 널리 쓰이임

const stuff = 'hight: 9\n' + 'medium: 5\n' + 'low: 2\n';
const levels = stuff.match(/:\s*[0-9]/g);
// * : 숫자는 상관없으며 없어도 된다
console.log(levels); //(3) [": 9", ": 5", ": 2"]

//전화번호를 데이터 베이스에 저장하기 전에 형식을 통일하는 편이 좋습니다. 사라들이 전화번호를 쓰는 형식은 전혀 통일되어 있지 않습니다. 하이픈을 쓰는 사람이 가장 많지만, 그 밖에도 마침표, 괄호 , 공백, 샵등 온갖기호를 사용합니다. 전화번호를 검색하거나 저장하는 목적이라면 10자리 숫자로 통일 되어 있는 편이 가장 좋을 겁니다. \D를 쓰면 아주 쉽습니다.

const messyPhone = '(505) 555-1515';
const neatPhone = messyPhone.replace(/\D/g, '');

console.log(neatPhone); //5055551515

//비슷한 예로, 필자는 required 필드(공백이 아닌 글자가 최소한 하나는 있어야 하는 필드)에 데이터가 있는지 검사할 때 종종 \S를 쓰곤 합니다.

const field = '  something   ';
const valid = /\S/.test(field);
console.log(valid); //true

//17.10 반복
//반복(repetition) 메타 문자는 얼마나 많이 일치해야 하는 지  지정할 때 씁니다.
// 앞에서 우리는 숫자 한 개를 찾는 예제를 봤었습니다. 그런데 숫자 여러 개를 찾아야 한다면 어떨까요? 이미 알고 있는 방법을 사용해서 다음과 같이 찾을 수 있습니다.

match = beer99.match(/[0-9][0-9][0-9]|[0-9][0-9]|[0-9]/);
console.log(match); //["99", index: 0, input: "99 bottles of beer on the walltake 1 down and pass it round --98 bottles of beer on the wall.", groups: undefined]
//이번에도, 두자리 숫자가 숫자를 소비해서 세 자리 숫자를 찾지 못하는 일이 없도록 세자리 숫자를 먼저 썼습니다. 이 정규식은 한 자리, 두 자리, 세 자리 숫자에는 잘 작동하지만 네 자리 숫자가 필요하다면 정규식을 또 고쳐야 합니다. 다행이 더 낳은 방법이 있습니다.

match = beer99.match(/[0-9]+/);
console.log(match); //["99", index: 0, input: "99 bottles of beer on the walltake 1 down and pass it round --98 bottles of beer on the wall.", groups: undefined]
//문자셋 다음의 +는 그 앞에 요소가 하나 이상 있어야 한다는 뜻입니다. 반복 메타 문자는 그 자체로는 아무 의미도 없습니다. 반복 메타 문자에는 다섯 가지 종류가 있습니다.

//{n} : 정확히 n개 ex) /d{5}/는 새 우편번호처럼 정확히 다섯 자리 숫자에만 일치합니다.
//{n,} : 최소한 n개 ex) /\d{5,}/는 다섯자리 이상의 숫자에만 일치합니다.
//{n, m} : n개 이상, m개 이하 ex) /\d{2, 5}/는 2개, 3개, 4개, 5개에 일치합니다.
//? : 0개 또는 1개, {0,1}와 동등합니다 ex) /[a-z]\d?/i는 글자가 있고 그 다음에 숫자가 없거나 한개 있는 경우에 일치합니다.
//* : 숫자와 상관없으며 없어도 됩니다 (클레이니(Klene)스타, 클레이니 클로저라고 부르기도 합니다). ex) /[a-z]\d*/i는 글자가 있고 그 다음에 숫자가 없거나 있는 경우에 일치합니다.
//+ : 하나 이상 ex) /[a-z]\d+/i는 글자가 있고 그 다음에 숫자가 한 개 이상 있는 경우에 일치합니다.

//17.11 마침표와 이스케이프
//정규식에서 마침표는 줄 바꿈 문자를 제외한 모든 문자에 일치하는 특수 문자 입니다.
//이 메타 문자는 입력이 어떤 문자이든 상관하지 않고 소비하려 할 때 주로 사용합니다.
//문자열에서 우편번호만 필요하고 다른 것은 아무것도 필요하지 않다고 칩시다.

input = 'Address: 333 Main St., Anywhere, NY, 55532. Phone: 555-555-2525.';
match = input.match(/\d{5}.*/);
console.log(match); //"55532. Phone: 555-555-2525.", index: 37, input: "Address: 333 Main St., Anywhere, NY, 55532. Phone: 555-555-2525.", groups: undefined]

//하지만 마침표 자체가 필요할 때도 있습니다. 예를 들어 도메인 이름이나 IP 주소에는 마침표가 들어갑니다. 그 밖에도 아스테리스크나 괄호처럼 정규식 메타 문자를 글자 그대로 찾아야 할 때가 있습니다. 정규식 특수 문자를 이스케이프해서 일반 문자로 사용하려면 그 앞에 역슬래시를 붙이면 됩니다.

const equation = '(2 + 3.5) * 7';
match = equation.match(/\(\d \+ \d\.\d\) \* \d/);
console.log(match);

//17.11.1 진정한 와일드카드
//마침표가 줄바꿈을 제외한 모든 문자에 일치한다면, 줄바꿈 문자를 포함해서 모든 문자에 일치하는 것은 어떻게 써야 할까요? 생각보다 더 자주 필요한 작업입니다. 방법은 다양하지만, 가장 널리 쓰이는 것은 [\s\S]입니다. 이것은 공백인 모든 문자에 일치하는 동시에, 공백이 아닌 모든 문자에 일치합니다.

//17.12 그룹
//그룹은 괄호로 만든다. 캡쳐하지 않는 그룹은 (?[subexpression]) 형태이고, 여기서 [subexpression]이 일치시키려 하는 패턴이다.

//도메인 이름 중 .com, .org. edu만 찾는 예제
const text = 'Visit oreilly.com today!';
match = text.match(/[a-z]+(?:\.com|\.org|\.edu)/i);

console.log(match); //["oreilly.com", index: 6, input: "Visit oreilly.com today!", groups: undefined]

//그룹에도 반복을 적용 할 수 있다. 일반적으로 반복은 반복 메타 문자의 바로 왼쪽에 있는 문자 하나에 적용되지만, 그룹을 사용하면 그룹 전체에 반복을 적용한다.

//http://, https://, //(프로토콜 독립적 URL)로 시작하는 URL을 찾는 예제
//그룹과 함께 0 또는 1개에 일치하는 메타문자 ?를 사용
html =
  '<link rel="stylesheet" href="http://insecure.com/stuff.css">\n' +
  '<link rel="stylesheet" href="https://secure.com/securesstuff.css">\n' +
  '<link rel="stylesheet" href="//anything.com/flexible.css">';

matches = html.match(/(?:https?)?\/\/[a-z][a-z0-9-]+[a-z0-9]+/gi);
console.log(matches); //(3) ["//insecure", "//secure", "//anything"]

/*
17.13 소극적 일치, 적극적 일치
정규식은 기본적으로 적극적이다. 
검색을 멈추기 전에 일치하는 것을 최대한 많이 찾으려고 한다는 뜻이다.

HTML 텍스트에서 <i> 태그를 <strong> 태그로 바꾸는 예제
*/

input =
  'Regex pro know the difference between\n' +
  '<i>greedy</i> and <i>lazy</i> matching.';
console.log(input.replace(/<i>(.*)<\/i>/gi, '<strong>$1</strong>'));
//Regex pro know the difference between <strong>greedy</i> and <i>lazy</strong> matching.
//교체 문자열에 있는 $1는 .* 그룹에 일치하는 문자열로 바뀐다.

//반복 메타문자 *를 소극적으로 바꾸는 방법 *뒤에 ?를 붙이면 소극적으로 검색한다.
console.log(input.replace(/<i>(.*?)<\/i>/gi, '<strong>$1</strong>'));
//Regex pro know the difference between <strong>greedy</strong> and <strong>lazy</strong> matching.

/* 
반복 메타문자 *, +, ?, {n}, {n,}, {n,m} 뒤에는 모두 물음표를 붙일 수 있지만 보통 *, + 외에는 물음표를 붙이지 않는다.


17.14 역참조
그룹을 사용하면 역참조(backreference)라는 테크닉도 쓸 수 있다.

XYYX 형태의 밴드이름을 찾고 싶다고 한다면. PJJP, GOOG, ANNA 등이 해당된다. 
역참조를 이런 경우에 유용하게 쓸 수 있다.
서브그룹을 포함해, 정규식의 각 그룹은 숫자를 할당 받는다.
숫자는 맨 왼쪽이 1번에서 시작해 오른쪽으로 갈 수록 1씩 늘어난다. 역슬래시 뒤에 숫자를 써서 이 그룹을 참조 할 수 있다.
즉 \1은 맨 처음 일치한 그룹이다.
*/

const promo = 'Opening for XAAX is the dynamic GOOG! At the box office now!';
const bands = promo.match(/([A-Z])([A-Z])\2\1/g);
console.log(bands); //(2) ["XAAX", "GOOG"]

/*
이 정규식을 왼쪽에서 오른쪽으로 읽으면 그룹이 두 개 있고 그 다음에 \2\1이 있다.
첫 번째 그룹이 X에 일치하고 두 번째 그룹이 A에 일치한다면 \2는 A이고 \1은 X이다.

특이한 퍼즐을 풀 때를 제외하면, 보통 실무에서 역참조를 사용하는 것은 따옴표의 짝을 맞출 때 뿐이다.

HTML에서는 태그의 속성 값에 큰 따옴표나 작은 따옴표를 써야한다. 역참조를 이용하면 쉽게 찾을 수 있다.


작은 따옴표와 큰따옴표를 모두 썻으므로 백틱으로 문자열 경계를 나타냈다
 */

html = `<img alt = 'A "simple" example.'>` + `<img alt = "Don't abuse it!">`;
matches = html.match(/<img alt = (['"]).*?/g);
console.log(matches); //(2) ["<img alt = '", "<img alt = ""]

/*
이 예제는 좀 지나치게 단순화 한 것으로 다른 속성이 alt 속성보다 앞에 있거나, alt 앞에 공백이 두개 이상이라면 이 정규식으로는 아무 것도 찾지 못한다.

밴드 이름 예제와 마찬가지로, 첫 번째 그룹은 따옴표 뒤에 0개 이상의 문자를 찾는다.(물음표를 썼으므로 소극적으로 일치해, 두 번째<img>까지 진행하는 일은 없다.)
그 다음에 있는 \1는 앞에서 찾은 따옴표의 짝이다.

* 다음의 물음표를 지우고 적극적으로 일치하게 만들 경우
*/

matches = html.match(/<img alt = (['"]).*/g);
console.log(matches); //["<img alt = 'A "simple" example.'><img alt = "Don't abuse it!">"]

/*
17.15 그룹 교체


그룹을 사용하면 문자열 교체도 더 다양한 방법으로 할 수 있다.


HTML <a>태그에서 href가 아닌 속성을 전부 제거한다고 가정하는 경우
*/

html = '<a class="nope" href="/yep">Yep</a>';
html = html.replace(/<a .*?(href=".*?").*?>/, '<a $1>');
console.log(html); //<a href="/yep">Yep</a>

/*
역참조와 마찬가지로 모든 그룹은 1로 시작하는 숫자를 할당 받는다.
정규식에서 첫 번째 그룹은 \1이고, 교체할 문자열에서는 $1이 첫 번째 그룹에 해당한다.
이번에도 소극적 일치를 써서 다른 <a> 태그까지 검색이 확장되는 일을 막았다.
이 정규식은 href 속성의 값에 큰 따옴표가 아닌 작은 따옴표를 쓴 문자열에서는 아무것도 찾지 못한다.


class 속성과 href 속성을 남기고 나머지는 모두 없애는 경우
*/

html = '<a class="yep" href="/yep" id="nope">Yep</a>';
html = html.replace(/<a .*?(class=".*?").*?(href=".*?").*?>/, '<a $2 $1>');
console.log(html); //<a href="/yep" class="yep">Yep</a>

/*
class와 href의 순서를 바꾸므로 결과 문자열에서는 href가 앞에 온다.
이 정규식은 class 뒤에 href가 있어야만 동작하고, 앞에서와 마찬가지로 속성 값에 작은 따옴표를 쓰면 동작하지 않는다. 


$1, $2 등 숫자로 참조하는 것 외에도 일치하는 것 앞에 있는 전부를 참조하는 $`, 일치하는 것 자체인 $&, 일치하는 것 뒤에 있는 전부를 참조하는 $'도 있다.
달러 기호 자체가 필요할 때는 $$를 쓴다.
 */

input = 'One two three';
console.log(input.replace(/two/, '($`)')); //One (One ) three
console.log(input.replace(/two/, '($&)')); //One (two) three
console.log(input.replace(/two/, "($')")); //One ( three) three
console.log(input.replace(/two/, '($$)')); //One ($) three


/*
17.16 함수를 이용한 교체
함수를 이용하면 어주 복잡한 정규식을 좀 더 단순한 정규식으로 분할 할 수 있다.

<a> 태그를 정확한 규격에 맞도록 바꾸는 프로그램
*/

html = `<a class="foo" href="/foo" id="foo">Foo</a>\n` +
`<A href='/bar' Class="bar">Bar</a>\n` +
`<a href="/baz">Baz</a>\n` +
`<a onclick="javascript:alert('qux!')" href="/qux"Qux></a>`;

/*
<a> 태그를 인식하는 정규식, 그리고 <a>태그의 속성 중에서 필요한 것만 남기는 정규식
*/

const sanitizeATag = (aTag) => {
  //태그에서 원하는 부분을 뽑아낸다.
  const parts = aTag.match(/<a\s+(.*?)>(.*?)<\/a>/i);
  //parts[1]은 여는 <a> 태그에 들어있는 속성이다.
  //parts[2]는 <a>와 </a>사이에 있는 텍스트이다.
  const attributes = parts[1]
  //속성을 분해한다.
  .split(/\s+/);
  return '<a' + attributes
    //class, id, href 속성만 필요함
    .filter(attr => /^(?:class|id|href)[\s=]/i.test(attr))
    //스페이스 한 칸으로 구분해서 합친다.
    .join(' ')
    //여는 <a> 태그를 완성한다.
    + '>'
    //텍스트를 추가
    + parts[2]
    //마지막으로 태그를 닫는다.
    +'</a>';
};
