import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/apiCalls/profileApiCall";

function Users({ users }) {
  const dispatch = useDispatch();

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };
  return users.length ? (
    <div className="users-panel">
      <table className="users-table">
        <thead className="users-table-header">
          <tr className="users-table-header-row">
            <th className="users-table-header-item">المعرف</th>
            <th className="users-table-header-item">الاسم</th>
            <th className="users-table-header-item">خيارات</th>
          </tr>
        </thead>
        <tbody className="users-table-body">
          {users?.map((user) => (
            <tr key={user._id} className="users-table-body-row">
              <td className="users-table-body-item">{user._id}</td>
              <td className="users-table-body-item">{user.username}</td>
              <td className="users-table-body-item">
                {!user.isAdmin && (
                  <button
                    className="users-delete-button"
                    onClick={() => deleteUserHandler(user._id)}
                  >
                    حذف
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>لا توجد نتائج</p>
  );
}

export default Users;
