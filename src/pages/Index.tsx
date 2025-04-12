
import { Navbar } from '@/components/Navbar';
import { Dashboard } from '@/components/Dashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Dashboard />
      </main>
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          ActivitySeer &copy; 2025 - Your data never leaves your computer
        </div>
      </footer>
    </div>
  );
};

export default Index;
