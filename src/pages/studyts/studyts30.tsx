export {}

//*************************** */
// １、Template Literal Types
//*************************** */

//----------------------------------------------------
// 色の#を必須にするケース
//----------------------------------------------------
type Hex = `#${string}`;

//const red = "#ff0000"; //人によって#を消してしまう場合がある。これを防ぐためにTemplateLiteralTypesを使用する
const red:Hex = "#ff0000";

//----------------------------------------------------
// バージョンをv1.0.0というフォーマットにするケース
//----------------------------------------------------
type AppVersion = `v${number}.${number}.${number}`;
const appVersion: AppVersion = "v1.0.0";


//********************** */
// ２、Satisfies演算子
//********************** */

//プロパティは、red,blue,greenのみ。yellowを入れないケースを想定する
const colors = {
  red: "#ff0000",
  blue: "#000ff",
  green: [0, 255, 0],
  //yellow: "#ffff00",
};

//----------------------------------------------------
// 2-1、Mapped Typesを使う場合
//----------------------------------------------------
//type Hex = `#${string}`;
type Rgb = [number, number, number];

type Colors = {
  [color in "red" | "blue" | "green"]: Hex | Rgb;
};

const colors21:Colors = {
  red: "#ff0000",
  blue: "#000ff",
  green: [0, 255, 0],
  //yellow: "#ffff00",
};

//型推論の結果が消えているため、stringと解釈されmapが使えない
//colors21.green.map(v => v);

//----------------------------------------------------
// 2-2、Satisfies演算子を使う場合
//----------------------------------------------------
const colors22 = {
  red: "#ff0000",
  blue: "#000ff",
  green: [0, 255, 0],
  //yellow: "#ffff00",
} satisfies Colors;

//Hexかnumberか分からない状況だったが、numberと推論している
colors22.green.map(v => v);

//----------------------------------------------------
// 2-3、satisfiesあれば、型アノテーションいらない？？
//----------------------------------------------------
/*
ほぼほぼsatisfiesでよい。
しかし、型が推論できない場面では、satisfiesは使えずアノテーションしかできない
*/

//2-3-1、値が入っていない為できない(型アノテーションを使う)
//型アノテーション
let foo: string;
//foo = 1; errorとなる

//satisfies演算子
//let foo2 satisfies string; 

//2-3-2、jsonのanyに対してはsatisfiesを使えない(型アノテーションと、TypeGuardを使う)
const foo3 = async() => {
  const res = await fetch("");
  const json = await res.json();
};

/*
---------------------------------------------------------
 2-4、const assertionとsatisfies演算子を組み合わせて使う
(readonlyやwideningを防ぐことができる)
---------------------------------------------------------
*/
//readonlyにする
type Rgb24 = readonly [number, number, number];

type Colors24 = {
  [color in "red" | "blue" | "green"]: Hex | Rgb24;
};

const colors24 = {
  red: "#ff0000",
  blue: "#000ff",
  green: [0, 255, 0],
  //yellow: "#ffff00",
} as const satisfies Colors24;


//pathで考えてみる
type Path = {
  [key: string]: `/${string}`
};

const path = {
  index: "/",
  about: "/about",
  a: "/about",
  b: "/about",
  c: "/about",
} as const satisfies Path;


