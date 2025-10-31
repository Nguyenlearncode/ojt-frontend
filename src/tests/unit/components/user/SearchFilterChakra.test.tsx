import { render, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, beforeEach, expect, vi } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import SearchFilterChakra from "../../../../features/user/components/SearchFilterChakra";

// 🧩 Mock framer-motion để tránh lỗi animation
vi.mock("framer-motion", () => ({
  motion: (c: any) => c,
  AnimatePresence: ({ children }: any) => children,
}));

// 🧩 Mock icon components
vi.mock("react-icons/fi", () => ({
  FiSearch: () => <div data-testid="icon-search" />,
  FiUsers: () => <div data-testid="icon-users" />,
  FiX: () => <div data-testid="icon-x" />,
}));

vi.mock("react-icons/bs", () => ({
  BsGenderMale: () => <div data-testid="icon-male" />,
  BsGenderFemale: () => <div data-testid="icon-female" />,
}));

describe("🧠 SearchFilterChakra (logic only)", () => {
  let mockSearchChange: any;
  let mockRoleChange: any;
  let mockGenderChange: any;

  beforeEach(() => {
    mockSearchChange = vi.fn();
    mockRoleChange = vi.fn();
    mockGenderChange = vi.fn();
  });

  const renderWithChakra = (props: any) =>
    render(
      <ChakraProvider>
        <SearchFilterChakra {...props} />
      </ChakraProvider>
    );

  test("🟢 gọi onSearchChange khi nhập text", async () => {
    const { getByPlaceholderText } = renderWithChakra({
      searchTerm: "",
      onSearchChange: mockSearchChange,
      roleFilter: "",
      onRoleFilterChange: mockRoleChange,
      genderFilter: "",
      onGenderFilterChange: mockGenderChange,
    });

    const input = getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "John" } });

    expect(mockSearchChange).toHaveBeenCalledWith("John");
  });

  test("🟢 click Vai trò → hiển thị danh sách role", async () => {
    const { getByText, findByText } = renderWithChakra({
      searchTerm: "",
      onSearchChange: mockSearchChange,
      roleFilter: "",
      onRoleFilterChange: mockRoleChange,
      genderFilter: "",
      onGenderFilterChange: mockGenderChange,
    });

    fireEvent.click(getByText("Vai trò"));
    const roleLabel = await findByText("CHỌN VAI TRÒ");
    expect(roleLabel).toBeTruthy();
  });

  test("🟢 click một role → gọi onRoleFilterChange", async () => {
    const { getByText, findByText } = renderWithChakra({
      searchTerm: "",
      onSearchChange: mockSearchChange,
      roleFilter: "",
      onRoleFilterChange: mockRoleChange,
      genderFilter: "",
      onGenderFilterChange: mockGenderChange,
    });

    fireEvent.click(getByText("Vai trò"));
    await findByText("CHỌN VAI TRÒ");
    fireEvent.click(getByText("Administrator"));

    expect(mockRoleChange).toHaveBeenCalledWith("Administrator");
  });

  test("🟢 click Giới tính → hiển thị danh sách gender", async () => {
    const { getByText, findByText } = renderWithChakra({
      searchTerm: "",
      onSearchChange: mockSearchChange,
      roleFilter: "",
      onRoleFilterChange: mockRoleChange,
      genderFilter: "",
      onGenderFilterChange: mockGenderChange,
    });

    fireEvent.click(getByText("Giới tính"));
    const genderLabel = await findByText("CHỌN GIỚI TÍNH");
    expect(genderLabel).toBeTruthy();
  });

  test("🟢 click một gender → gọi onGenderFilterChange", async () => {
    const { getByText, findByText } = renderWithChakra({
      searchTerm: "",
      onSearchChange: mockSearchChange,
      roleFilter: "",
      onRoleFilterChange: mockRoleChange,
      genderFilter: "",
      onGenderFilterChange: mockGenderChange,
    });

    fireEvent.click(getByText("Giới tính"));
    await findByText("CHỌN GIỚI TÍNH");
    fireEvent.click(getByText("Nam"));

    expect(mockGenderChange).toHaveBeenCalledWith("Male");
  });

  test("🔴 click 'Xóa bộ lọc' → reset role và gender", async () => {
    const { getByText } = renderWithChakra({
      searchTerm: "",
      onSearchChange: mockSearchChange,
      roleFilter: "Administrator",
      onRoleFilterChange: mockRoleChange,
      genderFilter: "Male",
      onGenderFilterChange: mockGenderChange,
    });

    const clearBtn = getByText(/Xóa bộ lọc/);
    fireEvent.click(clearBtn);

    await waitFor(() => {
      expect(mockRoleChange).toHaveBeenCalledWith("");
      expect(mockGenderChange).toHaveBeenCalledWith("");
    });
  });
});
