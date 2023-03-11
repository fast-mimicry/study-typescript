export {}

//Next.jsチュートリアルをTypeScriptにリファクタリングする

/*

---------------------------------------
sourceからGitHubリポジトリをクローンする
---------------------------------------
・NextJSページ > Larn
・サイドバー > Create a Next.js App を開く
・Create a Next.js App にて「https://next-learn-starter.vercel.app (source)」にてリポジトリを開く

//チュートリアルリポジトリ
//npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"

・完成品からクローンを行うため、今回は"https://github.com/vercel/next-learn/tree/master/basics/demo"からクローンする。

---------------------------------------
ディレクトリを移動
---------------------------------------
cd nextjs-blog

---------------------------------------
(前準備)
---------------------------------------
typescriptの環境を構築
１、tsconfig.jsonを作成
  touch tsconfig.json

  →yarn dev時、nextjsであることを検知してくれる
    今回はdevDependenciesに自動でインストールしてくれた
    ----------------------------------------------------
    Installing devDependencies (npm):
    - typescript
    - @types/react
    - @types/node   (サーバーサイドで動かすためのnodeの型)
    ----------------------------------------------------

---------------------------------------
リファクタリング開始
---------------------------------------

・_app.jsをtsxにリネーム
　エラーが出る場合、以下設定による
  tsconfig.json > strict: true(型を厳しくチェックするを有効)

・index.jsをtsxにリネーム
 export default function Home({ allPostsData })に
 VC<>は使わない。
 
 「index.tsx」はpagesディレクトリ配下にある。
 Next.jsにおいてpagesディレクトリ配下のコンポーネントは、通常のコンポーネント以上の機能を持っている。
 reactのFCは付けられない

 ・関数式に型を付ける場合、constに書き換える
 export default function Home({ allPostsData })は関数式にしないとNextJSの型を付けられないため
 関数式 const Home({ allPostsData }) => {　に書き換える。

・関数式に型を付ける場合、constに書き換える２
export async function getStaticProps() {

//-------------------
// studyts28
//-------------------
・ページの関数名(Home)は、NextPageで型付けする
・型export専用のファイルを作成し、各コンポーネントでimportする方法
  type Post = {id: string};

・function getSortedPostsDate(): Post[{id:string,…, contextHtml:string}]において
引数はcontextHtml必要で、戻り値はcontextHtml不要である場合、omitを使う

 getSortedPostsDate(): Omit<Post, "contextHtml">[]

//-------------------
// studyts29
//-------------------

・戻り値がComponentの場合、FCを使う。(この場合、アロー関数の書き方にする。reactではFCを使う場合が多い為、functionでは書かないようにしている)
  FCはChildrenの型もある
  VFCはChildrenの型を削除した型(こちらを推奨したいが、、、)
  しかし、React18でFCもchilrenの型がなくなる為、18系以降「FC」が良い。

・関数は型推論でエラーが出ていなくても、戻り値の型を指定してあげる。
　この方がコンパイルが早くなる、typoが防げる

・async functionの場合、返り値はPromiseとなる

*/

