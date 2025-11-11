import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const announcementSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100),
  content: z.string().trim().min(1, "Content is required").max(1000),
});

interface AnnouncementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function AnnouncementDialog({
  open,
  onOpenChange,
  onSuccess,
}: AnnouncementDialogProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validated = announcementSchema.parse({ title, content });
      setLoading(true);

      const { error } = await supabase.from("announcements").insert({
        title: validated.title,
        content: validated.content,
        created_by: user!.id,
      });

      if (error) throw error;

      toast({
        title: "Announcement Posted",
        description: "Your announcement has been published successfully.",
      });

      setTitle("");
      setContent("");
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to post announcement.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Post Announcement</DialogTitle>
            <DialogDescription>
              Share important updates with all players
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g., Final Squad Announcement"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your announcement here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                required
              />
              {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Posting..." : "Post Announcement"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
