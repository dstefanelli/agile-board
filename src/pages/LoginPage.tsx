import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setError(t('login_page.invalid_credentials'));
    }
  }

  return (
    <div className="min-h-full bg-slate-500">
      <main className="h-full">
        <div className="flex items-center justify-center min-h-scree px-6 py-12 lg:px-8">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>{t('login_page.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">{t('login_page.email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('login_page.email_placeholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">{t('login_page.password')}</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      placeholder={t('login_page.password_placeholder')}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Button className="w-full" type="submit">
                      {t('login_page.submit_button')}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              {error && <p className="text-red-500">{error}</p>}
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
