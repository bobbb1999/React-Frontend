// RequireAuth.js
import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

export function RequireAuth({ children }) {
  const { isLoggedIn , role } = useAuth();

  if (!isLoggedIn) {
    Swal.fire({
        icon: 'error',
        title: 'กรุณาล็อคอิน',
        showConfirmButton: false,
        timer: 2000
    });
    return <Navigate to="/Login" />;
  }
  // console.log("Role in RequireAuth:", role); // เพิ่มบรรทัดนี้
  return children;
}

export function AllowRole({ allowedRoles, children }) {
    const { role } = useAuth();
    // console.log("Role in AllowRole:", role); // เพิ่มบรรทัดนี้
    if (!allowedRoles || allowedRoles.includes(role)) {
      return children;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'คุณไม่มีสิทธิ์เข้าถึงหน้านี้',
        showConfirmButton: false,
        timer: 2000
      });
      return <Navigate to="/Homepage" />;
    }
  
    
  }
