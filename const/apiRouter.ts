export const API_ROUTE = {
    // HOME: "/trang-chu-hacom",
  
    // //Banner
    // GET_LIST_BANNER: "TblBanner/get-list",
  
  LOGIN: "/api/v1/login/access-token",
  REGISTER:"/api/v1/users/signup",
    SENDEMAIL: "/api/v1/password-recovery/{email}",
    LOGIN_USERNAME:"/api/v1/users/me",
    /////apiarea
    // GET_AREA:"/192.168.100.101/zone/pk",
    // GET_AREA_DETAIL:"/192.168.100.101/zone/pk/Phân Khu",
//  GET_AREA_DETAIL_BY_TYPE: (zone: string, buildingType: string) =>
//     `/192.168.100.101/zone/pk/${zone}/${buildingType}`,
//  GET_HOUSE_DETAIL: (
//   zone: string,
//   zoneName: string,
//   buildingType: string,
//   buildingName: string
// ) =>
//   `/192.168.100.101/zone/${zone}/${zoneName}/${buildingType}/${buildingName}`,

 
 
 PUT_SUN:"/192.168.100.101/all/0",
 PUT_SUN_SET:"/192.168.100.101/eff/6/1",
 PUT_NIGHT:"/192.168.100.101/all/1",

 //////Lighting//////
 POST_LIGHYING_1:"/192.168.100.101/eff/1/1",
 POST_LIGHYING_2:"/192.168.100.101/eff/2/1", 
  POST_LIGHYING_3:"/192.168.100.101/eff/3/1", 
 POST_LIGHYING_4:"/192.168.100.101/eff/4/1", 
  POST_LIGHYING_5:"/192.168.100.101/eff/5/1", 

///////utilities///
GET_UTILITIES:"/192.168.100.101/amenity/ti",
 GET_UTILITIES_DETAIL: (amenityType: string) =>
    `/192.168.100.101/amenity/ti/${amenityType}`,
 /// GET PROJECT
 GET_PROJECT:"/api/v1/projects",


/////video///
PUT_VIDEO:"/192.168.100.101/eff/7/1",
  ////FILTER/////
  GET_FILTER:"/api/v1/ecopark/{project_id}/filter",
  GET_FILTER_TYPE:"/api/v1/ecopark/{project_id}/filter_options",

///bản Tiếng Việt

  GET_AREA:"/api/v1/ecopark/{project_id}/zone/{zone_param}",
  GET_AREA_DETAIL:"/api/v1/ecopark/{project_id}/zone/{zone_param}/{zone_name_path}",
  GET_AREA_DETAIL_BY_TYPE:"/api/v1/ecopark/{project_id}/zone/{zone_param}/{zone_name_path}/{building_type_path}",
  GET_HOUSE_DETAIL:"/api/v1/ecopark/{project_id}/zone/{zone_param}/{zone_name_path}/{building_type_path}/{building_name_param}",
  GET_DETAIL_HOME:"/api/v1/ecopark/by_ports",
//// trang ADMIN
GET_LIST_USE:"/api/v1/users",
//   LOGIN: "/api/v1/login/access-token",
// LOGIN_USERNAME:"/api/v1/users/me",
DELETE_USERNAME: "/api/v1/users/{user_id}",
CREATE_USERNAME:"/api/v1/users",
EDIT_USERNAME:"/api/v1/users/{user_id}",
/////Roles
GET_LIST_ROLES:"/api/v1/roles/",
CREATE_ROLES:"/api/v1/roles/",
EDIT_ROLES:"/api/v1/roles/{user_id}",
DELETE_ROLES: "/api/v1/roles/{user_id}",
///system
GET_LIST_SYSTEM:"/api/v1/system/",
CREATE_SYSTEM:"/api/v1/system/",
EDIT_SYSTEM:"/api/v1/system/{user_id}",
DELETE_SYSTEM: "/api/v1/system/{user_id}",

///Projects
GET_LIST_PROJECTS: "/api/v1/projects/",
CREATE_PROJECTS: "/api/v1/projects/",
EDIT_PROJECTS: "/api/v1/projects/{project_id}",
DELETE_PROJECTS: "/api/v1/projects/{project_id}",

//Project Users
GET_LIST_PROJECT_USERS: "/api/v1/UserProjectRole/assignments/",
CREATE_PROJECT_USERS: "/api/v1/UserProjectRole/{project_id}",
EDIT_PROJECT_USERS: "/api/v1/UserProjectRole/{user_id}/{project_id}/{old_role_id}",
DELETE_PROJECT_USERS: "/api/v1/UserProjectRole/{user_project_role_id}",
GET_DETAIL_PROJECT_USERS: "/api/v1/UserProjectRole/{user_project_role_id}",

////GET LIST DETAL ecopark
GET_LIST_DETAIL_ECOPARK:"/api/v1/ecopark/",
EDIT_LIST_DETAIL_ECOPARK:"/api/v1/ecopark/{ecopark_id}",



///Bản Tiếng Anh


  };
