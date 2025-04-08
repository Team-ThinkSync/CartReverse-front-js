import { useQuery, useMutation, useQueryClient } from "react-query";
import { getCartItems, updateCartItemQuantity, deleteCartItem } from "../api/cartApi";

const useCart = () => {
  const queryClient = useQueryClient();

  // 장바구니 데이터 가져오기
  const { data: cartItems = [], isLoading, error } = useQuery("cartItems", getCartItems);

  // 수량 변경
  const updateQuantityMutation = useMutation(
    ({ id, quantity }) => updateCartItemQuantity(id, quantity),
    {
      onSuccess: (updatedItem, { id }) => {
        queryClient.setQueryData("cartItems", (oldCartItems) =>
          oldCartItems.map((item) =>
            item.id === id ? { ...item, quantity: updatedItem.quantity } : item
          )
        );
      },
      onError: (err) => {
        console.error("수량 변경 중 오류:", err);
      },
    }
  );

  const handleQuantityChange = (id, quantity) => {
    updateQuantityMutation.mutate({ id, quantity });
  };

  // 상품 삭제
  const deleteItemMutation = useMutation(deleteCartItem, {
    onSuccess: (_, id) => {
      queryClient.setQueryData("cartItems", (oldCartItems) =>
        oldCartItems.filter((item) => item.id !== id)
      );
    },
    onError: (err) => {
      console.error("상품 삭제 중 오류:", err);
    },
  });

  const handleRemoveItem = (id) => {
    deleteItemMutation.mutate(id);
  };

  return { cartItems, isLoading, error, handleQuantityChange, handleRemoveItem };
};

export default useCart;
