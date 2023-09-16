const pool = require("../db.js");
// todo this function to student
const checkPermission = async (userId, permissionName) => {
  const userRoleQuery = "SELECT role_id FROM users WHERE user_id = $1";
  //* get role_name(ex:student,role_id:1)
  const userRole = await pool.query(userRoleQuery, [userId]);

  if (userRole.rows.length === 0) {
    return false;
  }

  const roleId = userRole.rows[0].role_id;
  // * query for To verify whether the student has a certain authority or not(true or false)
  const permissionQuery = `
      SELECT EXISTS (
        SELECT 1
        FROM role_permission
        WHERE role_id = $1 AND permission_id = (
          SELECT permission_id FROM permission WHERE permission_name = $2
        )
      )
    `;
  const hasPermission = await pool.query(permissionQuery, [
    roleId,
    permissionName,
  ]);
  return hasPermission.rows[0].exists;
};
module.exports = checkPermission;
