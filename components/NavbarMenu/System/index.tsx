"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiHealth,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonIcon,
  Criteria,
} from "@elastic/eui";
import { Divider, Text, Menu, Pill } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconFilterFilled } from "@tabler/icons-react";
import { modals } from "@mantine/modals";

import { getListRoles } from "../../../api/apigetlistsystym";
import CreateView from "./CreateView";
import DeleteView from "./DeleteView";
import EditView from "./EditView";
import AppAction from "../../../common/AppAction";
import AppSearch from "../../../common/AppSearch";
import { paginationBase, PaginationOptions } from "../../../_base/model/BaseTable";

type Role = {
  id: string;
  name: string;
  description: string;
  rank_total: number;
};

const RoleTable = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [filteredRoles, setFilteredRoles] = useState<Role[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Role[]>([]);
  const [pagination, setPagination] = useState<PaginationOptions>(paginationBase);

  // Filter states
  const [nameOptions, setNameOptions] = useState<string[]>([]);
  const [rankOptions, setRankOptions] = useState<string[]>([]);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [selectedRanks, setSelectedRanks] = useState<string[]>([]);

  // Fetch roles
  const fetchRoles = useCallback(async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("⚠️ Không tìm thấy token. Vui lòng đăng nhập.");
      setLoading(false);
      return;
    }

    try {
      const skip = pagination.pageIndex * pagination.pageSize;
      const limit = pagination.pageSize;

      const res = await getListRoles({ token, skip, limit });
      const { data, total } = res;

      const list: Role[] = data || [];
      setRoles(list);
      setFilteredRoles(list);

      const names: string[] = list.map((r) => String(r.name));
      const ranks: string[] = list.map((r) => String(r.rank_total));

      setNameOptions(Array.from(new Set(names)).sort());
      setRankOptions(
        Array.from(new Set(ranks)).sort((a, b) => parseInt(a) - parseInt(b))
      );

      setPagination((prev) => ({
        ...prev,
        totalItemCount: total ?? list.length,
      }));
    } catch (err: unknown) {
      console.error("❌ Lỗi gọi API:", err);
      setError(
        err instanceof Error ? err.message : "Đã xảy ra lỗi khi tải dữ liệu."
      );
    } finally {
      setLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  // Filter & Search
  useEffect(() => {
    let filtered = roles;

    if (searchQuery) {
      const lowerSearch = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(lowerSearch) ||
          r.description.toLowerCase().includes(lowerSearch) ||
          r.rank_total.toString().includes(lowerSearch)
      );
    }

    if (selectedNames.length > 0) {
      filtered = filtered.filter((r) => selectedNames.includes(r.name));
    }

    if (selectedRanks.length > 0) {
      filtered = filtered.filter((r) =>
        selectedRanks.includes(r.rank_total.toString())
      );
    }

    setFilteredRoles(filtered);
  }, [roles, searchQuery, selectedNames, selectedRanks]);

  // Filter dropdown component
  const FilterItem = ({
    label,
    options,
    selected,
    setSelected,
    iconType,
  }: {
    label: string;
    options: string[];
    selected: string[];
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
    iconType?: string;
  }) => {
    const [opened, setOpened] = useState(false);

    return (
      <Menu
        shadow="md"
        width={200}
        onOpen={() => setOpened(true)}
        onClose={() => setOpened(false)}
      >
        <Menu.Target>
          <Text
            size="sm"
            fw={500}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: selected.length > 0 ? "#1E88E5" : "#555",
            }}
          >
            {iconType && (
  <EuiButtonIcon
    iconType={iconType}
    aria-label={label}
    color={selected.length > 0 ? "primary" : "text"}
    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
    }}
    size="s"
  />
)} 
          {label}
            {opened ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
          </Text>
        </Menu.Target>
        <Menu.Dropdown>
          {options.map((opt) => (
            <Menu.Item
              key={opt}
              onClick={() =>
                setSelected((prev) =>
                  prev.includes(opt)
                    ? prev.filter((v) => v !== opt)
                    : [...prev, opt]
                )
              }
            >
              <Text
                size="sm"
                fw={selected.includes(opt) ? 600 : 400}
                c={selected.includes(opt) ? "blue" : "black"}
              >
                {opt}
              </Text>
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    );
  };

  // Modal handlers (giữ nguyên)
  const openModal = () => {
    modals.openConfirmModal({
      title: (
        <div style={{ fontWeight: 600, fontSize: 18 }}>Thêm vai trò mới</div>
      ),
      children: <CreateView onSearch={fetchRoles} />,
      size: "lg",
      radius: "md",
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
    });
  };

  const openEditUserModal = (role: Role) => {
    modals.openConfirmModal({
      title: (
        <div style={{ fontWeight: 600, fontSize: 18 }}>
          Chỉnh sửa vai trò: {role.description}
        </div>
      ),
      children: <EditView id={role.id} onSearch={fetchRoles} />,
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
    });
  };

  const openDeleteUserModal = (role: Role) => {
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>Xóa vai trò</div>,
      children: <DeleteView idItem={[role.id]} onSearch={fetchRoles} />,
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
    });
  };

  // Clear filters
  const clearFilters = () => {
    setSelectedNames([]);
    setSelectedRanks([]);
    setSelectedItems([]);
  };

  // Tạo danh sách filter đã chọn (giống code bạn gửi)
  const selectedFilters = [
    ...selectedNames,
    ...selectedRanks.map((r) => `Cấp ${r}`),
  ];
  const hasSelectedItems =
    selectedFilters.length > 0 || selectedItems.length > 0;

  const handleRemoveSelected = (item: string) => {
    setSelectedNames((prev) => prev.filter((n) => n !== item));
    setSelectedRanks((prev) =>
      prev.filter((r) => `Cấp ${r}` !== item && r !== item)
    );
  };

  const handleClearAll = () => {
    clearFilters();
  };

  // Table columns
  const columns: Array<EuiBasicTableColumn<Role>> = [
    { field: "name", name: "Tên", truncateText: true, width: "30%" },
    {
      field: "rank_total",
      name: "Cấp bậc",
      width: "20%",
      render: (rank: number) => <EuiHealth color="success">{rank}</EuiHealth>,
      truncateText: true,
    },
    { field: "description", name: "Mô tả", width: "30%" },
    {
      name: "Thao tác",
      width: "20%",
      render: (role: Role) => (
        <EuiFlexGroup gutterSize="s" wrap={false} alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              iconType="documentEdit"
              aria-label="Edit"
              color="success"
              onClick={() => openEditUserModal(role)}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              iconType="trash"
              aria-label="Delete"
              color="danger"
              onClick={() => openDeleteUserModal(role)}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      ),
    },
  ];

  const selection = {
    selectable: () => true,
    onSelectionChange: (items: Role[]) => setSelectedItems(items),
    selected: selectedItems,
  };

  const onTableChange = ({ page }: Criteria<Role>) => {
    if (page) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: page.index ?? 0,
        pageSize: page.size ?? 50,
      }));
    }
  };

  return (
    <>
      <AppAction openModal={openModal} />
      <Divider my="sm" />

      {/* Search bar */}
      <AppSearch
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onSearch={(val) => setSearchQuery(val)}
      />

      {/* ✅ Hiển thị tiêu chí đã chọn */}
      <div style={{ marginBottom: 12 }}>
        <h2>
          Lọc theo tiêu chí:
          {selectedFilters.map((item) => (
            <Pill
              key={item}
              withRemoveButton
              onRemove={() => handleRemoveSelected(item)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <IconFilterFilled size={12} />
                <span>{item}</span>
              </div>
            </Pill>
          ))}
          {hasSelectedItems && (
            <Pill
              onClick={handleClearAll}
              variant="outline"
              color="red"
              style={{ marginLeft: "8px" }}
            >
              Xóa tất cả
            </Pill>
          )}
        </h2>
      </div>

      {/* Filters */}
      <EuiFlexGroup style={{ margin: "12px 0" }} alignItems="flexEnd" gutterSize="m">
        <EuiFlexItem grow={false}>
          <FilterItem
            label="Chọn Tên"
            options={nameOptions}
            selected={selectedNames}
            setSelected={setSelectedNames}
           
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <FilterItem
            label="Chọn cấp độ"
            options={rankOptions}
            selected={selectedRanks}
            setSelected={setSelectedRanks}
            
          />
        </EuiFlexItem>
      </EuiFlexGroup>

      <Divider my="sm" />

      <EuiBasicTable
        tableCaption="Danh sách vai trò hệ thống"
        responsiveBreakpoint={false}
        items={filteredRoles}
        columns={columns}
        loading={loading}
        itemId="id"
        selection={selection}
        rowHeader="description"
        noItemsMessage={
          error ? error : loading ? "Đang tải dữ liệu..." : "Không có vai trò nào."
        }
        pagination={{
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          totalItemCount: filteredRoles.length ?? 0,
          pageSizeOptions: pagination.pageSizeOptions ?? [10, 20, 50, 150, 200],
        }}
        onChange={onTableChange}
      />
    </>
  );
};

export default RoleTable;




