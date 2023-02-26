export {};

// 型クエリ(typeof, keyof)

/************************** */
//１,typeofについて
/************************** */
//宣言
let foo1: string;           //型アノテーション
let foo2 = 123;             //型推論
const foo3 = "123";         //String LiteralTypes
const foo4: string = "123"; //型アノテーションが優先される

//型クエリ(typeof:変数の型をコピーする)
type Foo = typeof foo3;


//ユースケース(オブジェクトからコピーする)
const obj1 = {
    foo: "foo",
    bar: "bar",
};


//利用１
//typeofを利用しない書き方
const obj2_classic: {foo:string, bar:string} = {
    foo: "aaaa",
    bar: "",
};

//typeofを利用
const obj2: typeof obj1 = {
    foo: "ユースケースの利用",
    bar: "",
};

//利用２(UnionTypes利用時の型の絞り込み)
function double (x: number | string) {
    //stringの処理を行う
    if (typeof x === "string") {
        return Number(x) * 2;
    }
    //背理的にxはnumberになる
    return x * 2; 
}

/**************************************************** */
//２、keyof(型をLiteral TypesでUnion Typesとして取得)
/**************************************************** */
type Obj_k = {
    foo: string;
    bar: number;
};

type Key_Classic = "foo" | "bar";   //keyofでコピーされる中身
type Key = keyof Obj_k;             //型をUnionTypesでLiteralTypesをコピー
//type key2 = typeof Obj_k;         //type -> typeはコピーできない

//LiteralTypesを取得する
const key1: Key = "foo";
const key2: Key = "bar";

/**************************************************** */
//３、keyof,typeofの組み合わせについて
/**************************************************** */
/*
const obj1 = {
    foo: "foo",
    bar: "bar",
};
*/

//変数から取得した型をkeyofでコピー
type Key3 = keyof typeof obj1

const key3: Key3 = "foo";

//シンボル(111)でLiteralTypesの型を作成してみる
const obj1_extend: typeof obj1 & {111:"hoge"} = {
    foo: "foo2",
    bar: "bar2",
    111: "hoge",
};

//シンボルのLiteralTypesを取得(変数から型を取得し、型をkeyofで取得)
type Key4_symbol = keyof typeof obj1_extend;
const key4_symbol = 111;

//シンボル利用例
function usage(x: keyof typeof obj1_extend): void {
    return ;
};

usage(111);
usage("foo");


//freeStyle
//キャリアの型を定義します
type Carriers = "docomo" | "au" | "softbank";
//キャリアと値段で型を定義します
type SmartPhone = {
    carrier: Carriers;
} & {
    2980: "price";
};

//2980をLiteralTypesで取得
//type price = typeof keyof SmartPhone;

//オブジェクトを作成
const au: SmartPhone = {carrier:"au", 2980: "price"};



