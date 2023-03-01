export {};

//TypeGuard(ユーザー定義型)
//型の絞り込みが難しいこと(前回までで対応できないこと)に対応できる


// 対応できない例
//  (タグ付きTypeGuard(Discriminated Union)で絞ることができない)
type UserA = { name: string; lang: "ja" };
type UserB = { name: string; lang: "en" };

const foo = (value: any) => {
    if (value.lang === "ja") {
        return value;           //絞ることができない
    };
};

/************************** */
//１、ユーザー定義型の用法
/************************** */
const isUserA = (user: UserA | UserB): user is UserA => {
    return user.lang === "ja"
};
const isUserB = (user: UserA | UserB): user is UserB => {
    return user.lang === "en"
};


const foo2 = (value: any) => {
    if (isUserA(value)) {
        return value;
    }
    if (isUserB(value)) {
        return value;
    }
    return value;
};

/************************** */
// ２、ユーザー定義型の用途
/************************** */
/*
 ◇非同期処理(レスポンスに型をつけることが難しい)
    (現在、解決のため行われていること)
        ・GraphQL側で型をCodeGenして型を付ける方法
        ・API仕様書を確認し、型を定義する

 ◇filter関数
    ・TypeScript側は型をつける対応が未対応となっている
    　→対応の為、TypeGuard(ユーザー定義型)が用いられる
 */

//(2-1)非同期処理における使用法
const foo3 = async () => {
    const res = await fetch("");
    const json = await res.json();

    //UserA型で返す
    if(isUserA(json)) {
        return json.lang;
    }
    if(isUserB(json)) {
        return json.lang;
    }
};

//(2-2)filter関数における使用法
const users4: (UserA | UserB)[] = [
    { name: "さとう", lang: "ja" },
    { name: "たなか", lang: "ja" },
    { name: "ジョニー", lang: "en" },
];

//UserAだけにならない(型が追いついていない)
const japanese = users4.filter( user => user.lang === "ja");
    
//絞り込み
const japaneseUser = users4.filter(isUserA); //UserAで絞り込み
const englishUser  = users4.filter(isUserB); //UserBで絞り込み

