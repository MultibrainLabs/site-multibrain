import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ScheduleSessionModalProps {
  mentor: any;
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleSessionModal = ({ mentor, isOpen, onClose }: ScheduleSessionModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("60");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSchedule = async () => {
    if (!user || !date || !time) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha a data e horário.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Combinar data e hora
      const [hours, minutes] = time.split(':');
      const scheduledAt = new Date(date);
      scheduledAt.setHours(parseInt(hours), parseInt(minutes), 0);

      const { error } = await supabase
        .from('mentorship_sessions')
        .insert({
          mentor_id: mentor.user_id,
          mentee_id: user.id,
          scheduled_at: scheduledAt.toISOString(),
          duration_minutes: parseInt(duration),
          notes: notes || null,
          status: 'scheduled'
        });

      if (error) throw error;

      toast({
        title: "Sessão agendada!",
        description: "Sua sessão de mentoria foi agendada com sucesso. Você receberá um email de confirmação.",
      });

      onClose();
      // Reset form
      setDate(undefined);
      setTime("");
      setDuration("60");
      setNotes("");
    } catch (error) {
      console.error('Error scheduling session:', error);
      toast({
        title: "Erro",
        description: "Não foi possível agendar a sessão. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const timeSlots = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Agendar Sessão de Mentoria</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Mentor Info */}
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="font-medium">
              {mentor?.profile?.first_name} {mentor?.profile?.last_name}
            </p>
            <p className="text-sm text-muted-foreground">
              R$ {mentor?.hourly_rate || 0}/hora
            </p>
          </div>

          {/* Data */}
          <div className="space-y-2">
            <Label>Data da Sessão</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Selecione uma data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Horário */}
          <div className="space-y-2">
            <Label>Horário</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um horário" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Duração */}
          <div className="space-y-2">
            <Label>Duração</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutos</SelectItem>
                <SelectItem value="60">1 hora</SelectItem>
                <SelectItem value="90">1h 30min</SelectItem>
                <SelectItem value="120">2 horas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="notes">Observações (opcional)</Label>
            <Textarea
              id="notes"
              placeholder="Descreva brevemente o que você gostaria de discutir na sessão..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Ações */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              className="flex-1 gap-2" 
              onClick={handleSchedule}
              disabled={loading}
            >
              <Clock className="h-4 w-4" />
              {loading ? "Agendando..." : "Agendar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};