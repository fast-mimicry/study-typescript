//tsconfigのisolatedModulesをfalseにしたため、exportが必須とならなくなった
//しかし、function fooがexportされ、他ページのfooと競合するためexport{}のコメントアウトを戻した
export {};

// Generics(対象は関数)

//--------------------------------
// 使用法
//--------------------------------
//例1-1
function foo<T>(arg: T) {
    return { value: arg };
};
//アロー関数
const foo_allowed = <T>(arg: T) => {
  return { value: arg };
};


const foo1 = foo<number[]>([1, 2, 3]);
const foo12 = foo<string[]>(["1", "2", "3"]);
const foo13 = foo<{ foo: string[]}>({foo: ["1", "2", "3"]});    //オブジェクト型

//例1-2、暗黙的な型解決(型引数なしに、関数を呼び出せる)
const foo14 = foo("");      //推論して暗黙的にstringになる
const foo15 = foo(false);   //推論して暗黙的にbooleanになる

//(補足)
//型引数がなくても大丈夫だが
//型引数の指定が必要となるケースはどういうときか？

// Nullable(Nullになりうる値)の場合、後から入ってくる引数が分からない場合
const foo16 = foo<string | null>("");

//--------------------------------
// 関数のGenericsのextendsについて
//--------------------------------
// 例2
const foo2 = <T extends string | number = string>(arg: T) => {
    return {value: arg};
};

const foo21 = foo2("");
const foo22 = foo2<string>("");

/*
 (補足)
  Genericsで型制約しない場合、Tは「unknown型」として扱われる
  ・Generics関数内でTypeGuard出来ないため、args.toStringなどメソッドが使えない
*/
const foo23 = <T>(arg: T) => {
    return { value: arg };
    //return {value: args.toString};  //エラー
};

// 例2-1、TypeGuardでメソッドを使用する
const foo24 = <T extends string | number = string>(arg: T) => {
    if (typeof arg === "string") {
        return { value: arg.toUpperCase() };
    }
    return { value: arg.toFixed() };
};


