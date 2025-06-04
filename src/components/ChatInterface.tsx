
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  type: 'question' | 'answer';
  content: string;
  timestamp: Date;
  trustLevel?: 'high' | 'medium' | 'low';
  rating?: 'good' | 'bad' | null;
  source?: string;
  positiveRatings?: number;
  negativeRatings?: number;
}

interface ChatInterfaceProps {
  userType: 'operador' | 'compliance';
}

const ChatInterface = ({ userType }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'question',
      content: 'Qual é o protocolo para administração de medicamentos via endovenosa?',
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: '2',
      type: 'answer',
      content: 'O protocolo para administração endovenosa segue as diretrizes da ANVISA e inclui: 1) Verificação da prescrição médica, 2) Higienização das mãos, 3) Preparação do medicamento em ambiente estéril, 4) Identificação do paciente, 5) Verificação da via de acesso venoso, 6) Administração lenta conforme prescrição, 7) Monitoramento de reações adversas.',
      timestamp: new Date(Date.now() - 290000),
      trustLevel: 'high',
      source: 'Manual de Procedimentos GSK - Seção 4.2.1',
      positiveRatings: 15,
      negativeRatings: 2,
    }
  ]);
  
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [suggestions] = useState([
    'Protocolo de higienização das mãos',
    'Administração de medicamentos orais',
    'Controle de infecção hospitalar',
    'Procedimentos de emergência'
  ]);

  const getTrustLevelColor = (trustLevel?: 'high' | 'medium' | 'low') => {
    switch (trustLevel) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getTrustLevelText = (trustLevel?: 'high' | 'medium' | 'low') => {
    switch (trustLevel) {
      case 'high': return 'Alta Confiança';
      case 'medium': return 'Média Confiança';
      case 'low': return 'Baixa Confiança';
      default: return 'Sem Avaliação';
    }
  };

  const getTrustLevelFromRatings = (positive: number = 0, negative: number = 0): 'high' | 'medium' | 'low' => {
    const total = positive + negative;
    if (total === 0) return 'medium';
    
    const positiveRatio = positive / total;
    if (positiveRatio >= 0.8) return 'high';
    if (positiveRatio >= 0.5) return 'medium';
    return 'low';
  };

  const handleSendMessage = () => {
    if (!currentQuestion.trim()) return;

    const questionId = Date.now().toString();
    const answerId = (Date.now() + 1).toString();

    const newQuestion: Message = {
      id: questionId,
      type: 'question',
      content: currentQuestion,
      timestamp: new Date(),
    };

    // Simular diferentes níveis de confiança baseado em ratings simulados
    const randomPositive = Math.floor(Math.random() * 20) + 1;
    const randomNegative = Math.floor(Math.random() * 10);
    const trustLevel = getTrustLevelFromRatings(randomPositive, randomNegative);

    const newAnswer: Message = {
      id: answerId,
      type: 'answer',
      content: 'Esta é uma resposta simulada do assistente IA. O sistema está processando sua pergunta e fornecendo uma resposta baseada na base de conhecimento da GSK.',
      timestamp: new Date(),
      trustLevel,
      source: 'Base de Conhecimento GSK',
      positiveRatings: randomPositive,
      negativeRatings: randomNegative,
    };

    setMessages(prev => [...prev, newQuestion, newAnswer]);
    setCurrentQuestion('');
  };

  const handleCopyResponse = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Resposta copiada para a área de transferência');
  };

  const handleRating = (messageId: string, rating: 'good' | 'bad') => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const updatedMsg = { ...msg, rating };
        
        // Atualizar contadores de rating
        if (rating === 'good') {
          updatedMsg.positiveRatings = (msg.positiveRatings || 0) + 1;
        } else {
          updatedMsg.negativeRatings = (msg.negativeRatings || 0) + 1;
        }
        
        // Recalcular nível de confiança
        updatedMsg.trustLevel = getTrustLevelFromRatings(
          updatedMsg.positiveRatings, 
          updatedMsg.negativeRatings
        );
        
        return updatedMsg;
      }
      return msg;
    }));
    
    toast.success(`Avaliação registrada: ${rating === 'good' ? 'Positiva' : 'Negativa'}`);
  };

  const handleQuestionSuggestion = (suggestion: string) => {
    setCurrentQuestion(suggestion);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/72fa2729-2d0c-4507-9ade-518c825abcec.png" 
              alt="GSK IA" 
              className="w-10 h-10"
            />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">GSK CASA V2</h1>
              <p className="text-sm text-gray-600">Assistente IA - Chat do {userType}</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Online
          </Badge>
        </div>
      </div>

      {/* Suggestions */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <p className="text-sm text-gray-600 mb-2">Sugestões de perguntas:</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuestionSuggestion(suggestion)}
              className="text-xs h-7 bg-cyan-50 border-cyan-200 text-cyan-700 hover:bg-cyan-100"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'question' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-3xl ${message.type === 'question' ? 'ml-12' : 'mr-12'}`}>
              {message.type === 'question' ? (
                <Card className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                  <CardContent className="p-4">
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-80 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <img 
                          src="/lovable-uploads/72fa2729-2d0c-4507-9ade-518c825abcec.png" 
                          alt="IA" 
                          className="w-6 h-6"
                        />
                        <span className="text-sm font-medium text-gray-700">Assistente IA</span>
                      </div>
                      
                      {/* Farol de Confiança */}
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getTrustLevelColor(message.trustLevel)}`}></div>
                        <span className="text-xs text-gray-600">
                          {getTrustLevelText(message.trustLevel)}
                        </span>
                        {(message.positiveRatings || message.negativeRatings) && (
                          <span className="text-xs text-gray-500">
                            ({message.positiveRatings || 0}👍 / {message.negativeRatings || 0}👎)
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-800 leading-relaxed mb-4">{message.content}</p>
                    
                    {message.source && (
                      <div className="bg-gray-50 border border-gray-200 rounded p-3 mb-4">
                        <p className="text-xs text-gray-600 font-medium mb-1">Fonte:</p>
                        <p className="text-xs text-gray-700">{message.source}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCopyResponse(message.content)}
                          className="h-8 px-3 text-xs"
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Copiar
                        </Button>
                      </div>
                      
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant={message.rating === 'good' ? 'default' : 'outline'}
                          onClick={() => handleRating(message.id, 'good')}
                          className={`h-8 px-2 ${message.rating === 'good' ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-green-50'}`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant={message.rating === 'bad' ? 'default' : 'outline'}
                          onClick={() => handleRating(message.id, 'bad')}
                          className={`h-8 px-2 ${message.rating === 'bad' ? 'bg-red-600 hover:bg-red-700' : 'hover:bg-red-50'}`}
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex space-x-3">
          <Input
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            placeholder="Digite sua pergunta..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 border-gray-300 focus:border-cyan-500"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!currentQuestion.trim()}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6"
          >
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
