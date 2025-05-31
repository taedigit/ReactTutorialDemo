import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>튜토리얼</h2>
      <ul>
        <li>
          <Link to="/table-row-edit">행 편집</Link>
        </li>
        <li>
          <Link to="/row-add-delete">행 추가/삭제</Link>
        </li>
        <li>
          <Link to="/pagination">페이징</Link>
        </li>
        <li>
          <Link to="/table-search">테이블 서칭</Link>
        </li>
        <li>
          <Link to="/popup">팝업 호출</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar 