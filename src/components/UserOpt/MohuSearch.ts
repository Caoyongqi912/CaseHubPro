import { searchUser } from '@/api/user';
import { API } from '@/api';

interface SearchUser {
  value: number | undefined;
  label: string | undefined;
}

const MohuSearch = async (params: any) => {
  let res: SearchUser[] = [];
  const searchData: API.IMoHuSearchUser = {
    target: 'username',
    value: params.keyWords,
  };
  let { data } = await searchUser(searchData);
  data.map((item: API.IUser) => {
    let users: SearchUser = {
      label: item.username,
      value: item.id,
    };
    res.push(users);
  });
  return res;
};

export default MohuSearch;
