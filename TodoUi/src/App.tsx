import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import TasksPageContainer from './containers/TasksPageContainer/TasksPageContainer'
import TasksContextProvider from './contexts/TasksContextProvider/TasksContextProvider'
import TabSelectionContextProvider from './contexts/TabSelectionContextProvider/TabSelectionContextProvider'
import CreateTaskPage from './pages/CreateTaskPage/CreateTaskPage'

function App() {
  return (
    <>
      <TabSelectionContextProvider>
        <TasksContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<TasksPageContainer/>} />
              <Route path="/new" element={<CreateTaskPage/>} />
            </Routes>
          </BrowserRouter>
        </TasksContextProvider>
      </TabSelectionContextProvider>
    </>
  )
}

export default App
