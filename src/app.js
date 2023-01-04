import React, {Component} from "react";
import "./app.css";

import TodoList from "./components/todo-list/todo-list";
import AppHeader from "./components/header/app-header";
import SearchBar from "./utils/search-bar/search-bar";
import ItemStatusFilter from "./utils/filter/item-status-filter";
import ItemAddForm from "./utils/item-add-form/item-add-form";

export default class App extends Component {

    fakeId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Build React App'),
            this.createTodoItem('Go to lunch'),
            this.createTodoItem('Go to work'),
        ]
    }

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.fakeId++
        }
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            };
        });
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({ todoData }) => {
            const newArr = [
                ...todoData,
                newItem
            ];

            return {
                todoData: newArr
            };
        });

    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = {...oldItem,
            [propName]: !oldItem[propName]};

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    render() {
        const { todoData } = this.state;
        const doneCount = todoData
            .filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <>
                <div className="todo-app">
                    <AppHeader toDo={todoCount} done={doneCount} />
                    <div className="top-panel d-flex">
                        <SearchBar />
                        <ItemStatusFilter />
                    </div>
                    <ItemAddForm onItemAdded={this.addItem}/>
                    <TodoList
                        todos={todoData}
                        onDeleted={ this.deleteItem }
                        onToggleImportant={this.onToggleImportant}
                        onToggleDone={this.onToggleDone}
                    />
                </div>
            </>
        )
    }
}