export {};

//Conditional Types

/*
条件付きで動的に新しい型を生成できる機能

すごく難しい
ライブラリを作る側の知識(分からなくてもいい部分。仮に将来的に必要となった際に思い出す感じでok)
*/

type Props = {
    id: string;
    name: string;
    age: number;
};

//---------------------------------------
// 1、ConditionalTypes
//---------------------------------------
/*
  例１
  1_MappedTypes + 2_LookupTypes + 3_ConditionalTypes + 4_LookupTypes

 ・1, [K in keyof T] :Propsからプロパティを取得
       K: id, name, age
       keyof T: Propsのプロパティ(id, name, age)
 ・2, T[K]: props.プロパティのvalueを取得
 ・3, extends string ? : stringの互換性を満たすものはあるか？ > id, nameが満たす、それ以外はnever
 ・4, {}[keyof T]: (string | never)で制約後のオブジェクトからvalueを取得
*/
type FilterString<T> = {
    [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

type StringKeys = FilterString<Props>;

//例1-2、TypeFilterに引数を追加し、型を指定できるようにする
type TypeFilter<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

type NumberKeys = TypeFilter<Props, number>;
type BooleanKeys = TypeFilter<Props, boolean>;


//---------------------------------------
// 2、infer
//---------------------------------------
//部分的な型抽出のこと

//例2、関数fooの「返り値の型」を抽出する
const foo = () => {
    return "";
};
const foo2 = () => {
    return 0;
};

/*
  (() => infer U): 関数の戻り値の型を取得
*/
type Return<T> = T extends (() => infer U) ? U : never;

//返り値の型stringを取得
type ReturnType = Return<typeof foo>;
type ReturnType11 = Return<typeof foo2>;

//例2-2、関数fooの「引数の型」を抽出する
const foo22 = (id: string) => {
    return 0;
};

type Return22<T> = T extends ((id: infer U) => any) ? U : never;      //引数の型を取得
type Return22_1<T> = T extends ((id: infer U) => any) ? U : never;    //引数の型を取得する。(但し、戻り値はnumberに限定する)
type ReturnType22 = Return22<typeof foo22>;

//例2-3、関数foo(引数が複数)の戻り値の型を抽出する
const foo23 = (id: string, name: string) => {
    return 0;
};

type Return23<T> = T extends (...args: any) => infer U ? U : never;
type ReturnType23 = Return23<typeof foo23>;

//例2-4、関数の第１引数の型を抽出する
const foo24_1 = (id:string, age:number) => {
    return 0;
}
type Return24_1<T> = T extends (...args:[infer U, ...any[]]) => any ? U : never;         //第１引数の型を抽出
type Return24_2<T> = T extends (...args:[any, infer U, ...any[]]) => any ? U : never;    //第２引数の型を抽出
type getFirstArgs = Return24_1<typeof foo24_1>;
type getSecondArgs = Return24_2<typeof foo24_1>;


