export {};

//ダウンキャスト、アップキャスト

/********************************** */
//１、
// ダウンキャスト -> 型の詳細度を上げる
// アップキャスト -> 型を抽象化する
/********************************** */
//デフォルトの型推論を確認する
const color = "red";    //１、string LiteralTypesで型定義

const theme = {
    color: "red",       //２、string型で推論される
};

//************************************ */
//型推論の挙動について
//************************************ */
//TypeScriptは、JavaScriptの仕様に基づいて作られている。

//例、オブジェクトの場合、constであっても再代入できてしまう(JSの挙動としては正解)
theme.color = "blue";   
theme.color = "yellow";   

//オブジェクト定義時には、プロパティがLiteralTYpesで宣言されることがないようになっている。
//オブジェクト内プロパティに対して、推論がstringではなく"red"で行われ、後から変更できてしまうと不都合が生ずる。
//TypeScriptはJSの互換性を重視している -> プログラマの意図しない挙動になることがある

//オブジェクト内プロパティをLiteralTypesでオーバーライドすることができる

//************************************ */
//２、ダウンキャスト(型の詳細度を上げる)
//************************************ */
const theme_d = {
    color: "red" as "red",           //Literal Typesとなる
    //color: "red" as number,        //--stringに互換性がないものはエラー
    //color: "red" as boolean,       //--stringに互換性がないものはエラー

    backgroundColor: "red" as const,  //const assertionとなる
};

//theme_d.color = "blue";       //(error)string LiteralTypesである為代入できない


//2-1、一括でダウンキャストを行う場合
const theme_d2 = {
    color: "blue",
    backgroundColor: "blue",
} as const;

/********************************************************************** */
//  (補足)
//    as const(constアサーション) を行うと、wideningを抑止することもできる
/********************************************************************** */
//例１
//widening
const color2 = "red";
let x = color2;         //widening

//const assertionを利用
const color3 = "red" as const;
//let x = color3;       //(error)

//例２
function foo () {
    return { foo: "foo" }
}
const y = foo();        //widening

function foo3 () {
    return { foo: "foo"} as const
}

//アロー演算子を利用する場合は下記となるかも
//const foo2 = () => {return {foo: "foo"} as const} ;


//例３、ファイルパスなどを定数として持ちたいときなどにconstアサーションは利用される
const PATH = {
    INDEX: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
} as const;

//PATH.INDEX = "../../aaaa"   //constアサーションがないと書き換え可能になってしまう。

//************************************ */
//３、アップキャスト(型の抽象度を上げる)
//************************************ */
//TypeScript開発においてバグを生みやすいため、使うべきではない
//用途としては、型を自分の力で解決できないときに利用する
//as anyなどで利用する


//--------------------------------------------------------
//例、non-null assertion(!を付ける)
//--------------------------------------------------------
//あまり使うべきではない。

// function getFirstLetter(str?: string) {
//     return str.charAt(0);            //strはundefinedの可能性があり、エラーが表示されている
// }

//usage1
function getFirstLetter(str?: string) {
    return str!.charAt(0);              //エラーにならないが、実行時undefinedが入るとエラーになる
}

//usage2、型ガードを追加してみる
function getFirstLetter_usage2(str?: string) {
    if (!str) {
        return
    }
    return str!.charAt(0);              //実行時undefinedが入るとエラーになるが、undefinedは回避。""
}

//--------------------------------------------------------
//例、double assertion (unknownにしてから別の型に変換する)
//--------------------------------------------------------
//用途として、外部のパッケージが誤っている場合に使える。あまり使うべきではない。
function getFirstLetter_usage3(str?: number) {
    return (str as unknown as string).charAt(0);    //numberをstringに出来ないが、一度unknownにするとstringにできる
}
