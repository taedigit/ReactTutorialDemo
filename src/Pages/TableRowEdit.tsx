import { useState } from 'react'
import { useSelectAll } from '../hooks/useSelectAll'
import SelectAllCheckbox from './SelectAllCheckbox'
import RowCheckbox from './RowCheckbox'

interface UserData {
  id: number
  name: string
  address: string
  email: string
  age: number
  joinDate: string
  employmentStatus: string
}

const TableRowEdit = () => {
  const [users, setUsers] = useState<UserData[]>([
    { id: 1, name: '김철수', address: '서울시 강남구', email: 'kimcs@example.com', age: 25, joinDate: '2023-03-15', employmentStatus: '재직' },
    { id: 2, name: '이영희', address: '부산시 해운대구', email: 'leeyh@example.com', age: 30, joinDate: '2022-07-10', employmentStatus: '재직' },
    { id: 3, name: '박민수', address: '대구시 중구', email: 'parkms@example.com', age: 28, joinDate: '2023-01-20', employmentStatus: '휴직' }
  ])

  const { 
    selectedItems: checkedItems, 
    allSelected, 
    someSelected,
    handleSelectAll, 
    handleSelectItem 
  } = useSelectAll({ 
    itemCount: users.length 
  })

  const handleEmailChange = (index: number, newEmail: string) => {
    const newUsers = [...users]
    newUsers[index].email = newEmail
    setUsers(newUsers)
  }

  const handleAddressChange = (index: number, newAddress: string) => {
    const newUsers = [...users]
    newUsers[index].address = newAddress
    setUsers(newUsers)
  }

  const handleEmploymentStatusChange = (index: number, status: string) => {
    const newUsers = [...users]
    newUsers[index].employmentStatus = status
    setUsers(newUsers)
  }

  return (
    <div className="table-grid-page">
      <h1>행 편집</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>
              <SelectAllCheckbox
                checked={allSelected}
                indeterminate={someSelected}
                onChange={handleSelectAll}
              />
            </th>
            <th>이름</th>
            <th className="address-column">주소</th>
            <th className="email-column">이메일</th>
            <th>나이</th>
            <th>입사일</th>
            <th>재직상태</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>
                <RowCheckbox
                  checked={checkedItems[index]}
                  onChange={(checked) => handleSelectItem(index, checked)}
                  aria-label={`${user.name} 행 선택`}
                />
              </td>
              <td>{user.name}</td>
              <td className="address-column">
                {checkedItems[index] ? (
                  <input 
                    type="text"
                    value={user.address}
                    onChange={(e) => handleAddressChange(index, e.target.value)}
                  />
                ) : (
                  user.address
                )}
              </td>
              <td className="email-column">
                {checkedItems[index] ? (
                  <input 
                    type="email"
                    value={user.email}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>{user.age}</td>
              <td>
                {checkedItems[index] ? (
                  <input 
                    type="text"
                    value={user.joinDate}
                    onChange={(e) => handleAddressChange(index, e.target.value)}
                    placeholder="YYYY-MM-DD"
                  />
                ) : (
                  user.joinDate
                )}
              </td>
              <td>
                <div>
                  <label>
                    <input 
                      type="radio" 
                      name={`status-${user.id}`}
                      value="재직"
                      checked={user.employmentStatus === '재직'}
                      disabled={!checkedItems[index]}
                      onChange={(e) => handleEmploymentStatusChange(index, e.target.value)}
                    />
                    재직
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name={`status-${user.id}`}
                      value="휴직"
                      checked={user.employmentStatus === '휴직'}
                      disabled={!checkedItems[index]}
                      onChange={(e) => handleEmploymentStatusChange(index, e.target.value)}
                    />
                    휴직
                  </label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableRowEdit 