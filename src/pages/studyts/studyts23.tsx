export {};

//Utility Types(続き)

//-----------------------------------------------------------------
//例１、Extract(第1引数、第2引数を比較し、互換性のある型だけで型を作成)
//
// 【注意】TypeScript4.9.5時点でextendsの推論に不具合がある可能性あり
// memo：
// ・111でnumberを抽出できない、"111"でstringを抽出できない
// ・falseでboolean抽出ok
//-----------------------------------------------------------------
type Foo = Extract<string | number, string>;            // string
type Foo12 = Extract<"hello" | number, string>;         // "hello"(string LiteralTypes型)
type Foo13 = Extract<"hello" | 0, boolean>;             // never型
type Foo14 = Extract<"hello" | number | 111, 111>;      // never???????
type Foo14_1 = Extract<"hello" | number | 111, number | 111>;    // number
type Foo14_2 = Extract<111 | number,  111>;    // never
type Foo14_21 = Extract<number,  111>;       // never
type Foo14_22 = Extract<boolean,  false>;    // false
type Foo14_3 = Extract<111 | 0,  111>;    // 111
type Foo14_4 = Extract<123 | 0,  111>;    // never
type Foo14_5 = Extract<string,  "111">;    // never

//-----------------------------------------------------------------
// (Extractの逆)
//例２、Exclude(第1引数、第2引数を比較し、互換性のある型を除いて型を作成)
//
// memo：
// ・111でnumberを除外NG、"111"でstringを除外NG
// ・falseでboolean除外可能
//-----------------------------------------------------------------
type Foo2 = Exclude<string | number, string>;     //number
type Foo22 = Exclude<"hello" | number, string>;   //number
type Foo23 = Exclude<"hello" | number, 111>;      //number | "hello" (111で抽象度の高いnumberは除外できない)
type Foo23_1 = Exclude<"hello" | 111, number>;    //"hello"          (numberで具象度の高い111は除外できる)
type Foo23_2 = Exclude<"hello" | 0 | 111, 111>;   //0 | "hello"          (111で111を除外する)
type Foo24 = Exclude<"hello" | 0, boolean>;       //0 | "hello"

type Foo25 = Exclude<"aa" | 0 | number | false, string | number>;   //false
type Foo26 = Exclude<"aa" | 0 | 111, number>;                       //"aa "
type Foo26_2 = Exclude<number | 1 | 111, 111>;
type Foo26_3 = Exclude<number | string | "111" | "112", "111">;
type Foo26_4 = Exclude<boolean | string | true | false, false>;

//Literal Types
type Foo27 = Extract<keyof Record<`${`Foo${"" | "2"}`}${2 | 3 | 4}`, string>, `Foo${string}`>;


//--------------------------------
// templateLiteralを利用した応用
//--------------------------------
//val1 | val2 | value1 | value2 のUnionTypes型を作成する
type PropertyNames = `${`val${'' | 'ue'}`}${1 | 2}`

//UnionTypesの各値をプロパティ名とした型で抽出する
type Properties = Record<PropertyNames, string>

//value1 | value2 のプロパティに対し、String LiteralTypes(value1、value2)で抽出
type TargetPropertyNames = Extract<keyof Properties, `value${string}`>

//-----------------------------------------------------------------
// 例３、NonNullable
//-----------------------------------------------------------------
type Foo3 = NonNullable<string | null | undefined>; //string

//-----------------------------------------------------------------
// 例４、Record<key, value>
//-----------------------------------------------------------------
type Foo4 = Record<string, number>; 
const foo41: Foo4 = {
    hoge: 1,
    fuga: 2,
}; 

type Foo42 =  Record<"hoge" | "fuga", 1 | 2>;
const foo42: Foo42 = {
    hoge: 1,
    fuga: 2,

    //fuga: 3,  // error (1,2のいずれかのみ有効)
    //aaa: 2,   // error プロパティ名は"hoge" "fuga"のいずれか
};

//-----------------------------------------------------------------
// 例５、Parameters<>
//-----------------------------------------------------------------
const foo5 = (a: string, b:number[], c: boolean) => {
    return;
};

type Foo5 = Parameters<typeof foo5>;

//-----------------------------------------------------------------
// 例６、Uppercase<>、Lowercase<>、Capitalize<>
//-----------------------------------------------------------------
type Foo6 = Uppercase<"hello">;         //"HELLO"
type Foo61 = Lowercase<"HELLO">;        //"hello"
type Foo62 = Capitalize<"hello">;       //"Hello"(先頭1文字が大文字化)
type Foo63 = Uncapitalize<"Hello">;     //"hello"(先頭1文字が小文字化)


/*
 外部パッケージのUtilityTypesについて

 UtilityTypesを提供している外部パッケージがある
 ・type-fest        //(star数や更新頻度からこちらがおすすめ)
 ・ts-essentials    //(古い、更新が止まっている)

  インストール方法：
    yarn add type-fest
*/
//-----------------------------------------------------------------
// 例７、type-festのUtilityTypes
//-----------------------------------------------------------------

//通常
type User7 = {
    name: string;
    age: number | null;
    country?: "US" | "UK" | "JP";
};
type PartialUser = Partial<User7>;

const user7: PartialUser = {
    name: "たろ",
    country: "JP",
};

//(課題)ネストされたプロパティにUtilityTypesを適用できない
type User72 = {
    name: string;
    age: number | null;
    address: {
        country: "US" | "UK" | "JP";
    };
};
type PartialUser72 = Partial<User72>;

const user72: PartialUser72 = {
    name: "たろう",
    age: 20,
    //address:{}  //ネストされたプロパティcountryにoptionalは付与されていない
};

//-------------------------------------
//type-festのPartialDeep
//-------------------------------------
import { PartialDeep } from "type-fest";
type PartialDeep73 = PartialDeep<User72>;

const user73: PartialDeep73 = {
    name: "たろう",
    age: 20,
    address: {}, //エラーにならない
};

