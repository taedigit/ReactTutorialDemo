import { Routes, Route } from 'react-router-dom'
import TableRowEdit from './TableRowEdit'
import RowAddDelete from './RowAddDelete'
import TablePagination from './TablePagination'
import TableSearch from './TableSearch'

const MainContent = () => {
  return (
    <div className="main-content">
      <Routes>
        <Route path="/" element={
          <div>
            <h1>React 튜토리얼에 오신 것을 환영합니다!</h1>
            <p>왼쪽 메뉴에서 원하는 튜토리얼을 선택하세요.</p>
          </div>
        } />
        <Route path="/table-row-edit" element={<TableRowEdit />} />
        <Route path="/row-add-delete" element={<RowAddDelete />} />
        <Route path="/pagination" element={<TablePagination />} />
        <Route path="/table-search" element={<TableSearch />} />
        <Route path="/popup" element={<PopupDemo />} />
      </Routes>
    </div>
  )
}

export default MainContent 