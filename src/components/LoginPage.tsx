
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LoginPageProps {
  onLogin: (userType: 'operador' | 'compliance') => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [userType, setUserType] = useState<'operador' | 'compliance' | ''>('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (userType && username && password) {
      onLogin(userType);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/72fa2729-2d0c-4507-9ade-518c825abcec.png" 
            alt="GSK IA Assistant" 
            className="w-24 h-24 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">GSK CASA V2</h1>
          <p className="text-gray-600">Assistente IA para Atendimento</p>
        </div>

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-gray-800">Fazer Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userType" className="text-sm font-medium text-gray-700">
                Perfil de Acesso
              </Label>
              <Select value={userType} onValueChange={(value: 'operador' | 'compliance') => setUserType(value)}>
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Selecione seu perfil" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="operador">Operador</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                Usuário
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Digite seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-200"
              />
            </div>

            <Button 
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-2.5"
              disabled={!userType || !username || !password}
            >
              Entrar
            </Button>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-500">
          GSK - Assistente IA v2.0
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
