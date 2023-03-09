import { NextPage } from "next";
import { ChangeEventHandler, FC, MouseEventHandler, useState, VFC } from "react";

//studyts26

type Todo = {
    id: number;
    label: string;
    isDone: boolean;
};
const TODO: Todo[] = [
    {id: Math.random(), label: "TODO1", isDone: false},
    {id: Math.random(), label: "TODO2", isDone: true},
    {id: Math.random(), label: "TODO3", isDone: false},
    {id: Math.random(), label: "TODO4", isDone: false},
];

const Todo: NextPage = () => {
    const [text, setText] = useState("");
    const [todos, setTodos] = useState<Todo[]>([]); //関数に型をつける場合、Genericsを使う
    
    //error: パラメーター 'e' の型は暗黙的に 'any' になります。
    //・引数eを定義する必要がある -> toggleのトリが(onchange)をコードジャンプして定義する
    //
    const toggle:ChangeEventHandler<HTMLInputElement> = e => {
        setTodos(prevTodos => {
            return prevTodos.map(todo => {

                console.log({todo: todo, log: e.target.value});

                if(todo.id === Number(e.target.value)){
                    return { ...todo, isDone: !todo.isDone };
                }
                return todo;
            })
        })
    };

    //ToDo入力テキストのonChangeハンドラーです
    const handleChangeText:ChangeEventHandler<HTMLInputElement> = e => {
        setText(e.target.value);
    };

    //「追加」ボタンのonClickハンドラーです
    const handleAdd:MouseEventHandler<HTMLButtonElement> = () => {
        setTodos(prevTodos => {
            return [
                ...prevTodos,
                {
                    id: Math.random(),
                    label: text,
                    isDone: false
                }
            ]
        });
        setText("");
    };

    return (
        <div className="w-96 mx-auto p-20">
            <h1 className="text-xl font-bold">Todo</h1>
            <div className="flex gap-x-2">
                <input 
                    type="text" 
                    value={text} 
                    onChange={handleChangeText} 
                    className="border border-black" 
                />
                <button className="border borderblack shrink-0" onClick={handleAdd} >追加</button>
            </div>
            <ul className="mt-4 space-y-2">
            {todos.map(todo => {
                return (
                    <li key={todo.id}>
                        <ListItem todo={todo} toggle={toggle} />
                    </li>
                );
            })}
            </ul>
        </div>
    );
};

type ListItemProps = {
    todo: Todo;
    toggle: ChangeEventHandler<HTMLInputElement>;
  };

//React18以降はVFC,FCは非推奨です
//FCはESLintでエラーとならないため、ひとまずFCで記載する
/**
 * TodoList表示用の関数です
 */
const ListItem: FC<ListItemProps> = ({ todo, toggle }) => {
    return (
        <label className="flex items-center gap-x-2">
        <input 
            type="checkbox" 
            checked={todo.isDone} 
            onChange={toggle} 
            value={todo.id} 
        />
        <span>{todo.label}</span>
    </label>
    );
};

export default Todo;