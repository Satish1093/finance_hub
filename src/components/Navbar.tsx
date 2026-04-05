import { Moon, Sun, Shield, Eye, Sparkles } from "lucide-react";
import { useFinanceStore } from "@/store/useFinanceStore";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Navbar() {
  const { role, setRole, darkMode, toggleDarkMode } = useFinanceStore();

  return (
    <header className="h-14 border-b border-border/60 bg-card/60 backdrop-blur-xl flex items-center justify-between px-5 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="md:hidden" />
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg gradient-primary flex items-center justify-center">
            <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <h1 className="text-base font-bold text-foreground tracking-tight">FinDash</h1>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-secondary rounded-xl p-1 gap-0.5">
          <Button
            variant="ghost"
            size="sm"
            className={`h-7 text-xs gap-1.5 rounded-lg transition-all ${
              role === "admin" ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setRole("admin")}
          >
            <Shield className="h-3 w-3" /> Admin
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-7 text-xs gap-1.5 rounded-lg transition-all ${
              role === "viewer" ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setRole("viewer")}
          >
            <Eye className="h-3 w-3" /> Viewer
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-xl hover:bg-secondary transition-colors"
          onClick={toggleDarkMode}
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  );
}
