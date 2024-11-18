'use client'; // Marcar o componente como Client Component

import { useEffect, useState } from 'react';
import CardOperation from '../../cards/operation/CardOperation';
import homeServiceInstance from '../../../services/home.service';

interface Order {
  id: number;
  description: string;
  Production_Status: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<
    { id: number; description: string; status: string }[]
  >([]);

  useEffect(() => {
    // Função para carregar as ordens
    const fetchOrders = async () => {
      const response = await homeServiceInstance.getOrders();

      // Checa se a resposta foi bem-sucedida e extrai o data
      if (response.sucess && response.data) {
        const formattedOrders = response.data.map((order: Order) => ({
          id: order.id,
          description: order.description,
          status: order.Production_Status // Usando o campo Production_Status
        }));

        setOrders(formattedOrders);

        // eslint-disable-next-line no-console
        console.log('Ordens formatadas:', formattedOrders);
      } else {
        // eslint-disable-next-line no-console
        console.error('Erro ao carregar as ordens:', response.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="space-y-8 lg:w-1/2">
      <h2 className="text-3xl text-black text-center lg:text-left">
        Ordens em Andamento
      </h2>
      {/* Colunas responsivas para operações */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {orders
          .filter(
            order =>
              order.status === 'IN_PROGRESS' || order.status === 'FINISHED'
          )
          .map(order => (
            <div
              key={order.id}
              className={
                order.status === 'IN_PROGRESS'
                  ? 'order-last sm:order-first'
                  : 'order-first sm:order-last'
              }
            >
              <CardOperation
                title={order.description}
                type={
                  order.status === 'IN_PROGRESS' ? 'inProgress' : 'finished'
                }
              />
            </div>
          ))}
      </div>
    </div>
  );
}
