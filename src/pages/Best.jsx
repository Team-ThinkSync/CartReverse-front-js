import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Clothes from "../assets/images/clothes.png"

const bestItems = [
  { id: 1, image: {Clothes}, title: "상품1", price: "34,900원", discount: "34%" },
  { id: 2, image: {Clothes}, title: "상품2", price: "32,590원", discount: "70%" },
  { id: 3, image: {Clothes}, title: "상품3", price: "34,900원", discount: "35%" },
  { id: 4, image: {Clothes}, title: "상품4", price: "49,500원", discount: "50%" },
  { id: 5, image: {Clothes}, title: "상품5", price: "39,000원", discount: "34%" },
];

export default function BestProducts() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-3">Best 상품</h2>
      <div className="overflow-x-auto whitespace-nowrap">
        <div className="flex gap-4">
          {bestItems.map((item) => (
            <Card key={item.id} className="w-48 flex-shrink-0">
              <CardContent>
                <img src={item.image} alt={item.title} className="rounded-xl" />
                <p className="mt-2 text-sm">{item.title}</p>
                <p className="text-red-500">{item.discount} {item.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
