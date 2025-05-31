import PaginationControls from './PaginationControls'
import PaginationInfo from './PaginationInfo'
import { usePagination } from '../hooks/usePagination'

interface UserData {
  id: number
  name: string
  address: string
  email: string
  age: number
  joinDate: string
  employmentStatus: string
}

const TablePagination = () => {
  const allUsers: UserData[] = [
    { id: 1, name: '김철수', address: '서울시 강남구', email: 'kimcs@example.com', age: 25, joinDate: '2023-03-15', employmentStatus: '재직' },
    { id: 2, name: '이영희', address: '부산시 해운대구', email: 'leeyh@example.com', age: 30, joinDate: '2022-07-10', employmentStatus: '재직' },
    { id: 3, name: '박민수', address: '대구시 중구', email: 'parkms@example.com', age: 28, joinDate: '2023-01-20', employmentStatus: '휴직' },
    { id: 4, name: '최지영', address: '인천시 남동구', email: 'choijy@example.com', age: 32, joinDate: '2021-05-12', employmentStatus: '재직' },
    { id: 5, name: '정승호', address: '대전시 서구', email: 'jungsh@example.com', age: 27, joinDate: '2022-11-08', employmentStatus: '재직' },
    { id: 6, name: '한소미', address: '광주시 북구', email: 'hansm@example.com', age: 29, joinDate: '2023-02-14', employmentStatus: '휴직' },
    { id: 7, name: '윤태성', address: '울산시 중구', email: 'yoonts@example.com', age: 31, joinDate: '2021-09-03', employmentStatus: '재직' },
    { id: 8, name: '임수진', address: '경기도 수원시', email: 'limsj@example.com', age: 26, joinDate: '2023-06-20', employmentStatus: '재직' },
    { id: 9, name: '오현우', address: '강원도 춘천시', email: 'ohhw@example.com', age: 33, joinDate: '2020-12-15', employmentStatus: '재직' },
    { id: 10, name: '송미래', address: '제주도 제주시', email: 'songmr@example.com', age: 24, joinDate: '2023-08-01', employmentStatus: '휴직' },
    { id: 11, name: '배준혁', address: '충북 청주시', email: 'baejh@example.com', age: 35, joinDate: '2019-04-22', employmentStatus: '재직' },
    { id: 12, name: '서은비', address: '전북 전주시', email: 'seoeb@example.com', age: 28, joinDate: '2022-03-18', employmentStatus: '재직' }
  ]

  const {
    currentPage,
    totalPages,
    currentData,
    startIndex,
    endIndex,
    goToPage,
    goToPrevious,
    goToNext
  } = usePagination({
    data: allUsers,
    itemsPerPage: 5
  })

  return (
    <div className="table-grid-page">
      <h1>페이징</h1>
      
      <PaginationInfo
        totalItems={allUsers.length}
        startIndex={startIndex}
        endIndex={endIndex}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      <table className="data-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>이름</th>
            <th className="address-column">주소</th>
            <th className="email-column">이메일</th>
            <th>나이</th>
            <th>입사일</th>
            <th>재직상태</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((user, index) => (
            <tr key={user.id}>
              <td>{startIndex + index + 1}</td>
              <td>{user.name}</td>
              <td className="address-column">{user.address}</td>
              <td className="email-column">{user.email}</td>
              <td>{user.age}</td>
              <td>{user.joinDate}</td>
              <td>{user.employmentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </div>
  )
}

export default TablePagination 