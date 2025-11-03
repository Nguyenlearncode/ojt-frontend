import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import SearchFilterRoleChakra from "../../../../features/role/components/SearchFilterRoleChakra";

const renderWithChakra = (ui: React.ReactElement) =>
  render(<ChakraProvider>{ui}</ChakraProvider>);

describe("🔍 SearchFilterRoleChakra", () => {
  it("🟢 render input với placeholder", () => {
    renderWithChakra(
      <SearchFilterRoleChakra searchTerm="" onSearchChange={() => {}} />
    );
    expect(screen.getByPlaceholderText("Tìm kiếm role...")).toBeInTheDocument();
  });

  it("🟠 gọi onSearchChange khi người dùng nhập", () => {
    const handleChange = vi.fn();
    renderWithChakra(
      <SearchFilterRoleChakra searchTerm="" onSearchChange={handleChange} />
    );

    const input = screen.getByPlaceholderText("Tìm kiếm role...");
    fireEvent.change(input, { target: { value: "Admin" } });

    expect(handleChange).toHaveBeenCalledWith("Admin");
  });

  it("🟢 hiển thị giá trị từ props searchTerm", () => {
    renderWithChakra(
      <SearchFilterRoleChakra searchTerm="Manager" onSearchChange={() => {}} />
    );

    const input = screen.getByDisplayValue("Manager");
    expect(input).toBeInTheDocument();
  });

  it("🟣 thay đổi trạng thái focus", () => {
    renderWithChakra(
      <SearchFilterRoleChakra searchTerm="" onSearchChange={() => {}} />
    );

    const input = screen.getByPlaceholderText("Tìm kiếm role...");
    fireEvent.focus(input);
    fireEvent.blur(input);

    // Chỉ kiểm tra sự tồn tại của input sau khi blur
    expect(input).toBeInTheDocument();
  });
});
