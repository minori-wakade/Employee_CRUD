import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Employee from './Employee'
import EditEmp from './EditEmp'
import AddEmp from './AddEmp'
import Header from './Header'
function App() {
  return (
    <>
      <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Employee></Employee>}></Route>
          <Route path='/create' element={<AddEmp></AddEmp>}></Route>
          <Route path='/update/:id' element={<EditEmp></EditEmp>}></Route>
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App