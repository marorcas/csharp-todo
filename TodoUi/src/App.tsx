import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import TasksPageContainer from './containers/TasksPageContainer/TasksPageContainer'
import TasksContextProvider from './contexts/TasksContextProvider/TasksContextProvider'
import TabSelectionContextProvider from './contexts/TabSelectionContextProvider/TabSelectionContextProvider'

function App() {
  return (
    <>
      <TabSelectionContextProvider>
        <TasksContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<TasksPageContainer />} />
            </Routes>
          </BrowserRouter>
        </TasksContextProvider>
      </TabSelectionContextProvider>
    </>
  )
}

export default App
