export {};

//Utility Types

/*
・関数の返り値の型をとりたい
・オブジェクトのそれぞれのプロパティをReadonlyにしたい
→　毎回、型を抽出するための型を作るのは大変。
　 TypeScript公式が提供してくれてるものがある(UtilityTypes)
 
 */

//---------------------------------------
//例１、ReturnType
//---------------------------------------
const foo = (id: string, age: number) => {
    return 0;
};
type Return<T> = T extends (...args: any[]) => infer U ? U : never;

//戻り値の型を取得する
type getReturnType = Return<typeof foo>;        // ConditionalTypes
type getReturnType12 = ReturnType<typeof foo>;  // UtilityTypes

//---------------------------------------
//例２、Readonly (プロパティをすべてReadonly)
//---------------------------------------
type User = {
    name: string;
    age: number | null;
    country?: "US" | "UK" | "JP";
};

type ReadonlyUser = Readonly<User>;

const user: ReadonlyUser = {
    name: "たろう",
    age: 20,
};
//代入できない
//user.age = 30;  //読み取り専用プロパティであるため、'age' に代入することはできません。

//-----------------------------------------
//例３、Partial (プロパティをすべてOptional)
//-----------------------------------------
type PartialUser = Partial<User>;
const user13: PartialUser = {
    name: "たろう",
    age: 20,
};
//代入できる
user13.age=30;

//-----------------------------------------
//例４、Required (プロパティすべて必須)
//-----------------------------------------
type RequiredUser = Required<User>;
const user14: RequiredUser = {
    name:"じろ",
    age: 19,
    country:"JP",
};

//--------------------------------------------------
//例５、Pick (プロパティを指定して、新しい型を作り出す)
//--------------------------------------------------
//ageを除いた型を抽出
type PickUser = Pick<User, "name" | "country">; //第1引数にObject, 第2引数に抽出するUnionTypesを指定
const user15:PickUser = {
    name: "じろ",
    country:"JP",
};  //ageを除去して作成した

//--------------------------------------------------------------
//例６、Omit (不要なプロパティを指定して(除去後)、新しい型を作り出す)
//--------------------------------------------------------------
//ageを除いた型を抽出
type OmitUser = Omit<User, "age">;
const user16: OmitUser = {
    name: "じろ",
    country: "JP",
};

//プロパティが多数ある場合には、Omitで除去した方が良い場合もある模様





