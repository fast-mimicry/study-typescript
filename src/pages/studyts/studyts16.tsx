export {};

//Type Guard(型を絞り込む)

/********************************* */
//１、typeof を利用したType Guard
/********************************* */

//プリミティブ型
const foo = (value: string | number | boolean) => {
    if (typeof value === "string") {
        return value;                   //stringで絞り込まれている
    }
    if (typeof value === "boolean") {
        return value;                   //booleanで絞り込まれている
    }
    return value;                       //numberで絞り込まれる
};

//配列
const foo2 = (value: string | string[]) => {
    if (Array.isArray(value)) {
        return value;                   //配列を返す
    }
    return value;                       //stringを返す
};

//オプショナル
const optionalFoo = (value?: string) => {
    if (!value) {
        //return value;                  //undefined、、またはstring(空文字)を返す
        return null;                     //nullを返す
    }
    return value;                       //stringを返す
};

/*********************************** */
// ２、in演算子 を利用したType Guard
/*********************************** */

type UserA = { name: string };
type UserB = { name: string; nickName: string };

const foo3 = (value: UserA | UserB) => {
    if ("nickName" in value) {
        return value;                   //UserBを返す
    }
    return value;                       //UserAを返す
};

/******************************************************************* */
// ３、タグ付きUnion Types(Discriminated Union,Tagged Union)  を利用したType Guard
/******************************************************************* */
//実践ではかなり利用されている

type UserA2 = { name: string; lang: "ja" };
type UserB2 = { name: string; lang: "en" };
type UserC2 = { name: string; lang: "fr" };

const foo4 = (value: UserA2 | UserB2 | UserC2) => {
    if (value.lang === "ja") {
        return value;                   //UserA2を返す
    }
    if (value.lang === "en") {
        return value;                   //UserB2を返す
    }
    return value;                       //UserC2を返す
};

//switchで書き換え
const foo5 = (value: UserA2 | UserB2 | UserC2) => {
    switch(value.lang){
        case "ja": {
            return value;
        }
        case "en": {
            return value;
        }
        case "fr": {
            return value;               //UserC2を返す
        }
        default: 
            throw Error("lang is not defined!");    //到達しないコードである為エラーを返すようにする
            return value;               //neverを返す
    }
};
