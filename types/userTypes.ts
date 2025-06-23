export interface UserPublic {
    id: string;
    email: string;
    full_name: string;
    is_active: boolean;
    phone: string | null; // Có thể là null
    creation_time: string; // ISO 8601
    last_login: string | null; // Có thể là null
    last_logout: string | null; // Có thể là null
    projects: any[]; // Hoặc định nghĩa kiểu cho projects nếu có
    role_assignment_time: string | null; // Có thể là null
  }