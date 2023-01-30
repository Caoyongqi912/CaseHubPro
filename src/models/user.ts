import { useCallback, useState } from 'react';
import { API } from '@/api';

export default function () {
  const [user, setUser] = useState<API.ILoginParams>();

  const login = useCallback((username: string, password: string) => {
    setUser({
      username: username,
      password: password,
    });
  }, []);

  const logout = useCallback(() => {
    setUser({} as API.ILoginParams);
  }, []);

  return {
    user,
    login,
    logout,
  };
}
