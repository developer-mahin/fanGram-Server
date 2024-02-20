import config from '../config';
import User from '../modules/user/user.model';

const superAdmin = {
  email: config.super_admin_email,
  needsPasswordChange: false,
  password: config.super_admin_password,
  role: 'superAdmin',
  isDeleted: false,
  status: 'in-progress',
};

const seedSuperAdmin = async () => {
  // is super admin is not exist
  const isSuperAdminExist = await User.findOne({ role: 'superAdmin' });

  if (!isSuperAdminExist) {
    await User.create(superAdmin);
  }
};

export default seedSuperAdmin;
