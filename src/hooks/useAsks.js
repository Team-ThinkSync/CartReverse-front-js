import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getInquiry,
  createInquiry,
  deleteInquiry,
  updateInquiry,
  ResInquiries,
  getUserInquiries,
} from "../api/asksApi";

export const useGetInquiry = (id) => {
  return useQuery({
    queryKey: ["inquiry", id],
    queryFn: () => getInquiry(id),
    enabled: !!id,
  });
};

export const useCreateInquiry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createInquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
};

export const useDeleteInquiry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteInquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
};

export const useUpdateInquiry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, inquiryData }) => updateInquiry(id, inquiryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
};

export const useResInquiries = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ResInquiries,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
};

export const useUserInquiries = (userId) => {
  return useQuery({
    queryKey: ["userInquiries", userId],
    queryFn: () => getUserInquiries(userId),
  });
};
