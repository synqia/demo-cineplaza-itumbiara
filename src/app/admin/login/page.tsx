"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import Logo from "@/components/cinema/Logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  const emailError = submitted && !email.trim();
  const passwordError = submitted && !password.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    if (!email.trim() || !password.trim()) return;
    setDemoOpen(true);
  };

  return (
    <div className="admin-app relative flex min-h-dvh items-center justify-center bg-background px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(240,68,82,0.12),transparent_42%)]" />
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-(--shadow-card) sm:p-8">
        <div className="mb-6 space-y-3 text-center">
          <div className="flex justify-center">
            <Logo href="/" size="lg" />
          </div>
          <h1 className="font-heading text-2xl">Painel de gerenciamento</h1>
          <p className="text-sm text-muted-foreground">
            Acesse a operação do Cineplaza
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="admin-email">E-mail</Label>
            <Input
              id="admin-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={emailError}
              className="h-10"
              placeholder="operador@cineplaza.com.br"
            />
            {emailError && (
              <p className="text-xs text-destructive">Informe o e-mail para continuar.</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="admin-password">Senha</Label>
            <div className="relative">
              <Input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={passwordError}
                className="h-10 pr-10"
                placeholder="Digite sua senha"
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {passwordError && (
              <p className="text-xs text-destructive">Informe a senha para continuar.</p>
            )}
          </div>

          <div className="flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={remember}
                onCheckedChange={(checked) => setRemember(checked === true)}
              />
              Lembrar de mim
            </label>
            <button
              type="button"
              className="text-sm text-primary underline-offset-4 hover:underline"
              onClick={() => setForgotOpen(true)}
            >
              Esqueci minha senha
            </button>
          </div>

          <Button type="submit" className="h-10 w-full" size="lg">
            Entrar
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Para acessar a demonstração, utilize qualquer e-mail e senha.
        </p>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Voltar para o site
          </Link>
        </div>
      </div>

      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogContent title="Painel demonstrativo">
          <DialogDescription>
            Este é um protótipo navegável do painel de gerenciamento do
            Cineplaza. Nenhuma autenticação ou operação real será realizada.
          </DialogDescription>
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={() => setDemoOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => router.push("/admin")}>
              Entrar na demonstração
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
        <DialogContent title="Recuperação de senha">
          <DialogDescription>
            A recuperação de senha será disponibilizada quando a autenticação
            real for implementada. Nesta demonstração, qualquer e-mail e senha
            liberam o acesso ao painel.
          </DialogDescription>
          <div className="mt-6 flex justify-end">
            <Button onClick={() => setForgotOpen(false)}>Entendi</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
