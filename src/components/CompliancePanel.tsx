
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CompliancePanel = () => {
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const topQuestions = [
    { question: 'Protocolo de administração endovenosa', count: 156, trend: '+12%' },
    { question: 'Procedimentos de higienização', count: 134, trend: '+8%' },
    { question: 'Controle de infecção hospitalar', count: 98, trend: '+15%' },
    { question: 'Medicamentos de alto risco', count: 87, trend: '+5%' },
    { question: 'Protocolos de emergência', count: 76, trend: '+3%' },
  ];

  const negativeRatings = [
    {
      id: 1,
      question: 'Como preparar medicação injetável?',
      response: 'Resposta incompleta sobre preparação...',
      operator: 'João Silva',
      date: '2024-06-03',
      reason: 'Informação desatualizada',
      confidence: 'low'
    },
    {
      id: 2,
      question: 'Protocolo de isolamento para COVID',
      response: 'Orientações sobre EPIs...',
      operator: 'Maria Santos',
      date: '2024-06-02',
      reason: 'Falta de detalhes técnicos',
      confidence: 'medium'
    },
    {
      id: 3,
      question: 'Dosagem pediátrica de antibiótico',
      response: 'Cálculo baseado no peso...',
      operator: 'Carlos Lima',
      date: '2024-06-01',
      reason: 'Cálculo incorreto',
      confidence: 'low'
    },
  ];

  const auditData = [
    { metric: 'Total de Interações', value: '2,847', change: '+18%' },
    { metric: 'Avaliações Positivas', value: '2,456', change: '+22%' },
    { metric: 'Avaliações Negativas', value: '391', change: '-5%' },
    { metric: 'Taxa de Aprovação', value: '86.3%', change: '+3.2%' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <img 
            src="/lovable-uploads/72fa2729-2d0c-4507-9ade-518c825abcec.png" 
            alt="GSK IA" 
            className="w-10 h-10"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Painel de Compliance</h1>
            <p className="text-gray-600">Monitoramento e auditoria do assistente IA</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="questions">Perguntas Frequentes</TabsTrigger>
          <TabsTrigger value="ratings">Avaliações</TabsTrigger>
          <TabsTrigger value="audit">Auditoria</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {auditData.map((metric, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{metric.metric}</p>
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    </div>
                    <Badge variant={metric.change.startsWith('+') ? 'default' : 'destructive'} className="text-xs">
                      {metric.change}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">Resumo de Atividades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Operadores Ativos</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Média de Interações/Dia</span>
                  <span className="font-semibold">127</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tempo Médio de Resposta</span>
                  <span className="font-semibold">2.3s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Disponibilidade do Sistema</span>
                  <span className="font-semibold text-green-600">99.8%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">Ranking de Perguntas Mais Frequentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topQuestions.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-cyan-100 text-cyan-800">{index + 1}</Badge>
                      <span className="font-medium text-gray-900">{item.question}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">{item.count} vezes</span>
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        {item.trend}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ratings" className="space-y-6">
          <div className="flex space-x-4 mb-6">
            <Input
              placeholder="Buscar por pergunta, operador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="low-confidence">Baixa Confiança</SelectItem>
                <SelectItem value="negative">Avaliações Negativas</SelectItem>
                <SelectItem value="recent">Recentes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">Respostas com Avaliações Negativas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {negativeRatings.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-1">{item.question}</p>
                        <p className="text-sm text-gray-600 mb-2">{item.response}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Operador: {item.operator}</span>
                          <span>Data: {item.date}</span>
                          <span>Motivo: {item.reason}</span>
                        </div>
                      </div>
                      <Badge className={`ml-4 ${
                        item.confidence === 'low' ? 'bg-red-100 text-red-800' :
                        item.confidence === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {item.confidence === 'low' ? 'Baixa' :
                         item.confidence === 'medium' ? 'Média' : 'Alta'} Confiança
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        Analisar Resposta
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Melhorar Conteúdo
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">Histórico de Auditoria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border border-gray-200">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-cyan-600">127</p>
                      <p className="text-sm text-gray-600">Interações Hoje</p>
                    </CardContent>
                  </Card>
                  <Card className="border border-gray-200">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-green-600">96%</p>
                      <p className="text-sm text-gray-600">Taxa de Satisfação</p>
                    </CardContent>
                  </Card>
                  <Card className="border border-gray-200">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-blue-600">2.1s</p>
                      <p className="text-sm text-gray-600">Tempo Médio</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Evolução do Ranking de Respostas</h3>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-600 text-center">
                      Gráfico de evolução será implementado aqui
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompliancePanel;
