// "use client";

// import {
//   Box,
//   Button,
//   Group,
//   LoadingOverlay,
//   NativeSelect,
//   Textarea,
//   TextInput,
// } from "@mantine/core";
// import { useForm, isNotEmpty } from "@mantine/form";
// import { useDisclosure } from "@mantine/hooks";
// import { modals } from "@mantine/modals";
// import { IconCheck, IconChevronDown, IconX } from "@tabler/icons-react";
// import { useEffect } from "react";
// import { API_ROUTE } from "../../../const/apiRouter";
// import { api } from "../../../library/axios";
// import { CreateProjectPayload } from "../../../api/apigetproject";

// interface EditViewProps {
//   onSearch: () => Promise<void>;
//   role: CreateProjectPayload; // nhận toàn bộ object project
//   language?: "vi" | "en";
// }

// const EditView = ({ onSearch, role, language = "vi" }: EditViewProps) => {
//   const [visible, { open, close }] = useDisclosure(false);

//   const form = useForm<CreateProjectPayload>({
//     initialValues: { ...role },
//     validate: {
//       building_name: isNotEmpty(
//         language === "vi" ? "Tên nhà không được để trống" : "Building Name cannot be empty"
//       ),
//       bedroom: isNotEmpty(
//         language === "vi" ? "Số phòng không được để trống" : "Bedroom cannot be empty"
//       ),
//       zone_name: isNotEmpty(
//         language === "vi" ? "Tên khu không được để trống" : "Zone Name cannot be empty"
//       ),
//       building_type: isNotEmpty(
//         language === "vi" ? "Loại nhà không được để trống" : "Building Type cannot be empty"
//       ),
//       direction: isNotEmpty(
//         language === "vi" ? "Hướng nhà không được để trống" : "Direction cannot be empty"
//       ),
//       status: isNotEmpty(
//         language === "vi" ? "Trạng thái không được để trống" : "Status cannot be empty"
//       ),
//     },
//   });

//   useEffect(() => {
//     form.setValues(role);
//   }, [role]);

//   const handleSubmit = async (values: CreateProjectPayload) => {
//     open();
//     try {
//       const url =
//         API_ROUTE.EDIT_LIST_DETAIL_ECOPARK.replace("{ecopark_id}", role.id) +
//         `?lang=${language}`;

//       // Map lại các field gửi lên API với tên khác
//       const payload = {
//         zone_name_vi: values.zone_name,
//         building_type_vi: values.building_type,
//         building_name: values.building_name,
//         bedroom: Number(values.bedroom),
//         direction_vi: values.direction,
//         status_vi: values.status,
//         price: Number(values.price),
//         description_vi:
//           typeof values.description === "string"
//             ? values.description
//             : JSON.stringify(values.description),
//       };

//       const response = await api.patch(url, payload);

//       if (response.status === 200) {
//         await onSearch();
//         modals.closeAll();
//       } else {
//         modals.open({
//           title: language === "vi" ? "Lỗi" : "Error",
//           children: (
//             <div>
//               {language === "vi"
//                 ? `Server trả status ${response.status}`
//                 : `Server returned status ${response.status}`}
//             </div>
//           ),
//         });
//       }
//     } catch (error: any) {
//       modals.open({
//         title: language === "vi" ? "Lỗi" : "Error",
//         children: (
//           <div>
//             {language === "vi"
//               ? "Đã xảy ra lỗi khi cập nhật dự án. Xem console để biết chi tiết."
//               : "An error occurred while updating the project. Check console for details."}
//           </div>
//         ),
//       });
//     } finally {
//       close();
//     }
//   };

//   return (
//     <Box component="form" miw={320} mx="auto" onSubmit={form.onSubmit(handleSubmit)}>
//       <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

//       <TextInput
//         label={language === "vi" ? "Tên khu" : "Zone Name"}
//         placeholder={language === "vi" ? "Nhập khu" : "Enter zone name"}
//         withAsterisk
//         readOnly
//         mt="md"
//         {...form.getInputProps("zone_name")}
//       />

//       <TextInput
//         label={language === "vi" ? "Loại nhà" : "Building Type"}
//         placeholder={language === "vi" ? "Nhập loại nhà" : "Enter building type"}
//         withAsterisk
//         readOnly
//         mt="md"
//         {...form.getInputProps("building_type")}
//       />

//       <TextInput
//         label={language === "vi" ? "Tên nhà" : "Building Name"}
//         placeholder={language === "vi" ? "Nhập tên nhà" : "Enter building name"}
//         withAsterisk
//         readOnly
//         mt="md"
//         {...form.getInputProps("building_name")}
//       />

//       <TextInput
//         label={language === "vi" ? "Số phòng" : "Bedroom"}
//         placeholder={language === "vi" ? "Nhập số phòng" : "Enter bedroom"}
//         withAsterisk
//         mt="md"
//         {...form.getInputProps("bedroom")}
//       />

//       <NativeSelect
//         rightSection={<IconChevronDown size={16} />}
//         label={language === "vi" ? "Hướng nhà" : "Direction"}
//         data={language === "vi" ? ["Đông", "Tây", "Nam", "Bắc"] : ["East", "West", "South", "North"]}
//         mt="md"
//         {...form.getInputProps("direction")}
//       />

//       <NativeSelect
//         rightSection={<IconChevronDown size={16} />}
//         label={language === "vi" ? "Trạng thái" : "Status"}
//         data={language === "vi" ? ["Đang bán", "Đã đặt cọc", "Đã bán"] : ["Available", "Deposit Paid", "Sold"]}
//         mt="md"
//         {...form.getInputProps("status")}
//       />

//       <TextInput
//   label={language === "vi" ? "Giá" : "Price"}
//   placeholder={language === "vi" ? "Nhập giá" : "Enter price"}
//   withAsterisk
//   mt="md"
//   value={
//     form.values.price
//       ? Number(form.values.price).toLocaleString("vi-VN") // format số theo chuẩn VN
//       : ""
//   }
//   onChange={(event) => {
//     // Loại bỏ mọi ký tự không phải số
//     const raw = event.currentTarget.value.replace(/\D/g, "");
//     form.setFieldValue("price", raw);
//   }}
// />


//       <Textarea
//         resize="vertical"
//         placeholder={language === "vi" ? "Nhập mô tả" : "Enter description"}
//         label={language === "vi" ? "Mô tả" : "Description"}
//         {...form.getInputProps("description")}
//       />

//       <Group justify="flex-end" mt="lg">
//         <Button type="submit" color="#3598dc" loading={visible} leftSection={<IconCheck size={18} />}>
//           {language === "vi" ? "Lưu" : "Save"}
//         </Button>
//         <Button
//           variant="outline"
//           color="black"
//           type="button"
//           loading={visible}
//           onClick={() => modals.closeAll()}
//           leftSection={<IconX size={18} />}
//         >
//           {language === "vi" ? "Đóng" : "Close"}
//         </Button>
//       </Group>
//     </Box>
//   );
// };

// export default EditView;
"use client";

import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  NativeSelect,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconCheck, IconChevronDown, IconX } from "@tabler/icons-react";
import { useEffect } from "react";
import { API_ROUTE } from "../../../const/apiRouter";
import { api } from "../../../library/axios";
import { CreateProjectPayload } from "../../../api/apigetproject";

interface EditViewProps {
  onSearch: () => Promise<void>;
  role: CreateProjectPayload; // nhận toàn bộ object project
  language?: "vi" | "en";
}

const EditView = ({ onSearch, role, language = "vi" }: EditViewProps) => {
  const [visible, { open, close }] = useDisclosure(false);

  const form = useForm<CreateProjectPayload>({
    initialValues: { ...role },
    validate: {
      building_name: isNotEmpty(
        language === "vi" ? "Tên nhà không được để trống" : "Building Name cannot be empty"
      ),
      bedroom: isNotEmpty(
        language === "vi" ? "Số phòng không được để trống" : "Bedroom cannot be empty"
      ),
      zone_name: isNotEmpty(
        language === "vi" ? "Tên khu không được để trống" : "Zone Name cannot be empty"
      ),
      building_type: isNotEmpty(
        language === "vi" ? "Loại nhà không được để trống" : "Building Type cannot be empty"
      ),
      direction: isNotEmpty(
        language === "vi" ? "Hướng nhà không được để trống" : "Direction cannot be empty"
      ),
      status: isNotEmpty(
        language === "vi" ? "Trạng thái không được để trống" : "Status cannot be empty"
      ),
    },
  });

  useEffect(() => {
    form.setValues(role);
  }, [role]);

  const handleSubmit = async (values: CreateProjectPayload) => {
    open();
    try {
      const url =
        API_ROUTE.EDIT_LIST_DETAIL_ECOPARK.replace("{ecopark_id}", role.id) +
        `?lang=${language}`;

      // Tạo payload với các trường phù hợp với ngôn ngữ
      const payload: any = {
        building_name: values.building_name,
        bedroom: Number(values.bedroom),
        price: Number(values.price),
        description: typeof values.description === "string" 
          ? values.description 
          : JSON.stringify(values.description),
      };

      if (language === "vi") {
        payload.zone_name_vi = values.zone_name;
        payload.building_type_vi = values.building_type;
        payload.direction_vi = values.direction;
        payload.status_vi = values.status;
          payload. description_vi = values.description;        

      } else {
        payload.zone_name_en = values.zone_name;
        payload.building_type_en = values.building_type;
        payload.direction_en = values.direction;
        payload.status_en = values.status;
        payload. description_en = values. description;
      }

      const response = await api.patch(url, payload);

      if (response.status === 200) {
        await onSearch();
        modals.closeAll();
      } else {
        modals.open({
          title: language === "vi" ? "Lỗi" : "Error",
          children: (
            <div>
              {language === "vi"
                ? `Server trả status ${response.status}`
                : `Server returned status ${response.status}`}
            </div>
          ),
        });
      }
    } catch (error: any) {
      modals.open({
        title: language === "vi" ? "Lỗi" : "Error",
        children: (
          <div>
            {language === "vi"
              ? "Đã xảy ra lỗi khi cập nhật dự án. Xem console để biết chi tiết."
              : "An error occurred while updating the project. Check console for details."}
          </div>
        ),
      });
    } finally {
      close();
    }
  };

  return (
    <Box component="form" miw={320} mx="auto" onSubmit={form.onSubmit(handleSubmit)}>
      <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

      <TextInput
        label={language === "vi" ? "Tên khu" : "Zone Name"}
        placeholder={language === "vi" ? "Nhập khu" : "Enter zone name"}
        withAsterisk
        readOnly
        mt="md"
        {...form.getInputProps("zone_name")}
      />

      <TextInput
        label={language === "vi" ? "Loại nhà" : "Building Type"}
        placeholder={language === "vi" ? "Nhập loại nhà" : "Enter building type"}
        withAsterisk
        readOnly
        mt="md"
        {...form.getInputProps("building_type")}
      />

      <TextInput
        label={language === "vi" ? "Tên nhà" : "Building Name"}
        placeholder={language === "vi" ? "Nhập tên nhà" : "Enter building name"}
        withAsterisk
        readOnly
        mt="md"
        {...form.getInputProps("building_name")}
      />

      <TextInput
        label={language === "vi" ? "Số phòng" : "Bedroom"}
        placeholder={language === "vi" ? "Nhập số phòng" : "Enter bedroom"}
        withAsterisk
        mt="md"
        {...form.getInputProps("bedroom")}
      />

      <NativeSelect
        rightSection={<IconChevronDown size={16} />}
        label={language === "vi" ? "Hướng nhà" : "Direction"}
        data={language === "vi" ? ["Đông", "Tây", "Nam", "Bắc"] : ["East", "West", "South", "North"]}
        mt="md"
        {...form.getInputProps("direction")}
      />

      <NativeSelect
        rightSection={<IconChevronDown size={16} />}
        label={language === "vi" ? "Trạng thái" : "Status"}
        data={language === "vi" ? ["Đang bán", "Đã đặt cọc", "Đã bán"] : ["Available", "Deposit Paid", "Sold"]}
        mt="md"
        {...form.getInputProps("status")}
      />

      <TextInput
        label={language === "vi" ? "Giá" : "Price"}
        placeholder={language === "vi" ? "Nhập giá" : "Enter price"}
        withAsterisk
        mt="md"
        value={
          form.values.price
            ? Number(form.values.price).toLocaleString("vi-VN") // format số theo chuẩn VN
            : ""
        }
        onChange={(event) => {
          // Loại bỏ mọi ký tự không phải số
          const raw = event.currentTarget.value.replace(/\D/g, "");
          form.setFieldValue("price", raw);
        }}
      />

      <Textarea
        resize="vertical"
        placeholder={language === "vi" ? "Nhập mô tả" : "Enter description"}
        label={language === "vi" ? "Mô tả" : "Description"}
        {...form.getInputProps("description")}
      />

      <Group justify="flex-end" mt="lg">
        <Button type="submit" color="#3598dc" loading={visible} leftSection={<IconCheck size={18} />}>
          {language === "vi" ? "Lưu" : "Save"}
        </Button>
        <Button
          variant="outline"
          color="black"
          type="button"
          loading={visible}
          onClick={() => modals.closeAll()}
          leftSection={<IconX size={18} />}
        >
          {language === "vi" ? "Đóng" : "Close"}
        </Button>
      </Group>
    </Box>
  );
};

export default EditView;






