import { api } from '../library/axios';
import { API_ROUTE } from '../const/apiRouter';

interface GetListRolesParams {
  token: string;
  lang?: string;
  skip?: number;     
  limit?: number; 
  zone_name?: string;         // thêm param filter
  building_type?: string;     // thêm param filter
  status?: string;            // thêm param filter
  direction?: string;         // thêm param filter
}

export const getListRoles = async ({
  token,
  lang = 'vi',
  skip,
  limit,
  zone_name,
  building_type,
  status,
  direction,
}: GetListRolesParams) => {
  const response = await api.get(API_ROUTE.GET_LIST_DETAIL_ECOPARK, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      lang,
      skip,
      limit,
      zone_name,
      building_type,
      status,
      direction,
    },
  });

  return {
  items: response.data.items,
  total: response.data.count,
  };
};

// export const getAllRoles = async ({
//   token,
//   lang = 'vi',
// }: Omit<GetListRolesParams, 'skip' | 'limit' | 'zone_name' | 'building_type' | 'status' | 'direction'>) => {
//   const response = await api.get(API_ROUTE.GET_LIST_DETAIL_ECOPARK, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     params: {
//       lang,
//     },
//   });

//   return {
//     data: response.data.data,
//     total: response.data.count,
//   };
// };
