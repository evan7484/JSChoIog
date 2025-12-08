import { getProjects } from "@/lib/notion/projects";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const projects = await getProjects();
    return Response.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return Response.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
