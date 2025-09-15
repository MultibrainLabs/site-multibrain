import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Clock, Users, Calendar, Video } from "lucide-react";

interface MentorProfileModalProps {
  mentor: any;
  isOpen: boolean;
  onClose: () => void;
  onSchedule: () => void;
}

export const MentorProfileModal = ({ mentor, isOpen, onClose, onSchedule }: MentorProfileModalProps) => {
  if (!mentor) return null;

  const fullName = `${mentor.profile?.first_name || ''} ${mentor.profile?.last_name || ''}`.trim();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Perfil do Mentor</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header */}
          <div className="flex gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={mentor.profile?.avatar_url} alt={fullName} />
              <AvatarFallback>{fullName.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{fullName}</h2>
              <p className="text-muted-foreground">Mentor Especialista</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {mentor.profile?.location || 'Localização não informada'}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {mentor.experience_years || 0}+ anos de experiência
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span className="font-medium">4.9</span>
              </div>
              <p className="text-sm text-muted-foreground">150 sessões</p>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="font-semibold mb-2">Sobre</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {mentor.bio || 'Bio não disponível.'}
            </p>
          </div>

          {/* Especialidades */}
          <div>
            <h3 className="font-semibold mb-2">Especialidades</h3>
            <div className="flex flex-wrap gap-2">
              {mentor.specialties?.map((specialty: string, index: number) => (
                <Badge key={index} variant="outline">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          {/* Disponibilidade e Preço */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Disponibilidade
              </h3>
              <p className="text-sm text-muted-foreground">
                {mentor.availability || 'Consulte disponibilidade'}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Investimento</h3>
              <p className="text-2xl font-bold text-primary">
                R$ {mentor.hourly_rate || 0}/h
              </p>
              <p className="text-xs text-muted-foreground">por sessão de 1 hora</p>
            </div>
          </div>

          {/* Ações */}
          <div className="flex gap-4 pt-4 border-t">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Fechar
            </Button>
            <Button className="flex-1 gap-2" onClick={onSchedule}>
              <Calendar className="h-4 w-4" />
              Agendar Sessão
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};