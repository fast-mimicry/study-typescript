import type { NextPage } from "next";
import { TwitterCard } from "src/components/TwitterCard";

//宣言
// interface Foo  {
//   a: number
// }

//(継承)(ここでエラーとなる)
// interface Bar extends Foo {
//   b: string;
// }

//利用(foo.a が、never型となり、使えない)(ここでエラーとなる)
// const foo: Bar = {
//   a: 1,
// };

const Home: NextPage = () => {
    return (
        <TwitterCard />
    );
};

export default Home;