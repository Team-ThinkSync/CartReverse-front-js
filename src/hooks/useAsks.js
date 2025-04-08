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
  return useQuery(["inquiry", id], () => getInquiry(id), {
    enabled: !!id,
  });
};

export const useCreateInquiry = () => {
  const queryClient = useQueryClient();
  return useMutation(createInquiry, {
    onSuccess: () => queryClient.invalidateQueries(["inquiries"]),
  });
};

export const useDeleteInquiry = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteInquiry, {
    onSuccess: () => queryClient.invalidateQueries(["inquiries"]),
  });
};

export const useUpdateInquiry = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id, inquiryData }) => updateInquiry(id, inquiryData), {
    onSuccess: () => queryClient.invalidateQueries(["inquiries"]),
  });
};

export const useResInquiries = () => {
  const queryClient = useQueryClient();
  return useMutation(ResInquiries, {
    onSuccess: () => queryClient.invalidateQueries(["inquiries"]),
  });
};

export const useUserInquiries = (userId) => {
  return useQuery(["userInquiries", userId], () => getUserInquiries(userId));
};


