import type { NextPage } from "next";

//定義
type User = {
    name: string;
    height?: number;
    weight?: number;
};

//利用
const taro: User = {
    name: "taro",
};

/**
 * TypeScriptを勉強するためのページです
 */
export const FreeNote: NextPage = () => {
    return (
        <div>
            FreeNote
        </div>
    );
}