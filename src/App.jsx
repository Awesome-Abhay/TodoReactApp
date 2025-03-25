import { useState, useRef, useEffect} from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import Todo from './components/Todo';

let getInitialTodos= () => {
  const todoString= localStorage.getItem("todos");
  if(todoString){
    return JSON.parse(todoString);
  }

  return [];
}

function App() {

  const inputRef = useRef();        // To refer the input tag through which we add tasks.
  const lastTodoRef= useRef(null);  // To scrollintoview the last todo which is added.
  const [finishedCheck, setfinishedCheck] = useState(false)  // To show tasks which are finished.
  const [todo, setTodo] = useState("");  // todo which is begin written on input tag.
  const [todos, setTodos] = useState(getInitialTodos());  // storing all todos 
  const [editTodo, seteditTodo] = useState({});  // todo which is under editing.
  

  function haveFocus(){
    inputRef.current.focus();
  }

// This will run on very first render to display all todos.
  useEffect(() => {
    haveFocus();
    let todoString= localStorage.getItem("todos");
    if(todoString){
      let todos= JSON.parse(todoString);
      setTodos(todos);
    }
  },[])

  
  let saveTodosLS= () => {
    localStorage.setItem("todos",JSON.stringify(todos));
  }


  let handleChange = (e) => {
    setTodo(e.target.value);
  }

  

  useEffect(() => {
    
    saveTodosLS();
    
  }, [todos])
  


  let handleSave = () => {
    if(editTodo.id){
      let index= todos.findIndex(item=>item.id === editTodo.id);
      todos[index].todo=todo;
      let newTodos= [...todos];
      setTodos(newTodos);
      seteditTodo({});
    }else{ 
      let tempTodo={
        id: uuidv4(),
        todo,
        isChecked: false
      }
      setTodos([...todos,tempTodo])
      setTimeout(() => {
        lastTodoRef.current?.scrollIntoView({behavior:'smooth'}, 100);
      }, 100);
    }
    setTodo("")
  }

  let handleCompletionCheck=  (e) => { 
    
    e.stopPropagation();

    console.log(e)
    let todoId;
    if(e.target.type=='checkbox'){
      todoId=e.target.name;
    }else if(e.target.classList.contains('todo')){
      todoId=e.target.children[0].children[0].name;
    }else{
      return;
    }
    
    let index= todos.findIndex((item)=>{return item.id===todoId})
    let newTodos= [...todos];
    
    newTodos[index]={
      ...newTodos[index],
      isChecked: !newTodos[index].isChecked
    }
    setTodos(newTodos);
    
  }

  let handleDelete= (e)=>{
  
    let newTodos= todos.filter((item)=>{
      return item.id!=e.name;
    })
    setTodos(newTodos);
  }

  let handleDeleteAll= (e) => {
    setTodos([]);
  }

  let handleDeleteFinished= (e) => {
    let newTodos= todos.filter((e)=>{return e.isChecked==false})
    setTodos(newTodos);
  }

  let handleClearFinished= (e) => {
    let newTodos=todos.map((item)=>{
      // return {
      //   id: item.id,
      //   todo,
      //   isChecked:false
      // }
      return{
        ...item, isChecked:false
      }
    })
    setTodos(newTodos);
  }

  let handleEdit= (e) => { 
    let t= todos.filter((item)=>{
      return item.id===e.name;
    })
    setTodo(t[0].todo);
    seteditTodo(t[0]);
    haveFocus();
    
  }

  return (
    <>
      <Navbar />

      <div className="md:container md:mx-auto md:mt-10 bg-violet-200 min-h-[88vh] md:w-1/2 p-3 pb-1 relative">
        <h1 className='text-center text-2xl font-medium'>iTask - Manage your todos at one place</h1>

        <div className='font-medium text-xl my-5'>Add a Todo</div>

        <div className='w-full p-3 flex gap-5'>
          <input
            ref={inputRef}
            onKeyDown={(e)=>{
              e.key==="Enter" && handleSave();
            }}
            className='w-8/10 rounded-xl bg-white p-1 px-2 outline-none' type="text"
            value={todo}
            onChange={handleChange}
          />
          <button
            className='w-1/10 rounded-xl flex justify-center items-center text-white bg-violet-600 cursor-pointer font-medium'
            onClick={handleSave}
          >Save</button>
        </div>

        <div className='flex gap-3'>
          <input 
           onChange={(e)=>(setfinishedCheck(e.target.checked))}
           checked= {finishedCheck}
           className='cursor-pointer' type="checkbox" name="" id="showFinished" />
          <label className='cursor-pointer select-none' htmlFor='showFinished'>Show Finished Tasks</label>
        </div>

        <div className='line border-t border-gray-500 mx-auto my-3'></div>

        <h1 className='font-bold text-xl'>Your Todos</h1>

        <div className="todos w-full overflow-y-auto h-[30vh] md:h-[40vh] mt-5 gap-5 flex flex-col px-2 py-2">

          {
            finishedCheck?(
              todos.map((item) => (
                <Todo item={item}
                handleCompletionCheck={handleCompletionCheck}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                key={item.id}
                lastTodoRef={lastTodoRef}
                />
              ))
            ): (
              todos.map((item) => (
                item.isChecked==false && (
                <Todo item={item}
                handleCompletionCheck={handleCompletionCheck}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                key={item.id}
                lastTodoRef={lastTodoRef}
                />)
              ))
            )
            

          }
          {
            todos.length==0 && <div className='text-center text-2xl text-gray-500'> Nothing to Show... </div>
          }

        </div>

        

        <div className="functionalities w-full p-3 bg-transparent flex justify-center gap-8 mt-5">
          <button
           onClick={handleDeleteFinished}
           className='text-white bg-violet-800 font-medium p-2 rounded-2xl cursor-pointer'>Delete Finished</button>
          <button
           onClick={handleDeleteAll}
           className='text-white bg-violet-800 font-medium p-2 rounded-2xl cursor-pointer'>Delete All</button>
          <button 
           onClick={handleClearFinished}
           className='text-white bg-violet-800 font-medium p-2 rounded-2xl cursor-pointer'>Clear Finished</button>
        </div> 

      </div>



    </>
  )
}

export default App
