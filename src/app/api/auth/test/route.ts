export async function GET(request: Request) {
  return new Response("Hello, World!", {
    headers: {
      "content-type": "text/plain",
    },
  });
}
