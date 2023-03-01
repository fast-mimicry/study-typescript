export {};

//インデックスシグネチャ、Mapped Typesについて

// Index Signature: 
//   型がもろくなる為多用しない方がよい
// 
// Mapped Types:    
//   汎用的。大きく２つに分けて使える
//   ・１、オブジェクトのプロパティ名を使うときに使う
//   ・２、ジェネリクスと組み合わせ、便利な型を作り出すときに使う

//それぞれ記述が似てるため混同しやすい

/************************** */
// １、Index Signature
/************************** */
type User = {
    name: string;
    [key: string]: string; //Index Signature (Keyでもkでもok) 
};

const user: User = {
    name: "taro",
    account: "taro_it",
    job: "Software Engineer"
};

//--------------------------------------
//欠点１、ほかの型が入るとエラーとなる
//--------------------------------------
//例１
type User2 = {
    name: string;
    //age: number;        //(error)
    [key: string]: string; //Index Signature (Keyでもkでもok) 
};

//(解決) IndexSignatureにstring以外の型をunion typesで追加する
type User3 = {
    name: string;
    age: number;
    [key: string]: string | number;                 //(numberを追加)
};
const user3: User3 = {
    name: "taro3",
    age: 20,
    account: "taro_it3",
    job: "Software Engineer",
};

//例２、存在しないプロパティを指定する
user3.firstName             //string | number型になっている -> undefinedを追加してあげるべき

type User4 = {
    name: string;
    age: number;
    [key: string]: string | number | undefined;     //(undefinedを追加)
};

const user4: User4 = {
    name: "taro3",
    age: 20,
    account: "taro_it3",
    job: "Software Engineer",
};
//存在しない -> undefined
user4.firstName         

//存在している -> undefinedが表示されてしまう。
//undefined以外であることを絞り込んで使う必要があり使いづらい。
user4.account           

/************************** */
// ２、Mapped Types
/************************** */
//１、オブジェクトのプロパティ名を限定するときの用法

//(通常の書き方)
type User5 = {
    name: string;
} & PersonalData;

type PersonalData = {
    height: number;
    weight: number;
};

const user5: User5 = {
    name: "taro",
    height: 175,
    weight: 60,
};

//(Mapped Types を使用)
type User6 = {
    name: string;
} & PersonalData6;

type Foo = "height" | "weight";
type Foo2 = {
    height: any;
    weight: any;
};
const foo3: Foo2 = {
    height: 175,
    weight: 60,
}

type PersonalData6 = {
    //[K in "height" | "weight"]: number;   //用法１
    //[K in Foo]: number;                   //用法２
    //[K in keyof Foo2]: number;            //用法３
    //[K in keyof typeof foo3]: number;      //用法４
    [K in keyof typeof foo3]?: number;       //用法５(オプショナルも可。IndexSignatureでは不可)
};

const user6: User6 = {
    name: "taro6",
    height: 175,
    weight: 60,
};

//２、オブジェクト内プロパティに一括でオプショナル設定する方法２
type PersonalData7 = {
    height: number;
    weight: number;
};

type OptionalPersonalData7 = {
    [K in keyof PersonalData7]?: PersonalData7[K];    //用法６、ブラケット構文でシンボル名を指定して展開している
};

//２-２、オブジェクト内プロパティに一括で、オプショナルを除去する方法２
type PersonalData8 = {
    height?: number;
    weight?: number;
};

type RequiredPersonalData8 = {
    [K in keyof PersonalData8]-?: PersonalData8[K];     //用法７
};

//(補足)ジェネリクスを利用して必須プロパティを指定する場合
type User9 = {
    name: string;
} & Required<PersonalData9>;    //PersonalData9プロパティが一括で必須となる

type PersonalData9 = {
    height?: number;
    weight?: number;
    realName?: string;
};
