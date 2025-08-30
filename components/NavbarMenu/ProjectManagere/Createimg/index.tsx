// 'use client';

// import { useState } from 'react';
// import { Box, Button, FileInput, Group, LoadingOverlay } from '@mantine/core';
// import { IconCheck, IconX } from '@tabler/icons-react';
// import { apiarea } from "../../../../library/axios";
// import { API_ROUTE } from "../../../../const/apiRouter";

// type CreateProps = {
//   port?: number;
//   onSearch: () => void;
//   language: 'vi' | 'en';
//   onClose?: () => void;
// };

// const ViewCreate = ({ port, onSearch, language, onClose }: CreateProps) => {
//   const [files, setFiles] = useState<File[]>([]);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (files.length === 0) {
//       alert(language === 'vi' ? 'Vui lòng chọn ít nhất 1 file' : 'Please select at least one file');
//       return;
//     }

//     if (!port) {
//       alert('Missing API port');
//       return;
//     }

//     setLoading(true);

//     try {
//       const formData = new FormData();
//       files.forEach((file) => formData.append("files", file));

//       const url = `${API_ROUTE.CREATE_IMGE_BUILDING.replace("{port}", String(port))}?lang=${language}`;
//       const res = await apiarea.put(url, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log("✅ Upload success:", res.data);
//       onSearch();
//       alert(language === "vi" ? "Tải ảnh thành công!" : "Upload successful!");
//       if (onClose) onClose();
//     } catch (err: unknown) {
//       console.error("❌ Upload error:", err);

//       // kiểm tra nếu là AxiosError
//       if (typeof err === "object" && err !== null && "response" in err) {
//         // @ts-ignore
//         console.error("❌ Error response:", err.response?.data);
//       }

//       alert(language === "vi" ? "Có lỗi xảy ra khi tải ảnh" : "Error while uploading files");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box component="form" miw={320} mx="auto" onSubmit={handleSubmit}>
//       <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

//       <FileInput
//         label={language === "vi" ? "Tải ảnh lên" : "Upload files"}
//         placeholder={language === "vi" ? "Chọn file..." : "Select files..."}
//         multiple
//         value={files}
//         onChange={(value) => setFiles(value ?? [])}
//       />

//       <Group justify="flex-end" mt="lg">
//         <Button
//           type="submit"
//           color="#3598dc"
//           loading={loading}
//           leftSection={<IconCheck size={18} />}
//         >
//           {language === "vi" ? "Lưu" : "Save"}
//         </Button>
//         <Button
//           variant="outline"
//           color="black"
//           type="button"
//           leftSection={<IconX size={18} />}
//           onClick={onClose}
//         >
//           {language === "vi" ? "Đóng" : "Close"}
//         </Button>
//       </Group>
//     </Box>
//   );
// };

// export default ViewCreate;



