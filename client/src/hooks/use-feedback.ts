import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type FeedbackInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateFeedback() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: FeedbackInput) => {
      // Validate with shared schema before sending
      const validated = api.feedback.create.input.parse(data);
      
      const res = await fetch(api.feedback.create.path, {
        method: api.feedback.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.feedback.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to submit feedback");
      }

      return api.feedback.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Feedback received",
        description: "Thank you for helping us improve Local Life!",
      });
    },
    onError: (error) => {
      toast({
        title: "Submission failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
