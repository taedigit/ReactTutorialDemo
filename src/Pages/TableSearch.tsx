import { useState, useMemo } from 'react'

interface UserData {
  id: number
  name: string
  address: string
  email: string
  age: number
  joinDate: string
  employmentStatus: string
}

const TableSearch = () => {
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

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('전체')

  const filteredUsers = useMemo(() => {
    return allUsers.filter(user => {
      const matchesSearch = searchTerm === '' || 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === '전체' || user.employmentStatus === statusFilter
      
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleStatusFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setStatusFilter('전체')
  }

  return (
    <div className="table-grid-page">
      <h1>테이블 서칭</h1>
      
      <div className="search-controls">
        <div className="search-input-group">
          <input
            type="text"
            placeholder="이름, 주소, 이메일로 검색..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="status-filter"
          >
            <option value="전체">전체</option>
            <option value="재직">재직</option>
            <option value="휴직">휴직</option>
          </select>
          <button onClick={clearFilters} className="clear-button">
            초기화
          </button>
        </div>
        
        <div className="search-info">
          검색 결과: {filteredUsers.length}개 (전체 {allUsers.length}개 중)
        </div>
      </div>

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
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td className="address-column">{user.address}</td>
                <td className="email-column">{user.email}</td>
                <td>{user.age}</td>
                <td>{user.joinDate}</td>
                <td>{user.employmentStatus}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="no-results">
                검색 결과가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TableSearch 