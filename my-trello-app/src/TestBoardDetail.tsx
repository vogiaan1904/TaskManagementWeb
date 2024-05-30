// TestBoardDetail.tsx
import BoardDetail from './components/BoardDetail';

function TestBoardDetail() {
  const mockUser = { id: 1, fullname: "Test User", email: "test@example.com" };
  return <BoardDetail user={mockUser} onLogout={() => {}} />;
}

export default TestBoardDetail;