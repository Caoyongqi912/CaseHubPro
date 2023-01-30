import { API } from '@/api';

export default function (initialState: { currentUser: API.IUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    isAdmin: currentUser && currentUser.isAdmin,
  };
}
