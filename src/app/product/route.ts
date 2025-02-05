export const runtime = "edge"; // 'nodejs' is the default

export function GET() {
  return new Response(`I am an Edge Function!`, {
    status: 200,
  });
}
