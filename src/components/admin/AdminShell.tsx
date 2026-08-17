"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import {
  Bell,
  ExternalLink,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
} from "lucide-react";

import Logo from "@/components/cinema/Logo";
import { useAdmin } from "@/components/admin/AdminProvider";
import {
  ADMIN_SIDEBAR_KEY,
  adminNav,
  getBreadcrumbs,
  isNavActive,
} from "@/lib/admin";
import { cn } from "@/lib/utils";
import { Alert, AlertAction, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const notifications = [
  {
    title: "Sessão quase lotada",
    body: "Sala 1 · 19:00 · Homem-Aranha",
  },
  {
    title: "Estoque baixo",
    body: "Balde Colecionável com 4 unidades",
  },
  {
    title: "Fechamento pendente",
    body: "Caixa da bilheteria de ontem",
  },
];

function NavList({
  collapsed,
  onNavigate,
}: {
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1 px-2">
      {adminNav.map((item) => {
        const active = isNavActive(pathname, item.href);
        const link = (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors",
              collapsed && "justify-center px-0",
              active
                ? "bg-primary/15 text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            aria-current={active ? "page" : undefined}
          >
            <item.icon className="size-4 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        );

        if (!collapsed) return link;

        return (
          <Tooltip key={item.href}>
            <TooltipTrigger render={link} />
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        );
      })}
    </nav>
  );
}

function SidebarBody({
  collapsed,
  onNavigate,
}: {
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <div className={cn("flex items-center px-4 py-4", collapsed && "justify-center px-2")}>
        {!collapsed && <Logo href="/admin" size="sm" />}
      </div>
      <NavList collapsed={collapsed} onNavigate={onNavigate} />
      <div className="mt-auto space-y-1 p-2">
        <Separator />
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
            collapsed && "justify-center px-0"
          )}
        >
          <ExternalLink className="size-4" />
          {!collapsed && "Visualizar site"}
        </Link>
        <Link
          href="/admin/login"
          className={cn(
            "flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
            collapsed && "justify-center px-0"
          )}
        >
          <LogOut className="size-4" />
          {!collapsed && "Sair da demonstração"}
        </Link>
      </div>
    </div>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { movies, sales } = useAdmin();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ADMIN_SIDEBAR_KEY);
      if (stored === "1") setCollapsed(true);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const toggleCollapsed = () => {
    setCollapsed((current) => {
      const next = !current;
      try {
        localStorage.setItem(ADMIN_SIDEBAR_KEY, next ? "1" : "0");
      } catch {
        // ignore
      }
      return next;
    });
  };

  const crumbs = getBreadcrumbs(pathname);
  const results = query.trim()
    ? [
      ...movies
        .filter((movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 4)
        .map((movie) => ({
          href: `/admin/filmes/${movie.id}`,
          label: movie.title,
          hint: "Filme",
        })),
      ...sales
        .filter((sale) =>
          `${sale.code} ${sale.customer}`.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 3)
        .map((sale) => ({
          href: `/admin/vendas/${sale.id}`,
          label: sale.code,
          hint: sale.customer,
        })),
    ]
    : [];

  return (
    <TooltipProvider delay={200}>
      <div className="admin-app flex h-dvh overflow-hidden bg-background text-foreground">
        <aside
          className={cn(
            "hidden h-full shrink-0 flex-col overflow-y-auto border-r border-sidebar-border bg-sidebar md:flex",
            collapsed ? "w-16" : "w-60"
          )}
        >
          <SidebarBody collapsed={collapsed} />
        </aside>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="p-0">
            <SheetHeader>
              <SheetTitle className="sr-only">Navegação administrativa</SheetTitle>
            </SheetHeader>
            <div className="flex h-full flex-col pb-4">
              <SidebarBody onNavigate={() => setMobileOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <header className="z-30 flex shrink-0 flex-col gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur md:px-6">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Abrir menu"
              >
                <Menu className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:inline-flex"
                onClick={toggleCollapsed}
                aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
              >
                {collapsed ? (
                  <PanelLeftOpen className="size-4" />
                ) : (
                  <PanelLeftClose className="size-4" />
                )}
              </Button>

              <Breadcrumb className="hidden min-w-0 flex-1 sm:block">
                <BreadcrumbList>
                  {crumbs.map((crumb, index) => (
                    <Fragment key={`${crumb.label}-${index}`}>
                      {index > 0 && <BreadcrumbSeparator />}
                      <BreadcrumbItem>
                        {crumb.href ? (
                          <BreadcrumbLink render={<Link href={crumb.href} />}>
                            {crumb.label}
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                    </Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>

              <div className="ml-auto flex items-center gap-2">
                <div className="relative hidden lg:block">
                  <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setSearchOpen(true);
                    }}
                    onFocus={() => setSearchOpen(true)}
                    placeholder="Pesquisar filmes, vendas..."
                    className="h-9 w-64 pl-8"
                    aria-label="Pesquisa global demonstrativa"
                  />
                  {searchOpen && query && (
                    <div className="absolute top-full z-40 mt-1 w-full rounded-lg border border-border bg-popover p-1 shadow-lg">
                      {results.length === 0 ? (
                        <p className="px-2 py-2 text-xs text-muted-foreground">
                          Nenhum resultado nesta demonstração.
                        </p>
                      ) : (
                        results.map((item) => (
                          <button
                            key={item.href}
                            type="button"
                            className="flex w-full flex-col rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted"
                            onClick={() => {
                              router.push(item.href);
                              setSearchOpen(false);
                              setQuery("");
                            }}
                          >
                            <span>{item.label}</span>
                            <span className="text-xs text-muted-foreground">
                              {item.hint}
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>

                <Popover>
                  <PopoverTrigger
                    className={cn(
                      "relative inline-flex size-8 items-center justify-center rounded-lg hover:bg-muted"
                    )}
                    aria-label="Notificações"
                  >
                    <Bell className="size-4" />
                    <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" />
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-80">
                    <PopoverHeader>
                      <PopoverTitle>Notificações</PopoverTitle>
                    </PopoverHeader>
                    <ul className="space-y-2">
                      {notifications.map((item) => (
                        <li key={item.title} className="rounded-md bg-muted/40 p-2">
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.body}</p>
                        </li>
                      ))}
                    </ul>
                  </PopoverContent>
                </Popover>

                <Badge variant="outline" className="hidden rounded-md sm:inline-flex">
                  Ambiente demonstrativo
                </Badge>

                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg px-1.5 py-1 hover:bg-muted">
                    <Avatar size="sm">
                      <AvatarFallback className="bg-primary/20 text-foreground">
                        OC
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden text-sm md:block">Operador Cineplaza</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem render={<Link href="/" />}>
                      Visualizar site
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem render={<Link href="/admin/login" />}>
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 md:px-6">
            {bannerOpen && (
              <Alert className="mb-4 border-accent/30 bg-accent/8">
                <AlertDescription>
                  Você está navegando em um ambiente demonstrativo. Os dados e
                  alterações apresentados são simulados.
                </AlertDescription>
                <AlertAction>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => setBannerOpen(false)}
                  >
                    Recolher
                  </Button>
                </AlertAction>
              </Alert>
            )}
            {children}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
