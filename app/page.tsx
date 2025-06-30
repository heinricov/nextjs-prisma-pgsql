import PostList from "@/components/posts/PostList";
import PostCreated from "@/components/posts/PostCreated";

export default function Home() {
  return (
    <div className="bg-gray-400 min-h-screen p-4">
      <h1>Posts</h1>
      <PostList />
      <h2>Create a new post</h2>
      <PostCreated />
    </div>
  );
}
