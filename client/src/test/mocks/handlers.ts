import { http, HttpResponse } from "msw";

export const handlers = [
  // Mock login endpoint
  http.post("/auth/login", async ({ request }) => {
    const body = await request.json();
    const { email, password } = body as { email: string; password: string };

    // Simple mock validation
    if (email === "test@example.com" && password === "password123") {
      return HttpResponse.json({
        access_token: "mock-token-12345",
        token_type: "bearer",
        expires_in: 3600,
        user: {
          email: "test@example.com",
          full_name: "Test User",
          is_admin: true,
          is_active: true,
          auth_provider: "local",
          email_verified: true,
          password_change_required: false,
        },
      });
    }

    return HttpResponse.json({ detail: "Invalid credentials" }, { status: 401 });
  }),

  // Mock auth check endpoint
  http.get("/auth/me", () => {
    return HttpResponse.json({
      email: "test@example.com",
      full_name: "Test User",
      is_admin: true,
      is_active: true,
      auth_provider: "local",
      email_verified: true,
      password_change_required: false,
    });
  }),

  // Mock create gateway endpoint
  http.post("/gateways", async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json(
      {
        id: "mock-gateway-id",
        ...body,
        created_at: new Date().toISOString(),
      },
      { status: 201 },
    );
  }),

  // Mock update gateway endpoint
  http.put("/gateways/:gatewayId", async ({ request, params }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const { gatewayId } = params;
    return HttpResponse.json({
      id: gatewayId,
      ...body,
      updated_at: new Date().toISOString(),
    });
  }),
];
