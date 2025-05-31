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

const RowAddDelete = () => {
  const [users, setUsers] = useState<UserData[]>([
    { id: 1, name: '김철수', address: '서울시 강남구', email: 'kimcs@example.com', age: 25, joinDate: '2023-03-15', employmentStatus: '재직' },
    { id: 2, name: '이영희', address: '부산시 해운대구', email: 'leeyh@example.com', age: 30, joinDate: '2022-07-10', employmentStatus: '재직' },
    { id: 3, name: '박민수', address: '대구시 중구', email: 'parkms@example.com', age: 28, joinDate: '2023-01-20', employmentStatus: '휴직' }
  ])

  const [editingRows, setEditingRows] = useState<boolean[]>([false, false, false])
  const [nextId, setNextId] = useState(4)

  const { 
    selectedItems: checkedItems, 
    allSelected, 
    someSelected,
    handleSelectAll, 
    handleSelectItem,
    getSelectedCount
  } = useSelectAll({ 
    itemCount: users.length 
  })

  const handleFieldChange = (index: number, field: keyof UserData, value: string | number) => {
    const newUsers = [...users]
    newUsers[index] = { ...newUsers[index], [field]: value }
    setUsers(newUsers)
  }

  const addNewRow = () => {
    const newUser: UserData = {
      id: nextId,
      name: '',
      address: '',
      email: '',
      age: 0,
      joinDate: '',
      employmentStatus: '재직'
    }
    
    setUsers([...users, newUser])
    setEditingRows([...editingRows, true])
    setNextId(nextId + 1)
  }

  const deleteSelectedRows = () => {
    const newUsers = users.filter((_, index) => !checkedItems[index])
    const newEditingRows = editingRows.filter((_, index) => !checkedItems[index])
    
    setUsers(newUsers)
    setEditingRows(newEditingRows)
  }

  const hasSelectedItems = getSelectedCount() > 0

  return (
    <div className="table-grid-page">
      <h1>행 추가/삭제</h1>
      
      <div className="action-buttons">
        <button className="add-button" onClick={addNewRow}>
          행 추가
        </button>
        <button 
          className="delete-button" 
          onClick={deleteSelectedRows}
          disabled={!hasSelectedItems}
        >
          행 삭제
        </button>
      </div>

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
                  aria-label={`${user.name || '새 행'} 행 선택`}
                />
              </td>
              <td>
                {editingRows[index] ? (
                  <input 
                    type="text"
                    value={user.name}
                    onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                    placeholder="이름 입력"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="address-column">
                {editingRows[index] ? (
                  <input 
                    type="text"
                    value={user.address}
                    onChange={(e) => handleFieldChange(index, 'address', e.target.value)}
                    placeholder="주소 입력"
                  />
                ) : (
                  user.address
                )}
              </td>
              <td className="email-column">
                {editingRows[index] ? (
                  <input 
                    type="email"
                    value={user.email}
                    onChange={(e) => handleFieldChange(index, 'email', e.target.value)}
                    placeholder="이메일 입력"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingRows[index] ? (
                  <input 
                    type="number"
                    value={user.age || ''}
                    onChange={(e) => handleFieldChange(index, 'age', parseInt(e.target.value) || 0)}
                    placeholder="나이"
                  />
                ) : (
                  user.age
                )}
              </td>
              <td>
                {editingRows[index] ? (
                  <input 
                    type="text"
                    value={user.joinDate}
                    onChange={(e) => handleFieldChange(index, 'joinDate', e.target.value)}
                    placeholder="YYYY-MM-DD"
                  />
                ) : (
                  user.joinDate
                )}
              </td>
              <td>
                {editingRows[index] ? (
                  <div>
                    <label>
                      <input 
                        type="radio" 
                        name={`status-${user.id}`}
                        value="재직"
                        checked={user.employmentStatus === '재직'}
                        onChange={(e) => handleFieldChange(index, 'employmentStatus', e.target.value)}
                      />
                      재직
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        name={`status-${user.id}`}
                        value="휴직"
                        checked={user.employmentStatus === '휴직'}
                        onChange={(e) => handleFieldChange(index, 'employmentStatus', e.target.value)}
                      />
                      휴직
                    </label>
                  </div>
                ) : (
                  user.employmentStatus
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {users.length === 0 && (
        <div className="empty-message">
          데이터가 없습니다. 행을 추가해보세요.
        </div>
      )}
    </div>
  )
}

export default RowAddDelete 