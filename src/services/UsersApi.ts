import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GetUserResponse } from './types';

  export const getUsersData= async () => {
    const { data } = await axios.get<GetUserResponse>(`https://jsonplaceholder.typicode.com/users`);
    return data;
  };

  export const usegetUsers = ()=>{
    return useQuery<GetUserResponse ,undefined >({
        queryKey: ['Users'],
        queryFn: getUsersData,
      })
  }
 
