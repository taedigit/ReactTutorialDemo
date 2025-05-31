import { useState } from 'react'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'


interface Post {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
  views: number
}

const PopupDemo = () => {
  const [basicModal, setBasicModal] = useState(false)
  const [formModal, setFormModal] = useState(false)
  const [largeModal, setLargeModal] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [warningDialog, setWarningDialog] = useState(false)
  
  // 게시판 관련 state
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: '첫 번째 게시글입니다',
      content: '안녕하세요! 이것은 첫 번째 게시글의 내용입니다.\n\n여러 줄에 걸쳐 작성된 내용을 확인할 수 있습니다.',
      author: '관리자',
      createdAt: '2024-01-15',
      views: 42
    },
    {
      id: 2,
      title: 'React 팝업 구현 방법',
      content: 'React에서 모달과 팝업을 구현하는 다양한 방법들을 소개합니다.\n\n1. Portal 사용\n2. State 관리\n3. 이벤트 핸들링',
      author: '개발자',
      createdAt: '2024-01-14',
      views: 128
    },
    {
      id: 3,
      title: '게시판 기능 추가 완료',
      content: '팝업 호출 페이지에 게시판 기능이 성공적으로 추가되었습니다!',
      author: '개발팀',
      createdAt: '2024-01-13',
      views: 67
    }
  ])
  const [postModal, setPostModal] = useState(false)
  const [writeModal, setWriteModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [deletePostDialog, setDeletePostDialog] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [postToDelete, setPostToDelete] = useState<number | null>(null)
  const [nextPostId, setNextPostId] = useState(4)
  
  const [postForm, setPostForm] = useState({
    title: '',
    content: '',
    author: ''
  })
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const [messages, setMessages] = useState<string[]>([])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessages(prev => [...prev, `폼 제출: ${formData.name} (${formData.email})`])
    setFormData({ name: '', email: '', message: '' })
    setFormModal(false)
  }

  const handleConfirm = () => {
    setMessages(prev => [...prev, '확인 버튼이 클릭되었습니다.'])
  }

  const handleDelete = () => {
    setMessages(prev => [...prev, '삭제가 실행되었습니다.'])
  }

  const handleWarning = () => {
    setMessages(prev => [...prev, '경고 확인됨.'])
  }

  // 게시판 관련 함수들
  const handlePostClick = (post: Post) => {
    // 조회수 증가
    setPosts(prev => prev.map(p => 
      p.id === post.id ? { ...p, views: p.views + 1 } : p
    ))
    setSelectedPost({ ...post, views: post.views + 1 })
    setPostModal(true)
  }

  const handleWritePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!postForm.title.trim() || !postForm.content.trim() || !postForm.author.trim()) {
      alert('모든 필드를 입력해주세요.')
      return
    }

    const newPost: Post = {
      id: nextPostId,
      title: postForm.title,
      content: postForm.content,
      author: postForm.author,
      createdAt: new Date().toISOString().split('T')[0],
      views: 0
    }

    // axios.post 인터페이스 전달 예시
    try {
      // 실제 요청은 주석 처리
      // await axios.post('/api/posts', newPost)
      console.log('axios.post("/api/posts",', newPost, ')')
    } catch (err) {
      console.error('axios.post error', err)
    }

    setPosts(prev => [newPost, ...prev])
    setPostForm({ title: '', content: '', author: '' })
    setWriteModal(false)
    setNextPostId(prev => prev + 1)
    setMessages(prev => [...prev, '새 게시글이 작성되었습니다.'])
  }

  const handleEditPost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPost || !postForm.title.trim() || !postForm.content.trim()) {
      alert('모든 필드를 입력해주세요.')
      return
    }

    const updatedPost: Post = {
      ...selectedPost,
      title: postForm.title,
      content: postForm.content
    }

    // axios.put 인터페이스 전달 예시
    try {
      // 실제 요청은 주석 처리
      // await axios.put(`/api/posts/${updatedPost.id}`, updatedPost)
      console.log(`axios.put("/api/posts/${updatedPost.id}",`, updatedPost, ")")
    } catch (err) {
      console.error('axios.put error', err)
    }

    setPosts(prev => prev.map(p => 
      p.id === selectedPost.id 
        ? { ...p, title: postForm.title, content: postForm.content }
        : p
    ))
    
    setPostForm({ title: '', content: '', author: '' })
    setEditModal(false)
    setSelectedPost(null)
    setMessages(prev => [...prev, '게시글이 수정되었습니다.'])
  }

  const handleDeletePost = () => {
    if (postToDelete) {
      setPosts(prev => prev.filter(p => p.id !== postToDelete))
      setMessages(prev => [...prev, '게시글이 삭제되었습니다.'])
      setPostToDelete(null)
      setPostModal(false)
      setSelectedPost(null)
    }
  }

  const openEditModal = (post: Post) => {
    setSelectedPost(post)
    setPostForm({
      title: post.title,
      content: post.content,
      author: post.author
    })
    setPostModal(false)
    setEditModal(true)
  }

  const openDeleteDialog = (postId: number) => {
    setPostToDelete(postId)
    setDeletePostDialog(true)
  }

  return (
    <div className="popup-demo-page">
      <h1>팝업 호출</h1>
      
      <div className="popup-section">
        <h2>모달 팝업</h2>
        <div className="popup-buttons">
          <button className="popup-button" onClick={() => setBasicModal(true)}>
            기본 모달
          </button>
          <button className="popup-button" onClick={() => setFormModal(true)}>
            폼 모달
          </button>
          <button className="popup-button" onClick={() => setLargeModal(true)}>
            큰 모달
          </button>
        </div>
      </div>

      <div className="popup-section">
        <h2>확인 다이얼로그</h2>
        <div className="popup-buttons">
          <button className="popup-button primary" onClick={() => setConfirmDialog(true)}>
            기본 확인
          </button>
          <button className="popup-button danger" onClick={() => setDeleteDialog(true)}>
            삭제 확인
          </button>
          <button className="popup-button warning" onClick={() => setWarningDialog(true)}>
            경고 확인
          </button>
        </div>
      </div>

      {/* 게시판 섹션 */}
      <div className="popup-section">
        <div className="board-header">
          <h2>게시판</h2>
          <button 
            className="popup-button primary" 
            onClick={() => {
              setPostForm({ title: '', content: '', author: '' })
              setWriteModal(true)
            }}
          >
            글쓰기
          </button>
        </div>
        
        <div className="board-table">
          <table className="post-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>번호</th>
                <th>제목</th>
                <th style={{ width: '100px' }}>작성자</th>
                <th style={{ width: '100px' }}>작성일</th>
                <th style={{ width: '60px' }}>조회</th>
                <th style={{ width: '100px' }}>관리</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td 
                    className="post-title"
                    onClick={() => handlePostClick(post)}
                  >
                    {post.title}
                  </td>
                  <td>{post.author}</td>
                  <td>{post.createdAt}</td>
                  <td>{post.views}</td>
                  <td>
                    <button 
                      className="edit-btn"
                      onClick={() => openEditModal(post)}
                    >
                      수정
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => openDeleteDialog(post.id)}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="popup-section">
          <h2>실행 결과</h2>
          <div className="message-log">
            {messages.map((message, index) => (
              <div key={index} className="log-message">
                {message}
              </div>
            ))}
            <button 
              className="clear-log-button"
              onClick={() => setMessages([])}
            >
              로그 지우기
            </button>
          </div>
        </div>
      )}

      {/* 기본 모달 */}
      <Modal
        isOpen={basicModal}
        onClose={() => setBasicModal(false)}
        title="기본 모달"
      >
        <div>
          <p>이것은 기본 모달입니다.</p>
          <p>ESC 키를 누르거나 배경을 클릭하여 닫을 수 있습니다.</p>
          <button onClick={() => setBasicModal(false)}>
            닫기
          </button>
        </div>
      </Modal>

      {/* 폼 모달 */}
      <Modal
        isOpen={formModal}
        onClose={() => setFormModal(false)}
        title="폼 입력"
        width="600px"
      >
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="name">이름:</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">이메일:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">메시지:</label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              rows={4}
            />
          </div>
          <div className="form-buttons">
            <button type="submit">제출</button>
            <button type="button" onClick={() => setFormModal(false)}>
              취소
            </button>
          </div>
        </form>
      </Modal>

      {/* 큰 모달 */}
      <Modal
        isOpen={largeModal}
        onClose={() => setLargeModal(false)}
        title="큰 모달"
        width="800px"
        height="600px"
      >
        <div>
          <h3>큰 크기의 모달입니다</h3>
          <p>이 모달은 더 큰 크기로 설정되었습니다.</p>
          <div style={{ height: '400px', background: '#f5f5f5', padding: '20px', marginTop: '20px' }}>
            <h4>콘텐츠 영역</h4>
            <p>여기에 많은 콘텐츠를 넣을 수 있습니다.</p>
            <ul>
              <li>항목 1</li>
              <li>항목 2</li>
              <li>항목 3</li>
              <li>항목 4</li>
              <li>항목 5</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* 게시글 조회 모달 */}
      <Modal
        isOpen={postModal}
        onClose={() => {
          setPostModal(false)
          setSelectedPost(null)
        }}
        title="게시글 상세"
        width="700px"
      >
        {selectedPost && (
          <div className="post-detail">
            <div className="post-header">
              <h3>{selectedPost.title}</h3>
              <div className="post-meta">
                <span>작성자: {selectedPost.author}</span>
                <span>작성일: {selectedPost.createdAt}</span>
                <span>조회수: {selectedPost.views}</span>
              </div>
            </div>
            <div className="post-content">
              {selectedPost.content.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
            <div className="post-actions">
              <button 
                className="edit-button"
                onClick={() => openEditModal(selectedPost)}
              >
                수정
              </button>
              <button 
                className="delete-button"
                onClick={() => openDeleteDialog(selectedPost.id)}
              >
                삭제
              </button>
              <button 
                onClick={() => {
                  setPostModal(false)
                  setSelectedPost(null)
                }}
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* 게시글 작성 모달 */}
      <Modal
        isOpen={writeModal}
        onClose={() => {
          setWriteModal(false)
          setPostForm({ title: '', content: '', author: '' })
        }}
        title="게시글 작성"
        width="700px"
      >
        <form onSubmit={handleWritePost}>
          <div className="form-group">
            <label htmlFor="postTitle">제목:</label>
            <input
              type="text"
              id="postTitle"
              value={postForm.title}
              onChange={(e) => setPostForm(prev => ({ ...prev, title: e.target.value }))}
              required
              placeholder="게시글 제목을 입력하세요"
            />
          </div>
          <div className="form-group">
            <label htmlFor="postAuthor">작성자:</label>
            <input
              type="text"
              id="postAuthor"
              value={postForm.author}
              onChange={(e) => setPostForm(prev => ({ ...prev, author: e.target.value }))}
              required
              placeholder="작성자명을 입력하세요"
            />
          </div>
          <div className="form-group">
            <label htmlFor="postContent">내용:</label>
            <textarea
              id="postContent"
              value={postForm.content}
              onChange={(e) => setPostForm(prev => ({ ...prev, content: e.target.value }))}
              rows={10}
              required
              placeholder="게시글 내용을 입력하세요"
            />
          </div>
          <div className="form-buttons">
            <button type="submit">작성</button>
            <button 
              type="button" 
              onClick={() => {
                setWriteModal(false)
                setPostForm({ title: '', content: '', author: '' })
              }}
            >
              취소
            </button>
          </div>
        </form>
      </Modal>

      {/* 게시글 수정 모달 */}
      <Modal
        isOpen={editModal}
        onClose={() => {
          setEditModal(false)
          setPostForm({ title: '', content: '', author: '' })
          setSelectedPost(null)
        }}
        title="게시글 수정"
        width="700px"
      >
        <form onSubmit={handleEditPost}>
          <div className="form-group">
            <label htmlFor="editTitle">제목:</label>
            <input
              type="text"
              id="editTitle"
              value={postForm.title}
              onChange={(e) => setPostForm(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="editContent">내용:</label>
            <textarea
              id="editContent"
              value={postForm.content}
              onChange={(e) => setPostForm(prev => ({ ...prev, content: e.target.value }))}
              rows={10}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit">수정</button>
            <button 
              type="button" 
              onClick={() => {
                setEditModal(false)
                setPostForm({ title: '', content: '', author: '' })
                setSelectedPost(null)
              }}
            >
              취소
            </button>
          </div>
        </form>
      </Modal>

      {/* 확인 다이얼로그들 */}
      <ConfirmDialog
        isOpen={confirmDialog}
        onClose={() => setConfirmDialog(false)}
        onConfirm={handleConfirm}
        message="이 작업을 계속하시겠습니까?"
      />

      <ConfirmDialog
        isOpen={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        onConfirm={handleDelete}
        title="삭제 확인"
        message="정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        confirmText="삭제"
        confirmButtonStyle="danger"
      />

      <ConfirmDialog
        isOpen={warningDialog}
        onClose={() => setWarningDialog(false)}
        onConfirm={handleWarning}
        title="경고"
        message="주의: 이 작업은 시스템에 영향을 줄 수 있습니다."
        confirmText="계속"
        confirmButtonStyle="warning"
      />

      {/* 게시글 삭제 확인 다이얼로그 */}
      <ConfirmDialog
        isOpen={deletePostDialog}
        onClose={() => {
          setDeletePostDialog(false)
          setPostToDelete(null)
        }}
        onConfirm={handleDeletePost}
        title="게시글 삭제"
        message="정말로 이 게시글을 삭제하시겠습니까? 삭제된 게시글은 복구할 수 없습니다."
        confirmText="삭제"
        confirmButtonStyle="danger"
      />
    </div>
  )
}

export default PopupDemo 