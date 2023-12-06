import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './home/Home'
import { Login } from './login/Login'
import { Register } from './register/Register'
import './App.css'
import { RequireAuth } from './AuthChecker'

function App() {

  return (
    <BrowserRouter>
    <Routes>
          <Route Component={RequireAuth}>
          <Route exact path="/" Component={Home} />
          </Route>
          <Route element={<RequireAuth expectAuth={false} redirectPath='/'/>}>
          <Route path="/login" Component={Login} />
          </Route>
          <Route element={<RequireAuth expectAuth={false} redirectPath='/'/>}>
          <Route path="/register" Component={Register} />
          </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App

/*
</Route>
<Route element={RequireAuth({expectAuth: false, redirectPath: "/"})}>
*/