import React from 'react';

export default function Todo({todo,toggleComplete}) {
    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.complete} onChange={() => toggleComplete(todo.id)}/>
                {todo.name}
            </label>
        </div>
    );
}

