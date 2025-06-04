
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

const OperatorHistory = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState('');

  const conversationHistory = [
    {
      id: '1',
      date: '2024-06-04',
      time: '14:30',
      questions: 8,
      duration: '25 min',
      satisfaction: 'high',
      topics: ['Medicamentos', 'Protocolos', 'Emergência']
    },
    {
      id: '2',
      date: '2024-06-04',
      time: '09:15',
      questions: 12,
      duration: '38 min',
      satisfaction: 'medium',
      topics: ['Higienização', 'Infecção', 'EPIs']
    },
    {
      id: '3',
      date: '2024-06-03',
      time: '16:45',
      questions: 5,
      duration: '15 min',
      satisfaction: 'high',
      topics: ['Dosagem', 'Pediatria']
    },
    {
      id: '4',
      date: '2024-06-03',
      time: '11:20',
      questions: 15,
      duration: '42 min',
      satisfaction: 'high',
      topics: ['Procedimentos', 'Cirurgia', 'Anestesia']
    },
  ];

  const getSatisfactionColor = (satisfaction: string) => {
    switch (satisfaction) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSatisfactionText = (satisfaction: string) => {
    switch (satisfaction) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return 'N/A';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <img 
            src="/lovable-uploads/72fa2729-2d0c-4507-9ade-518c825abcec.png" 
            alt="GSK IA" 
            className="w-10 h-10"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Meu Histórico</h1>
            <p className="text-gray-600">Conversas e interações anteriores</p>
          </div>
        </div>

        <div className="flex space-x-4 mb-6">
          <Input
            placeholder="Buscar por tópico ou conteúdo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md bg-white"
          />
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="bg-white">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Selecionar data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid gap-4">
        {conversationHistory.map((conversation) => (
          <Card key={conversation.id} className="bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Sessão de {conversation.date}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {conversation.time}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{conversation.questions} perguntas</span>
                    <span>Duração: {conversation.duration}</span>
                  </div>
                </div>
                <Badge className={`${getSatisfactionColor(conversation.satisfaction)}`}>
                  Satisfação {getSatisfactionText(conversation.satisfaction)}
                </Badge>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Tópicos abordados:</p>
                <div className="flex flex-wrap gap-2">
                  {conversation.topics.map((topic, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-cyan-50 text-cyan-700">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="text-xs">
                  Ver Detalhes
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  Continuar Sessão
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Estatísticas Pessoais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-cyan-600">247</p>
                <p className="text-sm text-gray-600">Total de Perguntas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">89%</p>
                <p className="text-sm text-gray-600">Taxa de Satisfação</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">32h</p>
                <p className="text-sm text-gray-600">Tempo Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">15</p>
                <p className="text-sm text-gray-600">Tópicos Diferentes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OperatorHistory;
