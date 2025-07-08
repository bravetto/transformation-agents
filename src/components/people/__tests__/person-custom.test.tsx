import { render, screen } from "@/test-utils";
import PersonCustom from "../person-custom";

// Mock the dynamic imports
jest.mock("@/components/people/sections/timeline", () => ({
  __esModule: true,
  default: ({ data }: any) => (
    <div>Timeline Component - {data?.length || 0} items</div>
  ),
}));

jest.mock("@/components/people/synchronicity-map", () => ({
  __esModule: true,
  default: ({ connections }: any) => (
    <div>Synchronicity Map - {connections?.length || 0} connections</div>
  ),
}));

jest.mock("@/components/people/assessment-alignment", () => ({
  __esModule: true,
  default: ({ assessments }: any) => (
    <div>Assessment Alignment - {assessments?.length || 0} assessments</div>
  ),
}));

describe("PersonCustom", () => {
  it("renders with title and description", () => {
    render(
      <PersonCustom
        title="Test Section"
        description="Test description"
        component="TimelineComponent"
      />,
    );

    expect(screen.getByText("Test Section")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("renders without description", () => {
    render(<PersonCustom title="Test Section" component="TimelineComponent" />);

    expect(screen.getByText("Test Section")).toBeInTheDocument();
    expect(screen.queryByText("Test description")).not.toBeInTheDocument();
  });

  it("renders TimelineComponent with props", () => {
    const timelineData = [{ id: 1, event: "Test Event" }];
    render(
      <PersonCustom
        title="Timeline Section"
        component="TimelineComponent"
        props={{ data: timelineData }}
      />,
    );

    expect(
      screen.getByText("Timeline Component - 1 items"),
    ).toBeInTheDocument();
  });

  it("renders SynchronicityMap with props", () => {
    const connections = [{ id: 1, name: "Connection 1" }];
    render(
      <PersonCustom
        title="Synchronicity Section"
        component="SynchronicityMap"
        props={{ connections }}
      />,
    );

    expect(
      screen.getByText("Synchronicity Map - 1 connections"),
    ).toBeInTheDocument();
  });

  it("renders AssessmentAlignment with props", () => {
    const assessments = [{ id: 1, type: "DISC" }];
    render(
      <PersonCustom
        title="Assessment Section"
        component="AssessmentAlignment"
        props={{ assessments }}
      />,
    );

    expect(
      screen.getByText("Assessment Alignment - 1 assessments"),
    ).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <PersonCustom
        title="Custom Class Test"
        component="TimelineComponent"
        className="custom-section"
      />,
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-section");
  });

  it("handles missing component gracefully", () => {
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation();

    const { container } = render(
      <PersonCustom
        title="Missing Component"
        component={"NonExistentComponent" as any}
      />,
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      'Custom component "NonExistentComponent" not found in COMPONENT_MAP',
    );
    expect(container.firstChild).toBeNull();

    consoleSpy.mockRestore();
  });
});
