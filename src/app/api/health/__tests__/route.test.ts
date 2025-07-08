import { GET } from "../route";
import { NextRequest } from "next/server";

describe("Health API Route", () => {
  it("returns healthy status with all checks passing", async () => {
    const request = new NextRequest("http://localhost:3000/api/health");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe("healthy");
    expect(data.timestamp).toBeDefined();
    expect(data.uptime).toBeGreaterThan(0);
  });

  it("includes system information", async () => {
    const request = new NextRequest("http://localhost:3000/api/health");
    const response = await GET(request);
    const data = await response.json();

    expect(data.system).toBeDefined();
    expect(data.system.nodeVersion).toBeDefined();
    expect(data.system.platform).toBeDefined();
    expect(data.system.memory).toBeDefined();
    expect(data.system.memory.free).toBeGreaterThan(0);
    expect(data.system.memory.total).toBeGreaterThan(0);
  });

  it("includes service checks", async () => {
    const request = new NextRequest("http://localhost:3000/api/health");
    const response = await GET(request);
    const data = await response.json();

    expect(data.services).toBeDefined();
    expect(data.services.database).toBe("healthy");
    expect(data.services.cache).toBe("healthy");
    expect(data.services.external_api).toBe("healthy");
  });

  it("returns correct headers", async () => {
    const request = new NextRequest("http://localhost:3000/api/health");
    const response = await GET(request);

    expect(response.headers.get("content-type")).toBe("application/json");
    expect(response.headers.get("cache-control")).toBe(
      "no-cache, no-store, must-revalidate",
    );
  });

  it("handles errors gracefully", async () => {
    // Mock a system error
    const originalProcess = global.process;
    global.process = {
      ...originalProcess,
      uptime: () => {
        throw new Error("System error");
      },
    } as any;

    const request = new NextRequest("http://localhost:3000/api/health");
    const response = await GET(request);

    expect(response.status).toBe(200); // Should still return 200 but with error info
    const data = await response.json();
    expect(data.status).toBeDefined();

    // Restore
    global.process = originalProcess;
  });
});
