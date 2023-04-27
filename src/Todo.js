export default function Todo({todo, toggleTodo}) {
  function handleOnClick(e) {
    toggleTodo(todo.id)
  }
  return(
    <div className={(todo.complete ? 'alert alert-dark complete' : 'alert alert-light')}>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" checked={todo.complete} onChange={handleOnClick} />
        <label className="form-check-label">{todo.name}</label>
      </div>
    </div>
  )
}