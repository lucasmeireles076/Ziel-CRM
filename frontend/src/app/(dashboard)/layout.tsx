import Link from "next/link";
import { BarChart3, Bot, Inbox, KanbanSquare, Settings2 } from "lucide-react";

const navigation = [
  { href: "/pipeline", label: "Pipeline", icon: KanbanSquare },
  { href: "/chat", label: "Conversas", icon: Inbox },
  { href: "/reports", label: "Relatórios", icon: BarChart3 },
  { href: "/settings", label: "Conexões", icon: Settings2 },
];

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" href="/pipeline"><span className="brand-mark">f</span> fluxo</Link>
        <div className="workspace-label">ESPAÇO DE TRABALHO</div>
        <div className="workspace-switch"><span className="workspace-avatar">V</span><span>Vendas<span className="muted block">Plano gratuito</span></span><span className="chevron">⌄</span></div>
        <nav className="nav-list">
          {navigation.map(({ href, label, icon: Icon }) => (
            <Link className="nav-link" href={href} key={href}><Icon size={18} strokeWidth={1.8} />{label}</Link>
          ))}
        </nav>
        <div className="sidebar-bottom"><div className="avatar">CS</div><div><strong>Camila Souza</strong><span className="muted block">Administradora</span></div><span className="chevron">···</span></div>
      </aside>
      <main className="main-content">
        <header className="topbar"><div className="crumb">Workspace <span>/</span> <strong>CRM</strong></div><div className="topbar-right"><span className="status-dot" />Sistema operacional <span className="topbar-divider" />Ajuda</div></header>
        {children}
      </main>
    </div>
  );
}
