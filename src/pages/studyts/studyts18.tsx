export {};

// Generics(対象はTypeAlias)

/*
  非常に広い範囲で使われる。
  外部パッケージの型定義はGenerics前提で作成されてることが多い。
  GenericsができないとTypeScript開発は難しい。
*/

/************************** */
//  ・用途について
/************************** */
//型の決定を遅延できる

//----------------------------
//通常
//----------------------------
type Foo = {
    value: string;
};

//----------------------------
//Generics
//----------------------------
type Foo2<T> = {
    value: T;               //型は未決定
};

//例1-1、numberで定義
const foo3: Foo2<number> = {
    value: 0,               //ここでfoo3.valueの型がnumberで決定する
};
//例1-2、booleanで定義
const foo4: Foo2<boolean> = {
    value: true,
};
//例1-3、number[]で定義
const foo5: Foo2<number[]> = {
    value: [1,2,3],
};


//例1-4、
type User<T> = {
    name: string;
    state: T;       //stateの型は未決定
};

type Japanese = User<"東京都" | "大阪府">;  //ここでUser.stateの型がstringで決定する
type American = User<"CA" | "NY">;         //ここでUser.stateの型がstringで決定する

const userA: Japanese = {
    name: "さとう",
    state: "東京都",
};
const userB: American = {
    name: "ジョニー",
    state: "CA",
};

//----------------------------
// Tの初期値を指定する
//----------------------------
//例2-1
type Foo6<T> = {
    value: T;
};

//エラーとなる(Tを指定しないため)
// const foo6: Foo6 = {
//     value: "CA",
// };

type Foo7<T = string> = {
    value: T;
};

//Tを指定しなくともエラーとならない
const foo7: Foo7 = {
    value: "",
};

//---------------------------------
// Generics(extendsの制約について)
//---------------------------------
//例3-1、Tに指定する型は stringに限定する
type Foo8<T extends string> = {
    value: T;
};

const foo81: Foo8<string> = {
    value: "123",
};
const foo82: Foo8<"123"> = {
    value: "123",       //LiteralTypesはok
};

// const foo83: Foo8<number> = {
//     value: 123,      //numberはエラー
// };

//例3-2、Tに指定する型に制約を課し、初期値を指定する
type Foo9<T extends string | number = string> = {
    value: T;
};

const foo91: Foo9 = {
    value: "123",
};
const foo92: Foo9<number> = {
    value: 111,
};

/*
・Tの由来: Type(Parameter)の略

・慣例的にT以外で使われるプレースホルダとしては
　「K」:Key
  「U」:Unknown
  「E」:Element
  だが、これ以外の文字でも動作する
*/