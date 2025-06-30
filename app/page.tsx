import PostList from "@/components/posts/PostList";
import PostCreated from "@/components/posts/PostCreated";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-foreground">
          Koneksi NextJS dengan Prisma dan PostgreSQL
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Buat Post Baru</CardTitle>
              </CardHeader>
              <CardContent>
                <PostCreated />
              </CardContent>
            </Card>
          </div>

          {/* Table Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Daftar Post</CardTitle>
              </CardHeader>
              <CardContent>
                <PostList />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
