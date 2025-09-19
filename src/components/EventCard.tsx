import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Video, 
  ExternalLink,
  CheckCircle,
  UserPlus
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Event } from "@/hooks/useEvents";

interface EventCardProps {
  event: Event;
  onRegister: (eventId: string) => Promise<boolean>;
  onUnregister: (eventId: string) => Promise<boolean>;
}

export const EventCard = ({ event, onRegister, onUnregister }: EventCardProps) => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegistration = async () => {
    setIsRegistering(true);
    if (event.is_registered) {
      await onUnregister(event.id);
    } else {
      await onRegister(event.id);
    }
    setIsRegistering(false);
  };

  const formatEventDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startFormatted = format(start, "dd 'de' MMM 'às' HH:mm", { locale: ptBR });
    const endTime = format(end, "HH:mm", { locale: ptBR });
    
    return `${startFormatted} - ${endTime}`;
  };

  const getLocationDisplay = () => {
    if (event.event_type === 'online') {
      return (
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Video className="h-4 w-4" />
          <span>{event.location || 'Online'}</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4" />
        <span>
          {event.location && `${event.location}, `}
          {event.city}, {event.state}
        </span>
      </div>
    );
  };

  const isEventSoon = () => {
    const now = new Date();
    const eventStart = new Date(event.start_date);
    const hoursUntilEvent = (eventStart.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursUntilEvent <= 24 && hoursUntilEvent > 0;
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge 
                variant={event.event_type === 'online' ? 'secondary' : 'outline'}
                className="text-xs"
              >
                {event.event_type === 'online' ? 'Online' : 'Presencial'}
              </Badge>
              {isEventSoon() && (
                <Badge variant="destructive" className="text-xs">
                  Em breve
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {event.title}
            </CardTitle>
          </div>
          
          <Avatar className="h-10 w-10">
            <AvatarImage src={event.creator?.avatar_url} />
            <AvatarFallback>
              {event.creator?.first_name?.[0]}{event.creator?.last_name?.[0]}
            </AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {event.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>
        )}

        <div className="space-y-2">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatEventDate(event.start_date, event.end_date)}</span>
          </div>
          
          {getLocationDisplay()}
          
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>
              {event.participants_count} participante{event.participants_count !== 1 ? 's' : ''}
              {event.max_participants && ` / ${event.max_participants}`}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-muted-foreground">
            por {event.creator?.first_name} {event.creator?.last_name}
          </span>
          
          <div className="flex space-x-2">
            {event.event_type === 'online' && event.meeting_url && event.is_registered && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(event.meeting_url, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Acessar
              </Button>
            )}
            
            <Button
              variant={event.is_registered ? "secondary" : "default"}
              size="sm"
              onClick={handleRegistration}
              disabled={isRegistering || (event.max_participants && event.participants_count >= event.max_participants && !event.is_registered)}
            >
              {isRegistering ? (
                "Processando..."
              ) : event.is_registered ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Inscrito
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-1" />
                  Inscrever-se
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};