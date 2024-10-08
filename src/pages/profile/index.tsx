import { useAuth } from "@/contexts/auth-context";

export function Profile() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Profile</h1>
      {/* Profile implementation */}
    </div>
  );
}
