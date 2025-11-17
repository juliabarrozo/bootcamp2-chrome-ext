import { test, expect } from "@playwright/test";

const API_URL = "http://localhost:3001";

test.describe("Pokémon API - E2E", () => {

  test("POST /capture deve capturar um Pokémon aleatório", async ({ request }) => {
    const response = await request.post(`${API_URL}/capture`);
    expect(response.ok()).toBeTruthy();

    const data = await response.json();

    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("name");
    expect(typeof data.name).toBe("string");
  });

  test("GET /capture deve retornar o último Pokémon capturado", async ({ request }) => {
    await request.post(`${API_URL}/capture`);

    const response = await request.get(`${API_URL}/capture`);
    expect(response.ok()).toBeTruthy();

    const data = await response.json();

    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("name");
  });
});
