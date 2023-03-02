
//Generics型引数が複数あるパターン、LookupTypesについて

//----------------------------------
//  Genericsの型引数が複数あるパターン
//----------------------------------
//例1-1、使用法
const foo = <T extends string, K extends number, U>(foo: T, bar: K, baz: U) => {
    return {};
};

//----------------------------------
// LookupTypes
//----------------------------------
//例1-2、LookupTypes
type Obj = {
    a: string;
    b: boolean;
};

type Foo = Obj["a"];    //LookupTypesを利用。Obj.aの型(string)を利用できる

//-------------------------------------------------------
// GenericsとLookupTypesでgetProperty関数を作成する
//-------------------------------------------------------
//例1-3、getter関数を作成
const getProperty = <T, K extends keyof T>(obj: T, key: K) => {
    return obj[key];    //第1引数でobjを取得、第2引数でobj.keyの型を取得し、LookupTypesとして(obj[key])を返す
};

const obj = {
    foo: "1",
    bar: 2,
    baz: 3,
};

//指定したオブジェクトのプロパティの型を取得
getProperty(obj, "baz");    //obj, obj.プロパティの型を定義しているため、intelisenseでプロパティが表示される

const hoge = getProperty(obj, "foo");

//----------------------------------
//setPropertyを作成する
//----------------------------------
//例1-4、setter関数を作成
const setProperty = <T, K extends keyof T>(obj: T, key: K, value: T[K]) => {
    obj[key] = value;
};

//voオブジェクト
const vo = {
    name: "たろう",
    weight: 60,
    isArrivedAt: true,
}

setProperty(vo, "weight", 65);          //体重を変更
setProperty(vo, "isArrivedAt", true);   //出社区分を変更

//----------------------------------
// Genericsの使用例
//----------------------------------
//良く利用されるメソッドもGenericsが使われている

/*
例2、map関数
  暗黙的な型解決でうまく推論してくれる(コードジャンプで参照すると、map<U>を確認できる)
*/
const foo2 = [1, 2, 3].map(v => v);             //numberで返却(map<>を省略しても、暗黙的に推論してくれる)
const foo21 = [1, 2, 3].map(v => v.toString);   //stringで返却
const foo22 = [1, 2, 3].map<number>(v => v);   //numberで返却

/*
例2-1、外部パッケージで使われているGenericsについて
　慣れるまではググった方が良い可能性がある。コードジャンプしても追うことは難しい。
*/
import type { NextPage } from "next";
const Home: NextPage = () => {
    return null;
};
